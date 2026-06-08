import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateTDEE } from "@/lib/tdee";
import { generatePlan } from "@/lib/planGenerator";
import type { OnboardingProfile } from "@/lib/tdee";

export async function GET() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const plan = await db.userPlan.findUnique({ where: { userId } });
  if (!plan) {
    return NextResponse.json({ plan: null });
  }

  return NextResponse.json({
    plan: {
      mealPlan:    JSON.parse(plan.mealPlan),
      workoutPlan: JSON.parse(plan.workoutPlan),
      summary:     plan.summary,
      generatedAt: plan.generatedAt,
    },
  });
}

export async function POST() {
  const { userId, error } = await requireUser();
  if (error) return error;

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user?.onboardingComplete || !user.heightCm || !user.startingWeightKg || !user.age || !user.sex || !user.activityLevel || !user.primaryGoal || !user.fitnessExperience || !user.dietaryPreference || !user.equipment) {
    return NextResponse.json({ error: "Complete onboarding first" }, { status: 400 });
  }

  const profile: OnboardingProfile = {
    heightCm:      user.heightCm,
    weightKg:      user.startingWeightKg,
    age:           user.age,
    sex:           user.sex as "male" | "female",
    activityLevel: user.activityLevel as OnboardingProfile["activityLevel"],
    primaryGoal:   user.primaryGoal as OnboardingProfile["primaryGoal"],
  };

  const tdee = calculateTDEE(profile);

  let plan;
  try {
    plan = await generatePlan({
      ...profile,
      fitnessExperience: user.fitnessExperience,
      dietaryPreference: user.dietaryPreference,
      equipment:         user.equipment,
      ...tdee,
    });
  } catch (e) {
    console.error("Plan regeneration failed:", e);
    return NextResponse.json({ error: "Failed to regenerate plan. Please try again." }, { status: 500 });
  }

  const updated = await db.userPlan.upsert({
    where: { userId },
    update: {
      mealPlan:    JSON.stringify(plan.mealPlan),
      workoutPlan: JSON.stringify(plan.workoutPlan),
      summary:     plan.summary,
    },
    create: {
      userId,
      mealPlan:    JSON.stringify(plan.mealPlan),
      workoutPlan: JSON.stringify(plan.workoutPlan),
      summary:     plan.summary,
    },
  });

  return NextResponse.json({
    plan: {
      mealPlan:    JSON.parse(updated.mealPlan),
      workoutPlan: JSON.parse(updated.workoutPlan),
      summary:     updated.summary,
      generatedAt: updated.generatedAt,
    },
  });
}
