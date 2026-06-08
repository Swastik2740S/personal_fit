import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

const MAX_RECENT = 8;

// GET /api/food/recent - distinct recently-logged foods, normalized to per-100g
// (the same basis as search results) so they flow into the quantity modal.
export async function GET() {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    // Scan recent logs; dedupe by name keeping the most recent occurrence.
    const logs = await db.foodLog.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      take: 60,
      select: { name: true, qty: true, cal: true, prot: true, carb: true, fat: true },
    });

    const seen = new Set<string>();
    const recent: { name: string; cal: number; prot: number; carb: number; fat: number }[] = [];

    for (const log of logs) {
      if (seen.has(log.name) || log.qty <= 0) continue;
      seen.add(log.name);
      const f = 100 / log.qty; // logged macros are absolute → back to per-100g
      recent.push({
        name: log.name,
        cal: log.cal * f,
        prot: log.prot * f,
        carb: log.carb * f,
        fat: log.fat * f,
      });
      if (recent.length >= MAX_RECENT) break;
    }

    return NextResponse.json(recent);
  } catch (error) {
    console.error("Recent Foods GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
