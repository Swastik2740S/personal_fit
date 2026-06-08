-- AlterTable: add mealType to FoodLog.
-- Reconciles pre-existing drift — this column was already present on the live
-- database (added outside migration history). Recorded here so fresh clones
-- build the same schema; marked as already-applied on the existing DB via
-- `prisma migrate resolve --applied` so no data is touched.
ALTER TABLE "FoodLog" ADD COLUMN "mealType" TEXT NOT NULL DEFAULT 'Snack';
