import { NextResponse } from "next/server";
import { db } from "@/lib/db";

const EDAMAM_APP_ID = process.env.EDAMAM_APP_ID;
const EDAMAM_APP_KEY = process.env.EDAMAM_APP_KEY;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.trim().toLowerCase();

  if (!query) {
    return NextResponse.json({ error: "Missing query" }, { status: 400 });
  }

  try {
    // 1. Check Cache
    const cached = await db.foodCache.findUnique({
      where: { query },
    });

    if (cached) {
      console.log(`Cache hit for: ${query}`);
      return NextResponse.json(JSON.parse(cached.data));
    }

    // 2. Fetch from Edamam
    console.log(`Cache miss for: ${query}. Fetching from Edamam...`);
    const url = `https://api.edamam.com/api/food-database/v2/parser?app_id=${EDAMAM_APP_ID}&app_key=${EDAMAM_APP_KEY}&ingr=${encodeURIComponent(query)}&nutrition-type=logging`;

    const res = await fetch(url);
    if (!res.ok) throw new Error("Edamam API failure");

    const data = await res.json();

    // Map to our internal format
    const foods = data.hints.map((item: any) => ({
      name: item.food.label,
      cal: item.food.nutrients.ENERC_KCAL || 0,
      prot: item.food.nutrients.PROCNT || 0,
      carb: item.food.nutrients.CHOCDF || 0,
      fat: item.food.nutrients.FAT || 0,
    })).slice(0, 10);

    // 3. Save to Cache
    await db.foodCache.create({
      data: {
        query,
        data: JSON.stringify(foods),
      },
    });

    return NextResponse.json(foods);
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
