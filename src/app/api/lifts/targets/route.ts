import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import type { WorkoutDay } from "@/lib/planGenerator";

export interface LiftTarget {
  exercise:      string;
  plannedSets:   string;
  plannedReps:   string;
  note:          string;
  // last session
  lastWeightKg:  number | null;
  lastReps:      number | null;
  lastDate:      string | null;
  // computed target
  targetWeightKg: number | null;
  targetReps:     number | null;
  suggestion:     "increase" | "climb" | "first";
}

export interface TargetsResponse {
  dayName:   string;
  focus:     string;
  targets:   LiftTarget[];
  isRestDay: boolean;
}

// Parse "5–6", "8-12", "10–12 / leg", "15" → { min, max }
function parseRepRange(repsStr: string): { min: number; max: number } {
  const clean = repsStr.replace(/[^0-9–\-]/g, "");
  const match = clean.match(/^(\d+)[–\-](\d+)$/);
  if (match) return { min: parseInt(match[1], 10), max: parseInt(match[2], 10) };
  const single = parseInt(clean, 10);
  if (!isNaN(single)) return { min: single, max: single };
  return { min: 8, max: 12 }; // safe fallback
}

export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const plan = await db.userPlan.findUnique({ where: { userId } });
  if (!plan) {
    return NextResponse.json({ error: "No plan found" }, { status: 404 });
  }

  const workoutPlan: WorkoutDay[] = JSON.parse(plan.workoutPlan);

  // 0=Sun, 1=Mon … 6=Sat — match to plan index (Mon=0 … Sun=6)
  const jsDay   = new Date().getDay();
  const planIdx = jsDay === 0 ? 6 : jsDay - 1; // Sun→6, Mon→0
  const today   = workoutPlan[planIdx] ?? workoutPlan[0];

  const isRestDay = today.exercises.length === 0;

  if (isRestDay) {
    return NextResponse.json<TargetsResponse>({
      dayName:   today.day,
      focus:     today.focus,
      targets:   [],
      isRestDay: true,
    });
  }

  // Fetch last log entry for each distinct exercise in today's workout in one query
  const exerciseNames = today.exercises.map((e) => e.name);

  const recentLogs = await db.liftLog.findMany({
    where: { userId, exercise: { in: exerciseNames } },
    orderBy: { date: "desc" },
  });

  // Build map: exercise → most recent log
  const lastByExercise = new Map<string, typeof recentLogs[number]>();
  for (const log of recentLogs) {
    if (!lastByExercise.has(log.exercise)) {
      lastByExercise.set(log.exercise, log);
    }
  }

  const targets: LiftTarget[] = today.exercises.map((ex) => {
    const last = lastByExercise.get(ex.name) ?? null;
    const { max } = parseRepRange(ex.reps);

    let suggestion: LiftTarget["suggestion"] = "first";
    let targetWeightKg: number | null        = null;
    let targetReps: number | null            = null;

    if (last) {
      if (last.reps >= max) {
        suggestion     = "increase";
        targetWeightKg = Math.round((last.weightKg + 2.5) * 10) / 10;
        targetReps     = parseRepRange(ex.reps).min;
      } else {
        suggestion     = "climb";
        targetWeightKg = last.weightKg;
        targetReps     = last.reps + 1;
      }
    }

    return {
      exercise:       ex.name,
      plannedSets:    ex.sets,
      plannedReps:    ex.reps,
      note:           ex.note,
      lastWeightKg:   last?.weightKg   ?? null,
      lastReps:       last?.reps       ?? null,
      lastDate:       last?.date.toISOString() ?? null,
      targetWeightKg,
      targetReps,
      suggestion,
    };
  });

  return NextResponse.json<TargetsResponse>({
    dayName:   today.day,
    focus:     today.focus,
    targets,
    isRestDay: false,
  });
}
