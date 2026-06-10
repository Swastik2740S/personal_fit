import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

// POST /api/admin/migrate-user
// One-time endpoint: find old user by email and migrate all their data to the
// current Clerk userId. Call this once after signing in with Google for the first time.
// Body: { oldEmail: string }
export async function POST(req: Request) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { oldEmail } = await req.json();
  if (!oldEmail || typeof oldEmail !== "string") {
    return NextResponse.json({ error: "oldEmail required" }, { status: 400 });
  }

  // Find the old user row (different id, same email)
  const oldUser = await db.user.findUnique({ where: { email: oldEmail } });
  if (!oldUser) {
    return NextResponse.json({ error: "No user found with that email" }, { status: 404 });
  }
  if (oldUser.id === userId) {
    return NextResponse.json({ message: "Already migrated — ids match" });
  }

  // Reassign all app data to the new Clerk userId
  await db.$transaction(async (tx) => {
    // 1. Free the unique email constraint on the old row
    await tx.user.update({
      where: { id: oldUser.id },
      data: { email: `__migrated__${oldUser.id}` },
    });
    // 2. Ensure target user row exists (Clerk webhook may have already created it)
    await tx.user.upsert({
      where: { id: userId },
      update: {
        onboardingComplete: oldUser.onboardingComplete,
        heightCm: oldUser.heightCm,
        startingWeightKg: oldUser.startingWeightKg,
        age: oldUser.age,
        sex: oldUser.sex,
        activityLevel: oldUser.activityLevel,
        primaryGoal: oldUser.primaryGoal,
        fitnessExperience: oldUser.fitnessExperience,
        dietaryPreference: oldUser.dietaryPreference,
        equipment: oldUser.equipment,
        calGoal: oldUser.calGoal,
        protGoal: oldUser.protGoal,
        carbGoal: oldUser.carbGoal,
        fatGoal: oldUser.fatGoal,
        stepGoal: oldUser.stepGoal,
      },
      create: {
        id: userId,
        email: oldUser.email,
        name: oldUser.name,
        image: oldUser.image,
        onboardingComplete: oldUser.onboardingComplete,
        heightCm: oldUser.heightCm,
        startingWeightKg: oldUser.startingWeightKg,
        age: oldUser.age,
        sex: oldUser.sex,
        activityLevel: oldUser.activityLevel,
        primaryGoal: oldUser.primaryGoal,
        fitnessExperience: oldUser.fitnessExperience,
        dietaryPreference: oldUser.dietaryPreference,
        equipment: oldUser.equipment,
        calGoal: oldUser.calGoal,
        protGoal: oldUser.protGoal,
        carbGoal: oldUser.carbGoal,
        fatGoal: oldUser.fatGoal,
        stepGoal: oldUser.stepGoal,
      },
    });
    // 3. Move all FK-referencing rows before deleting the old user
    await tx.foodLog.updateMany({ where: { userId: oldUser.id }, data: { userId } });
    await tx.stepLog.updateMany({ where: { userId: oldUser.id }, data: { userId } });
    await tx.weightLog.updateMany({ where: { userId: oldUser.id }, data: { userId } });
    await tx.favoriteFood.updateMany({ where: { userId: oldUser.id }, data: { userId } });
    await tx.userPlan.updateMany({ where: { userId: oldUser.id }, data: { userId } });
    // 4. Delete the now-orphaned legacy row
    await tx.user.delete({ where: { id: oldUser.id } });
  });

  return NextResponse.json({ success: true, migratedFrom: oldUser.id, to: userId });
}
