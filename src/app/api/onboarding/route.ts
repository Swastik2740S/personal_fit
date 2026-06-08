import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser } from "@clerk/nextjs/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateTDEE } from "@/lib/tdee";
import { generatePlan } from "@/lib/planGenerator";

const onboardingSchema = z.object({
  heightCm:          z.number().positive().max(300),
  weightKg:          z.number().positive().max(500),
  age:               z.number().int().min(10).max(120),
  sex:               z.enum(["male", "female"]),
  activityLevel:     z.enum(["sedentary", "lightly", "moderately", "very", "extremely"]),
  primaryGoal:       z.enum(["fat_loss", "muscle_gain", "recomposition", "maintain"]),
  fitnessExperience: z.enum(["beginner", "intermediate", "advanced"]),
  dietaryPreference: z.enum(["none", "vegetarian", "vegan", "high_protein", "low_carb"]),
  equipment:         z.enum(["none", "home_gym", "full_gym"]),
});

export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const parsed = onboardingSchema.safeParse(await req.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  const tdee = calculateTDEE({ ...data, weightKg: data.weightKg });

  // Ensure the User row exists — the Clerk webhook may not have fired yet
  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
  const name = clerkUser?.fullName ?? null;
  const image = clerkUser?.imageUrl ?? null;
  await db.user.upsert({
    where: { id: userId },
    update: {},
    create: { id: userId, email, name, image },
  });

  let plan;
  try {
    plan = await generatePlan({ ...data, ...tdee });
  } catch (e) {
    console.error("Plan generation failed:", e);
    return NextResponse.json({ error: "Failed to generate plan. Please try again." }, { status: 500 });
  }

  // Save everything atomically
  await db.$transaction([
    db.user.update({
      where: { id: userId },
      data: {
        heightCm:           data.heightCm,
        startingWeightKg:   data.weightKg,
        age:                data.age,
        sex:                data.sex,
        activityLevel:      data.activityLevel,
        primaryGoal:        data.primaryGoal,
        fitnessExperience:  data.fitnessExperience,
        dietaryPreference:  data.dietaryPreference,
        equipment:          data.equipment,
        calGoal:            tdee.calGoal,
        protGoal:           tdee.protGoal,
        carbGoal:           tdee.carbGoal,
        fatGoal:            tdee.fatGoal,
        onboardingComplete: true,
      },
    }),
    db.userPlan.upsert({
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
    }),
  ]);

  return NextResponse.json({ success: true, tdee });
}
