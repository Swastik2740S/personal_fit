-- CreateTable
CREATE TABLE "LiftLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "exercise" TEXT NOT NULL,
    "weightKg" DOUBLE PRECISION NOT NULL,
    "sets" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "notes" TEXT,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LiftLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "LiftLog_userId_exercise_idx" ON "LiftLog"("userId", "exercise");

-- CreateIndex
CREATE INDEX "LiftLog_userId_date_idx" ON "LiftLog"("userId", "date");

-- AddForeignKey
ALTER TABLE "LiftLog" ADD CONSTRAINT "LiftLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
