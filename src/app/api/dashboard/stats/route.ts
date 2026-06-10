import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayRange } from "@/lib/day";

const GOAL_SELECT = {
  calGoal: true,
  protGoal: true,
  carbGoal: true,
  fatGoal: true,
  stepGoal: true,
  onboardingComplete: true,
};

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { start, end } = getDayRange(req);

    // Totals are summed in the database — no row payload over the wire.
    const [user, foodAgg, stepLog] = await Promise.all([
      db.user.findUnique({ where: { id: userId }, select: GOAL_SELECT }),
      db.foodLog.aggregate({
        where: { userId, date: { gte: start, lt: end } },
        _sum: { cal: true, prot: true, carb: true, fat: true },
      }),
      db.stepLog.findFirst({
        where: { userId, date: { gte: start, lt: end } },
      }),
    ]);

    return NextResponse.json({
      cal: foodAgg._sum.cal ?? 0,
      prot: foodAgg._sum.prot ?? 0,
      carb: foodAgg._sum.carb ?? 0,
      fat: foodAgg._sum.fat ?? 0,
      steps: stepLog?.count || 0,
      goals: user,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
