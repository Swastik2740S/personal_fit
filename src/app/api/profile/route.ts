import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { goalsSchema } from "@/lib/validation";

const GOAL_SELECT = {
  calGoal: true,
  protGoal: true,
  carbGoal: true,
  fatGoal: true,
  stepGoal: true,
  weightGoal: true,
};

// GET /api/profile - current user's goals
export async function GET() {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const user = await db.user.findUnique({
      where: { id: userId },
      select: GOAL_SELECT,
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH /api/profile - update one or more goals
export async function PATCH(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = goalsSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const user = await db.user.update({
      where: { id: userId },
      data: parsed.data,
      select: GOAL_SELECT,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Profile PATCH Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
