import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const logSchema = z.object({
  exercise: z.string().min(1).max(120),
  weightKg: z.number().positive(),
  sets:     z.number().int().min(1).max(20),
  reps:     z.number().int().min(1).max(100),
  notes:    z.string().max(300).optional(),
  date:     z.string().datetime().optional(),
});

// GET /api/lifts?exercise=<name>&limit=<n>  — history for one exercise
export async function GET(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { searchParams } = new URL(req.url);
  const exercise = searchParams.get("exercise");
  const limit    = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 50);

  if (!exercise) {
    return NextResponse.json({ error: "exercise required" }, { status: 400 });
  }

  const entries = await db.liftLog.findMany({
    where:   { userId, exercise },
    orderBy: { date: "desc" },
    take:    limit,
  });

  return NextResponse.json({ entries });
}

// POST /api/lifts  — log a new entry
export async function POST(req: NextRequest) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const body   = await req.json().catch(() => null);
  const parsed = logSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", issues: parsed.error.issues }, { status: 400 });
  }

  const { exercise, weightKg, sets, reps, notes, date } = parsed.data;

  // Check if a PR was set (new highest weight for this exercise)
  const prevBest = await db.liftLog.findFirst({
    where:   { userId, exercise },
    orderBy: { weightKg: "desc" },
    select:  { weightKg: true },
  });

  const isPR = !prevBest || weightKg > prevBest.weightKg;

  const entry = await db.liftLog.create({
    data: {
      userId,
      exercise,
      weightKg,
      sets,
      reps,
      notes,
      date: date ? new Date(date) : new Date(),
    },
  });

  return NextResponse.json({ entry, isPR });
}
