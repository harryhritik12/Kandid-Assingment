import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // your drizzle client
import { leads } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

// GET /api/leads/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const result = await db
    .select()
    .from(leads)
    .where(eq(leads.id, params.id));

  if (result.length === 0) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(result[0]);
}

// PATCH /api/leads/:id
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const [updatedLead] = await db
    .update(leads)
    .set({
      name: body.name,
      email: body.email,
      company: body.company,
      status: body.status,
      campaignId: body.campaignId,
      updatedAt: new Date(),
    })
    .where(eq(leads.id, params.id))
    .returning();

  if (!updatedLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json(updatedLead);
}

// DELETE /api/leads/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const [deletedLead] = await db
    .delete(leads)
    .where(eq(leads.id, params.id))
    .returning();

  if (!deletedLead) {
    return NextResponse.json({ error: "Lead not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
