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
    console.log("POST /api/food/log - Received body:", body);
    
    const { name, qty, cal, prot, carb, fat, mealType } = body;

    // Simple validation
    if (!name || qty === undefined || cal === undefined) {
      console.error("POST /api/food/log - Missing required fields:", { name, qty, cal });
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const log = await db.foodLog.create({
      data: {
        userId: user.id,
        name: String(name),
        qty: Number(qty),
        cal: Number(cal),
        prot: Number(prot || 0),
        carb: Number(carb || 0),
        fat: Number(fat || 0),
        mealType: String(mealType || "Snack"),
      },
    });

    console.log("POST /api/food/log - Successfully created log:", log.id);
    return NextResponse.json(log);
  } catch (error) {
    console.error("Log API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// GET /api/food/log - Get logs for today
export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json([]);

    const { searchParams } = new URL(req.url);
    const localStart = searchParams.get("localStart");
    
    let startOfDay: Date;
    if (localStart) {
      startOfDay = new Date(localStart);
    } else {
      startOfDay = new Date();
      startOfDay.setHours(0, 0, 0, 0);
    }

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
    const localStart = searchParams.get("localStart");

    if (all === "true") {
      let startOfDay: Date;
      if (localStart) {
        startOfDay = new Date(localStart);
      } else {
        startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
      }

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
      // First verify ownership
      const logEntry = await db.foodLog.findUnique({
        where: { id }
      });

      if (!logEntry || logEntry.userId !== user.id) {
        return NextResponse.json({ error: "Unauthorized or not found" }, { status: 403 });
      }

      await db.foodLog.delete({
        where: { id },
      });
      return NextResponse.json({ message: "Deleted log entry" });
    }

    return NextResponse.json({ error: "Missing ID or 'all' parameter" }, { status: 400 });
  } catch (error) {
    console.error("Log DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
