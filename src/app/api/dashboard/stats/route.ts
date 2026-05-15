import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({
        cal: 0,
        prot: 0,
        carb: 0,
        fat: 0,
        steps: 0,
      });
    }

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Get Food Logs
    const foodLogs = await db.foodLog.findMany({
      where: {
        userId: user.id,
        date: { gte: startOfDay },
      },
    });

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

    // Get Steps
    const stepLog = await db.stepLog.findFirst({
      where: {
        userId: user.id,
        date: { gte: startOfDay },
      },
    });

    return NextResponse.json({
      ...totals,
      steps: stepLog?.count || 0,
    });
  } catch (error) {
    console.error("Stats API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
