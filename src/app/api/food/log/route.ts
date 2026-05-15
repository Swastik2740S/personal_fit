import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";

// POST /api/food/log - Add a food log entry
export async function POST(req: Request) {
  try {
    const session = await getServerSession();
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
    const session = await getServerSession();
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
