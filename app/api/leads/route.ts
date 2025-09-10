import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // your drizzle client
import { leads } from "@/drizzle/schema";
import { eq, ilike, and, or, count } from "drizzle-orm";

// GET /api/leads?page=1&search=abc
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const pageSize = 10;

  // Filter condition
  const where = search
    ? or(ilike(leads.name, `%${search}%`), ilike(leads.email, `%${search}%`))
    : undefined;

  // Fetch paginated data
  const filtered = await db
    .select()
    .from(leads)
    .where(where)
    .limit(pageSize)
    .offset((page - 1) * pageSize);

  // Count total rows
  const total = await db
    .select({ count: count() })
    .from(leads)
    .where(where);

  const totalCount = Number(total[0]?.count ?? 0);
  const nextPage = page * pageSize < totalCount ? page + 1 : null;

  return NextResponse.json({ items: filtered, nextPage });
}
