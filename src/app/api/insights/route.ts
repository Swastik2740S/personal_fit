import { NextResponse } from "next/server";
import { requireUser } from "@/lib/auth";
import { getDayStart } from "@/lib/day";
import { getInsights } from "@/lib/insights";

// GET /api/insights - logging streak + weekly goal adherence, derived from logs.
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const insights = await getInsights(userId, getDayStart(req));
    return NextResponse.json(insights);
  } catch (error) {
    console.error("Insights GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
