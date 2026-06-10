import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayRange } from "@/lib/day";
import { getInsights } from "@/lib/insights";

const GOAL_SELECT = {
  calGoal: true,
  protGoal: true,
  carbGoal: true,
  fatGoal: true,
  stepGoal: true,
  onboardingComplete: true,
};

/**
 * GET /api/dashboard — everything the dashboard needs in one round trip:
 * today's totals (food/steps/water), the user's goals, and consistency
 * insights. Replaces the separate stats + insights calls (those routes remain
 * for other consumers).
 */
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { start, end } = getDayRange(req);

    const user = await db.user.findUnique({ where: { id: userId }, select: GOAL_SELECT });

    const [foodAgg, stepLog, waterLog, insights] = await Promise.all([
      db.foodLog.aggregate({
        where: { userId, date: { gte: start, lt: end } },
        _sum: { cal: true, prot: true, carb: true, fat: true },
      }),
      db.stepLog.findFirst({ where: { userId, date: { gte: start, lt: end } } }),
      db.waterLog.findFirst({ where: { userId, date: { gte: start, lt: end } } }),
      getInsights(userId, start, user),
    ]);

    return NextResponse.json({
      stats: {
        cal: foodAgg._sum.cal ?? 0,
        prot: foodAgg._sum.prot ?? 0,
        carb: foodAgg._sum.carb ?? 0,
        fat: foodAgg._sum.fat ?? 0,
        steps: stepLog?.count || 0,
        water: waterLog?.ml || 0,
      },
      goals: user,
      insights,
    });
  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
