import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/drizzle/schema";
import { ilike } from "drizzle-orm";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  const results = await db
    .select()
    .from(leads)
    .where(ilike(leads.name, `%${q}%`));

  return NextResponse.json(results);
}