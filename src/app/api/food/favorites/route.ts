import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";
import { favoriteFoodSchema } from "@/lib/validation";

const FAV_SELECT = { name: true, cal: true, prot: true, carb: true, fat: true };

// GET /api/food/favorites - list the user's saved quick-add foods
export async function GET() {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const favorites = await db.favoriteFood.findMany({
      where: { userId },
      select: FAV_SELECT,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error("Favorites GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST /api/food/favorites - star a food (idempotent: upsert on name)
export async function POST(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const parsed = favoriteFoodSchema.safeParse(await req.json());
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, ...macros } = parsed.data;
    const favorite = await db.favoriteFood.upsert({
      where: { userId_name: { userId, name } },
      update: macros,
      create: { userId, name, ...macros },
      select: FAV_SELECT,
    });

    return NextResponse.json(favorite);
  } catch (error) {
    console.error("Favorites POST Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE /api/food/favorites?name= - unstar a food
export async function DELETE(req: Request) {
  try {
    const { userId, error } = await requireUser();
    if (error) return error;

    const name = new URL(req.url).searchParams.get("name");
    if (!name) {
      return NextResponse.json({ error: "Missing name parameter" }, { status: 400 });
    }

    await db.favoriteFood.deleteMany({ where: { userId, name } });
    return NextResponse.json({ message: "Removed favorite" });
  } catch (error) {
    console.error("Favorites DELETE Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
