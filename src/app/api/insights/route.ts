import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart } from "@/lib/day";

const LOOKBACK = 60; // days scanned for the streak
const WEEK = 7;

// GET /api/insights - logging streak + weekly goal adherence, derived from logs.
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const dayStart = getDayStart(req);
    const since = new Date(dayStart);
    since.setDate(since.getDate() - (LOOKBACK - 1));

    const [user, foodLogs, stepLogs] = await Promise.all([
      db.user.findUnique({
        where: { id: userId },
        select: { calGoal: true, protGoal: true, stepGoal: true },
      }),
      db.foodLog.findMany({
        where: { userId, date: { gte: since } },
        select: { date: true, cal: true, prot: true },
      }),
      db.stepLog.findMany({
        where: { userId, date: { gte: since } },
        select: { date: true, count: true },
      }),
    ]);

    // Bucket each of the last LOOKBACK days (index 0 = today).
    const days = [];
    for (let i = 0; i < LOOKBACK; i++) {
      const day = new Date(dayStart);
      day.setDate(day.getDate() - i);
      const next = new Date(day);
      next.setDate(next.getDate() + 1);

      const f = foodLogs.filter((l) => l.date >= day && l.date < next);
      const cal = f.reduce((s, l) => s + l.cal, 0);
      const prot = f.reduce((s, l) => s + l.prot, 0);
      const steps = stepLogs.find((l) => l.date >= day && l.date < next)?.count ?? 0;
      days.push({ cal, prot, steps, active: f.length > 0 || steps > 0 });
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

    return NextResponse.json({
      streak,
      days: WEEK,
      loggedToday: days[0].active,
      calHit: week.filter((d) => d.cal > 0 && d.cal <= calGoal).length,
      protHit: week.filter((d) => d.prot >= protGoal).length,
      stepHit: week.filter((d) => d.steps >= stepGoal).length,
    });
  } catch (error) {
    console.error("Insights GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
