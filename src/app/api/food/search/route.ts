import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

// Cached nutrition data older than this is treated as stale and refetched.
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim().toLowerCase();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // 1. Serve from cache if present and fresh
    const cached = await db.foodCache.findUnique({ where: { query } });
    if (cached && Date.now() - cached.createdAt.getTime() < CACHE_TTL_MS) {
      return NextResponse.json(JSON.parse(cached.data));
    }

    // 2. Fetch from Edamam
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}&nutrition-type=logging`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Edamam API failure");

    const data = await res.json();

    // Map to our internal format
    const foods = data.hints
      .map((item: { food: { label: string; nutrients: Record<string, number> } }) => ({
        name: item.food.label,
        cal: item.food.nutrients.ENERC_KCAL || 0,
        prot: item.food.nutrients.PROCNT || 0,
        carb: item.food.nutrients.CHOCDF || 0,
        fat: item.food.nutrients.FAT || 0,
      }))
      .slice(0, 10);

    // 3. Upsert into cache (refreshes createdAt so the TTL window restarts)
    const serialized = JSON.stringify(foods);
    await db.foodCache.upsert({
      where: { query },
      update: { data: serialized, createdAt: new Date() },
      create: { query, data: serialized },
    });

    return NextResponse.json(foods);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
