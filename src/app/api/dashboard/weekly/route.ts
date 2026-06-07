import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart } from "@/lib/day";

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const localStart = getDayStart(req);

    // Start date is 6 days before localStart (total 7 days)
    const startDate = new Date(localStart);
    startDate.setDate(startDate.getDate() - 6);

    // Fetch Food Logs and Step Logs
    const [foodLogs, stepLogs] = await Promise.all([
      db.foodLog.findMany({
        where: {
          userId,
          date: { gte: startDate },
        },
        orderBy: { date: "asc" },
      }),
      db.stepLog.findMany({
        where: {
          userId,
          date: { gte: startDate },
        },
        orderBy: { date: "asc" },
      }),
    ]);

    // Aggregate by day
    const weeklyData = [];
    for (let i = 0; i < 7; i++) {
      const currentDay = new Date(startDate);
      currentDay.setDate(currentDay.getDate() + i);
      const nextDay = new Date(currentDay);
      nextDay.setDate(nextDay.getDate() + 1);

      const dayFoods = foodLogs.filter(
        (log) => log.date >= currentDay && log.date < nextDay
      );
      const dayStep = stepLogs.find(
        (log) => log.date >= currentDay && log.date < nextDay
      );

      const dayTotals = dayFoods.reduce(
        (acc, log) => {
          acc.cal += log.cal;
          acc.prot += log.prot;
          acc.carb += log.carb;
          acc.fat += log.fat;
          return acc;
        },
        { cal: 0, prot: 0, carb: 0, fat: 0 }
      );

      weeklyData.push({
        date: currentDay.toISOString(),
        label: currentDay.toLocaleDateString("en-US", { weekday: "short" }),
        ...dayTotals,
        steps: dayStep?.count || 0,
      });
    }

    return NextResponse.json(weeklyData);
  } catch (error) {
    console.error("Weekly Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
