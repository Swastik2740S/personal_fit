-- Migration: Replace NextAuth with Clerk, add onboarding fields + UserPlan
-- Safe: all new User columns are nullable. NextAuth tables dropped only after
-- data is migrated (Account/Session have no app data; VerificationToken unused).

-- 1. Drop NextAuth-managed tables (no app data lives here)
DROP TABLE IF EXISTS "Session" CASCADE;
DROP TABLE IF EXISTS "Account" CASCADE;
DROP TABLE IF EXISTS "VerificationToken" CASCADE;

-- 2. Add Clerk-compatible changes to User
--    The existing `id` column stays as-is (CUID → will be replaced by Clerk ID
--    for new users; existing row migrated separately via /api/admin/migrate-user).
--    Make email non-nullable for Clerk users (Clerk always provides email).
ALTER TABLE "User" ALTER COLUMN "email" SET NOT NULL;

-- 3. Add onboarding profile columns (all nullable — existing rows unaffected)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "onboardingComplete" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "heightCm"           DOUBLE PRECISION;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "startingWeightKg"   DOUBLE PRECISION;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "age"                INTEGER;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "sex"                TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "activityLevel"      TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "primaryGoal"        TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "fitnessExperience"  TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "dietaryPreference"  TEXT;
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "equipment"          TEXT;

-- 4. Add createdAt if missing (NextAuth schema did not have it)
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- 5. Remove NextAuth-only columns from User (emailVerified not used by Clerk)
ALTER TABLE "User" DROP COLUMN IF EXISTS "emailVerified";

-- 6. Create UserPlan table
CREATE TABLE IF NOT EXISTS "UserPlan" (
    "id"          TEXT NOT NULL,
    "userId"      TEXT NOT NULL,
    "mealPlan"    TEXT NOT NULL,
    "workoutPlan" TEXT NOT NULL,
    "summary"     TEXT NOT NULL,
    "generatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt"   TIMESTAMP(3) NOT NULL,
    CONSTRAINT "UserPlan_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "UserPlan_userId_key" ON "UserPlan"("userId");

ALTER TABLE "UserPlan" ADD CONSTRAINT "UserPlan_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
