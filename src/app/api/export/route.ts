import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

const TYPES = ["food", "steps", "weight"] as const;
type ExportType = (typeof TYPES)[number];

// RFC 4180: quote every field, double embedded quotes.
function csv(rows: (string | number)[][]): string {
  return rows
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\r\n");
}

// GET /api/export?type=food|steps|weight - download the user's logs as CSV.
export async function GET(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const type = (new URL(req.url).searchParams.get("type") ?? "food") as ExportType;
    if (!TYPES.includes(type)) {
      return NextResponse.json({ error: "Invalid type" }, { status: 400 });
    }

    let rows: (string | number)[][];
    if (type === "food") {
      const logs = await db.foodLog.findMany({
        where: { userId },
        orderBy: { date: "asc" },
      });
      rows = [
        ["date", "meal", "name", "qty_g", "calories", "protein_g", "carbs_g", "fat_g"],
        ...logs.map((l) => [
          l.date.toISOString(),
          l.mealType,
          l.name,
          l.qty,
          l.cal,
          l.prot,
          l.carb,
          l.fat,
        ]),
      ];
    } else if (type === "steps") {
      const logs = await db.stepLog.findMany({
        where: { userId },
        orderBy: { date: "asc" },
      });
      rows = [["date", "steps"], ...logs.map((l) => [l.date.toISOString(), l.count])];
    } else {
      const logs = await db.weightLog.findMany({
        where: { userId },
        orderBy: { date: "asc" },
      });
      rows = [["date", "weight_kg"], ...logs.map((l) => [l.date.toISOString(), l.weight])];
    }

    const today = new Date().toISOString().slice(0, 10);
    return new NextResponse(csv(rows), {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="swastikfit-${type}-${today}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Export API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
