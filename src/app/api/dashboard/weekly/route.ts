import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart } from "@/lib/day";
import { getDailyFoodTotals } from "@/lib/foodAggregate";

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const localStart = getDayStart(req);

    // Start date is 6 days before localStart (total 7 days)
    const startDate = new Date(localStart);
    startDate.setDate(startDate.getDate() - 6);

    // Food totals are day-bucketed in SQL; steps are ≤7 rows (one per day).
    const [foodDays, stepLogs] = await Promise.all([
      getDailyFoodTotals(userId, startDate, 7),
      db.stepLog.findMany({
        where: { userId, date: { gte: startDate } },
        orderBy: { date: "asc" },
      }),
    ]);

    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(currentDay.getDate() + i);
      const nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayStep = stepLogs.find(
        (log) => log.date >= currentDay && log.date < nextDay
      );
      const f = foodDays[i];

      weeklyData.push({
        date: currentDay.toISOString(),
        label: currentDay.toLocaleDateString("en-US", { weekday: "short" }),
        cal: f.cal,
        prot: f.prot,
        carb: f.carb,
        fat: f.fat,
        steps: dayStep?.count || 0,
      });
    }

    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error("Weekly Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
