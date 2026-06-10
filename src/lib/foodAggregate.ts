import { db } from "@/lib/db";

export interface DayFoodTotals {
  cal: number;
  prot: number;
  carb: number;
  fat: number;
  entries: number;
}

/**
 * Day-bucketed food totals computed in SQL so routes pull O(days) summary rows
 * instead of every FoodLog row. Bucket `i` covers the half-open window
 * `[start + i days, start + (i+1) days)` — identical semantics to the previous
 * JS bucketing (server runs UTC, so calendar-day increments are exact 24h).
 * Days with no logs come back as zeroed buckets with `entries: 0`.
 */
export async function getDailyFoodTotals(
  userId: string,
  start: Date,
  days: number
): Promise<DayFoodTotals[]> {
  const end = new Date(start);
  end.setDate(end.getDate() + days);

  const rows = await db.$queryRaw<
    { day: number; cal: number; prot: number; carb: number; fat: number; entries: number }[]
  >`
    SELECT floor(extract(epoch FROM ("date" - ${start}::timestamp)) / 86400)::int AS day,
           COALESCE(sum("cal"), 0)::float8  AS cal,
           COALESCE(sum("prot"), 0)::float8 AS prot,
           COALESCE(sum("carb"), 0)::float8 AS carb,
           COALESCE(sum("fat"), 0)::float8  AS fat,
           count(*)::int                    AS entries
    FROM "FoodLog"
    WHERE "userId" = ${userId}
      AND "date" >= ${start}::timestamp
      AND "date" <  ${end}::timestamp
    GROUP BY 1
  `;

  const buckets: DayFoodTotals[] = Array.from({ length: days }, () => ({
    cal: 0,
    prot: 0,
    carb: 0,
    fat: 0,
    entries: 0,
  }));
  for (const r of rows) {
    if (r.day >= 0 && r.day < days) {
      buckets[r.day] = { cal: r.cal, prot: r.prot, carb: r.carb, fat: r.fat, entries: r.entries };
    }
  }
  return buckets;
}
