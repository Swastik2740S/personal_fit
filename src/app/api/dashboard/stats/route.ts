import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart } from "@/lib/day";

const GOAL_SELECT = {
  calGoal: true,
  protGoal: true,
  carbGoal: true,
  fatGoal: true,
  stepGoal: true,
};

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const startOfDay = getDayStart(req);

    const [user, foodLogs, stepLog] = await Promise.all([
      db.user.findUnique({ where: { id: userId }, select: GOAL_SELECT }),
      db.foodLog.findMany({
        where: { userId, date: { gte: startOfDay } },
      }),
      db.stepLog.findFirst({
        where: { userId, date: { gte: startOfDay } },
      }),
    ]);

    const totals = foodLogs.reduce(
      (acc, log) => {
        acc.cal += log.cal;
        acc.prot += log.prot;
        acc.carb += log.carb;
        acc.fat += log.fat;
        return acc;
      },
      { cal: 0, prot: 0, carb: 0, fat: 0 }
    );

    return NextResponse.json({
      ...totals,
      steps: stepLog?.count || 0,
      goals: user,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
