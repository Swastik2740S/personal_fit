import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { count } = await req.json();

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // Check if entry for today exists
    const existing = await db.stepLog.findFirst({
      where: {
        userId: user.id,
        date: { gte: startOfDay },
      },
    });

    if (existing) {
      const updated = await db.stepLog.update({
        where: { id: existing.id },
        data: { count },
      });
      return NextResponse.json(updated);
    } else {
      const created = await db.stepLog.create({
        data: {
          userId: user.id,
          count,
        },
      });
      return NextResponse.json(created);
    }
  } catch (error) {
    console.error("Step Log POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) return NextResponse.json({ count: 0 });

    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const stepLog = await db.stepLog.findFirst({
      where: {
        userId: user.id,
        date: { gte: startOfDay },
      },
    });

    return NextResponse.json(stepLog || { count: 0 });
  } catch (error) {
    console.error("Step Log GET error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
