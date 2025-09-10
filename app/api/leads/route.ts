import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { leads } from "@/drizzle/schema";
import { eq, ilike, and, or, count, sql } from "drizzle-orm";

// GET /api/leads?page=1&search=abc
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const search = searchParams.get("search") || "";
    const pageSize = 10;

    // Build where condition
    let whereCondition;
    if (search) {
      whereCondition = or(
        ilike(leads.name, `%${search}%`),
        ilike(leads.email, `%${search}%`),
        ilike(leads.company, `%${search}%`)
      );
    }

    // Fetch paginated data with proper ordering
    const filtered = await db
      .select()
      .from(leads)
      .where(whereCondition)
      .orderBy(leads.createdAt || leads.id) // Add proper ordering
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    // Count total rows with the same filter
    const totalResult = await db
      .select({ count: count() })
      .from(leads)
      .where(whereCondition);

    const totalCount = totalResult[0]?.count || 0;
    const totalPages = Math.ceil(totalCount / pageSize);
    const nextPage = page < totalPages ? page + 1 : null;
    const prevPage = page > 1 ? page - 1 : null;

    return NextResponse.json({
      items: filtered,
      pagination: {
        currentPage: page,
        pageSize,
        totalCount,
        totalPages,
        nextPage,
        prevPage
      }
    });

  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}