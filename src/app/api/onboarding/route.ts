import { NextResponse } from "next/server";
import { z } from "zod";
import { currentUser, clerkClient } from "@clerk/nextjs/server";
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

/**
 * Ensures a User row exists for the given Clerk userId.
 * If an old NextAuth row exists with the same email (different id),
 * migrates all their data to the new Clerk id and removes the old row.
 */
async function ensureUserRow(userId: string, email: string, name: string | null, image: string | null) {
  // Already exists with correct Clerk id → nothing to do
  const existingById = await db.user.findUnique({ where: { id: userId } });
  if (existingById) return;

  // Check for a legacy row with the same email (old NextAuth user)
  const legacyUser = email ? await db.user.findUnique({ where: { email } }) : null;

  if (legacyUser) {
    // 1. Free the email constraint so we can create the new row
    await db.user.update({
      where: { id: legacyUser.id },
      data:  { email: `__migrated__${legacyUser.id}` },
    });
    // 2. Create the new Clerk user row (FK target must exist before moving relations).
    //    upsert (not create) so a racing Clerk webhook that already inserted the
    //    row doesn't blow up with a P2002 unique violation.
    await db.user.upsert({
      where:  { id: userId },
      update: { email, name, image },
      create: { id: userId, email, name, image },
    });
    // 3. Move all app data from old id → new Clerk id
    await db.foodLog.updateMany({ where: { userId: legacyUser.id }, data: { userId } });
    await db.stepLog.updateMany({ where: { userId: legacyUser.id }, data: { userId } });
    await db.weightLog.updateMany({ where: { userId: legacyUser.id }, data: { userId } });
    await db.favoriteFood.updateMany({ where: { userId: legacyUser.id }, data: { userId } });
    // 4. UserPlan will be regenerated — drop the old one
    await db.userPlan.deleteMany({ where: { userId: legacyUser.id } });
    // 5. Delete the now-orphaned legacy row
    await db.user.delete({ where: { id: legacyUser.id } });
    return;
  }

  // Brand new user. `email` may be "" if currentUser() failed on a cold start —
  // fall back to a per-user-unique placeholder so we never collide on the unique
  // email constraint (two empty-string emails would conflict). The Clerk webhook
  // backfills the real address. upsert guards against a racing webhook insert.
  const safeEmail = email || `${userId}@clerk.local`;
  await db.user.upsert({
    where:  { id: userId },
    update: {},
    create: { id: userId, email: safeEmail, name, image },
  });
}

export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = onboardingSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid data", details: parsed.error.flatten() }, { status: 400 });
    }

    const data = parsed.data;
    const tdee = calculateTDEE({ ...data, weightKg: data.weightKg });

    // Fetch Clerk user details (non-fatal if it fails)
    let email = "";
    let name: string | null = null;
    let image: string | null = null;
    try {
      const clerkUser = await currentUser();
      email = clerkUser?.emailAddresses[0]?.emailAddress ?? "";
      name  = clerkUser?.fullName ?? null;
      image = clerkUser?.imageUrl ?? null;
    } catch { /* webhook may have already created the row */ }

    await ensureUserRow(userId, email, name, image);

    const plan = generatePlan({ ...data, ...tdee });

    await db.user.update({
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
    });

    await db.userPlan.upsert({
      where:  { userId },
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

    // Mark onboarding complete in Clerk publicMetadata so the middleware
    // can gate access without a DB query on every request.
    const clerk = await clerkClient();
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: { onboardingComplete: true },
    });

    return NextResponse.json({ success: true, tdee });
  } catch (e) {
    const message = e instanceof Error ? e.message : String(e);
    console.error("[onboarding] POST failed:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
