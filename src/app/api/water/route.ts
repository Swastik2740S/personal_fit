import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart, getDayRange, isWithinBackfillWindow } from "@/lib/day";
import { waterSchema } from "@/lib/validation";

// POST /api/water - set the day's water total in ml (same upsert pattern as steps)
export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = waterSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { ml } = parsed.data;
    const date = getDayStart(req);

    if (!isWithinBackfillWindow(date)) {
      return NextResponse.json(
        { error: "Date is outside the editable 7-day window" },
        { status: 400 }
      );
    }

    // One row per user per day, enforced by the @@unique([userId, date]) index.
    const log = await db.waterLog.upsert({
      where: { userId_date: { userId, date } },
      update: { ml },
      create: { userId, ml, date },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Water Log POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { start, end } = getDayRange(req);

    const waterLog = await db.waterLog.findFirst({
      where: { userId, date: { gte: start, lt: end } },
    });

    return NextResponse.json(waterLog || { ml: 0 });
  } catch (error) {
    console.error("Water Log GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
