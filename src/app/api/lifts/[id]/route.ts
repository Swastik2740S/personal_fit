import { NextRequest, NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { userId, error } = await requireUser();
  if (error) return error;

  const { id } = await params;

  const entry = await db.liftLog.findUnique({ where: { id } });
  if (!entry || entry.userId !== userId) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await db.liftLog.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
