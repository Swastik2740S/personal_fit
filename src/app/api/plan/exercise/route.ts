import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { exerciseSwapSchema } from "@/lib/validation";
import type { WorkoutDay } from "@/lib/planGenerator";

// PATCH /api/plan/exercise — replace one exercise in the stored workout plan.
export async function PATCH(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = exerciseSwapSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }
    const { dayIndex, exerciseIndex, expectedName, replacement } = parsed.data;

    const plan = await db.userPlan.findUnique({ where: { userId } });
    if (!plan) {
      return NextResponse.json({ error: "No plan yet — complete onboarding first" }, { status: 404 });
    }

    const workoutPlan: WorkoutDay[] = JSON.parse(plan.workoutPlan);
    const current = workoutPlan[dayIndex]?.exercises?.[exerciseIndex];
    if (!current) {
      return NextResponse.json({ error: "That exercise slot doesn't exist" }, { status: 400 });
    }
    if (current.name !== expectedName) {
      // Plan changed since the client loaded it (another tab/device).
      return NextResponse.json(
        { error: "Your plan changed — reload and try again" },
        { status: 409 }
      );
    }

    workoutPlan[dayIndex].exercises[exerciseIndex] = { ...replacement, swapped: true };

    await db.userPlan.update({
      where: { userId },
      data: { workoutPlan: JSON.stringify(workoutPlan) },
    });

    return NextResponse.json({ workoutPlan });
  } catch (error) {
    console.error("Exercise swap PATCH error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
