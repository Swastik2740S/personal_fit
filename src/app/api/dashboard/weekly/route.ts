import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json([]);
    }

    const { searchParams } = new URL(req.url);
    const localStartStr = searchParams.get("localStart");
    
    let localStart: Date;
    if (localStartStr) {
      localStart = new Date(localStartStr);
    } else {
      localStart = new Date();
      localStart.setHours(0, 0, 0, 0);
    }

    // Start date is 6 days before localStart (total 7 days)
    const startDate = new Date(localStart);
    startDate.setDate(startDate.getDate() - 6);

    // Fetch Food Logs and Step Logs
    const [foodLogs, stepLogs] = await Promise.all([
      db.foodLog.findMany({
        where: {
          userId: user.id,
          date: { gte: startDate },
        },
        orderBy: { date: "asc" },
      }),
      db.stepLog.findMany({
        where: {
          userId: user.id,
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
