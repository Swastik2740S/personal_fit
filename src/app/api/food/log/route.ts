import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { getDayRange, isWithinBackfillWindow } from "@/lib/day";
import { foodLogSchema } from "@/lib/validation";

// POST /api/food/log - Add a food log entry (to today or a selected past day)
export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = foodLogSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    // The day comes from `?localStart=`; default is today. Stamp it explicitly
    // so backfilled entries land on the chosen day (Prisma's default is now()).
    const { start } = getDayRange(req);
    if (!isWithinBackfillWindow(start)) {
      return NextResponse.json(
        { error: "Date is outside the editable 7-day window" },
        { status: 400 }
      );
    }

    const log = await db.foodLog.create({
      data: { userId, ...parsed.data, date: start },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Log API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/food/log - Get logs for the selected day (defaults to today)
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { start, end } = getDayRange(req);

    const logs = await db.foodLog.findMany({
      where: {
        userId,
        date: { gte: start, lt: end },
      },
      orderBy: { date: "desc" },
    });

    return NextResponse.json(logs);
  } catch (error) {
    console.error("Log GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/food/log - Delete a specific log or clear all for today
export async function DELETE(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");

    if (all === "true") {
      const { start, end } = getDayRange(req);
      await db.foodLog.deleteMany({
        where: {
          userId,
          date: { gte: start, lt: end },
        },
      });
      return NextResponse.json({ message: "Cleared all logs" });
    }

    if (id) {
      // Verify ownership before deleting
      const logEntry = await db.foodLog.findUnique({ where: { id } });
      if (!logEntry || logEntry.userId !== userId) {
        return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
      }

      await db.foodLog.delete({ where: { id } });
      return NextResponse.json({ message: "Deleted log entry" });
    }

    return NextResponse.json({ error: "Missing ID or 'all' parameter" }, { status: 400 });
  } catch (error) {
    console.error("Log DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
