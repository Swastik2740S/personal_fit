import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayStart, isWithinBackfillWindow } from "@/lib/day";
import { weightSchema } from "@/lib/validation";

// GET /api/weight?days=N - bodyweight history (default last 30 days), oldest→newest
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const daysParam = Number(new URL(req.url).searchParams.get("days"));
    const days = Number.isFinite(daysParam) && daysParam > 0 ? Math.min(daysParam, 365) : 30;

    const since = new Date();
    since.setHours(0, 0, 0, 0);
    since.setDate(since.getDate() - (days - 1));

    const logs = await db.weightLog.findMany({
      where: { userId, date: { gte: since } },
      orderBy: { date: "asc" },
      select: { date: true, weight: true },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Weight GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/weight - upsert bodyweight for the selected day (one row per day)
export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = weightSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const date = getDayStart(req);
    if (!isWithinBackfillWindow(date)) {
      return NextResponse.json(
        { error: "Date is outside the editable 7-day window" },
        { status: 400 }
      );
    }

    const { weight } = parsed.data;
    const log = await db.weightLog.upsert({
      where: { userId_date: { userId, date } },
      update: { weight },
      create: { userId, weight, date },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Weight POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
