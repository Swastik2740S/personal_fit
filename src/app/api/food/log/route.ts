import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

// POST /api/food/log - Add a food log entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const body = await req.json();
    const { name, qty, cal, prot, carb, fat } = body;

    const log = await db.foodLog.create({
      data: {
        userId: user.id,
        name,
        qty,
        cal,
        prot,
        carb,
        fat,
      },
    });

    return NextResponse.json(log);
  } catch (error) {
    console.error("Log API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/food/log - Get logs for today
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json([]);

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const logs = await db.foodLog.findMany({
      where: {
        userId: user.id,
        date: {
          gte: startOfDay,
        },
      },
      orderBy: {
        date: "desc",
      },
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
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const all = searchParams.get("all");

    if (all === "true") {
      const startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);

      await db.foodLog.deleteMany({
        where: {
          userId: user.id,
          date: {
            gte: startOfDay,
          },
        },
      });
      return NextResponse.json({ message: "Cleared all logs" });
    }

    if (id) {
      await db.foodLog.delete({
        where: {
          id,
          userId: user.id, // Ensure user owns the log
        },
      });
      return NextResponse.json({ message: "Deleted log entry" });
    }

    return NextResponse.json({ error: "Missing ID or 'all' parameter" }, { status: 400 });
  } catch (error) {
    console.error("Log DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
