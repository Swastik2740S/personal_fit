import { db } from "@/lib/db";
import { getDailyFoodTotals } from "@/lib/foodAggregate";

const LOOKBACK = 60; // days scanned for the streak
const WEEK = 7;

export interface InsightGoals {
  calGoal: number;
  protGoal: number;
  stepGoal: number;
}

export interface Insights {
  streak: number;
  days: number;
  loggedToday: boolean;
  calHit: number;
  protHit: number;
  stepHit: number;
}

/**
 * Logging streak + weekly goal adherence, derived from logs. Shared by
 * /api/insights and the combined /api/dashboard endpoint. Pass `goals` when the
 * caller already fetched the user row to avoid a duplicate query.
 */
export async function getInsights(
  userId: string,
  dayStart: Date,
  goals?: InsightGoals | null
): Promise<Insights> {
  const since = new Date(dayStart);
  since.setDate(since.getDate() - (LOOKBACK - 1));

  const [user, foodDays, stepLogs] = await Promise.all([
    goals !== undefined
      ? Promise.resolve(goals)
      : db.user.findUnique({
          where: { id: userId },
          select: { calGoal: true, protGoal: true, stepGoal: true },
        }),
    getDailyFoodTotals(userId, since, LOOKBACK),
    db.stepLog.findMany({
      where: { userId, date: { gte: since } },
      select: { date: true, count: true },
    }),
  ]);

  // Bucket each of the last LOOKBACK days (index 0 = today). Food totals come
  // pre-aggregated from SQL (bucket 0 = oldest day, so today = LOOKBACK-1-i).
  const days = [];
  for (let i = 0; i < LOOKBACK; i++) {
    const day = new Date(dayStart);
    day.setDate(day.getDate() - i);
    const next = new Date(day);
    next.setDate(next.getDate() + 1);

    const f = foodDays[LOOKBACK - 1 - i];
    const steps = stepLogs.find((l) => l.date >= day && l.date < next)?.count ?? 0;
    days.push({ cal: f.cal, prot: f.prot, steps, active: f.entries > 0 || steps > 0 });
  }

  // Streak: consecutive active days ending today, or yesterday if today is blank.
  let streak = 0;
  const startIdx = days[0].active ? 0 : days[1]?.active ? 1 : -1;
  if (startIdx >= 0) {
    for (let i = startIdx; i < LOOKBACK && days[i].active; i++) streak++;
  }

  // Adherence over the last 7 *complete* days (yesterday back 7 days). Today is
  // excluded because it's still in progress — otherwise a partially-logged day
  // counts as a calorie "hit" (cal still under goal) but a protein/step "miss"
  // (totals not reached yet), which is inconsistent and misleading.
  const week = days.slice(1, WEEK + 1);
  const calGoal = user?.calGoal ?? 0;
  const protGoal = user?.protGoal ?? 0;
  const stepGoal = user?.stepGoal ?? 0;

  return {
    streak,
    days: WEEK,
    loggedToday: days[0].active,
    calHit: week.filter((d) => d.cal > 0 && d.cal <= calGoal).length,
    protHit: week.filter((d) => d.prot >= protGoal).length,
    stepHit: week.filter((d) => d.steps >= stepGoal).length,
  };
}
