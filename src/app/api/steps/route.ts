import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart, getDayRange, isWithinBackfillWindow } from "@/lib/day";
import { stepSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = stepSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { count } = parsed.data;
    const date = getDayStart(req);

    if (!isWithinBackfillWindow(date)) {
      return NextResponse.json(
        { error: "Date is outside the editable 7-day window" },
        { status: 400 }
      );
    }

    // One row per user per day, enforced by the @@unique([userId, date]) index.
    const log = await db.stepLog.upsert({
      where: { userId_date: { userId, date } },
      update: { count },
      create: { userId, count, date },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Step Log POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { start, end } = getDayRange(req);

    const stepLog = await db.stepLog.findFirst({
      where: { userId, date: { gte: start, lt: end } },
    });

    return NextResponse.json(stepLog || { count: 0 });
  } catch (error) {
    console.error("Step Log GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
