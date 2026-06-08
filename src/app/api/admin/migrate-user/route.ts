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
  await db.$transaction([
    db.foodLog.updateMany({ where: { userId: oldUser.id }, data: { userId } }),
    db.stepLog.updateMany({ where: { userId: oldUser.id }, data: { userId } }),
    db.weightLog.updateMany({ where: { userId: oldUser.id }, data: { userId } }),
    db.favoriteFood.updateMany({ where: { userId: oldUser.id }, data: { userId } }),
    db.user.delete({ where: { id: oldUser.id } }),
  ]);

  return NextResponse.json({ success: true, migratedFrom: oldUser.id, to: userId });
}
