// app/api/campaigns/[id]/route.ts
import { NextResponse } from "next/server";
import { db } from "../../../../lib/db";
import { campaigns, leads } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

/**
 * GET /api/campaigns/:id
 * Returns campaign details + its leads
 */
export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // Fetch campaign
  const [campaign] = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.id, id));

  if (!campaign) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  // Fetch related leads
  const campaignLeads = await db
    .select()
    .from(leads)
    .where(eq(leads.campaignId, id));

  return NextResponse.json({
    data: {
      ...campaign,
      leads: campaignLeads,
      totalLeads: campaignLeads.length,
    },
  });
}

/**
 * PATCH /api/campaigns/:id
 * Update a campaign
 */
export async function PATCH(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  const body = await req.json();

  const [updated] = await db
    .update(campaigns)
    .set({
      name: body.name,
      status: body.status,
    })
    .where(eq(campaigns.id, id))
    .returning();

  if (!updated) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ data: updated });
}

/**
 * DELETE /api/campaigns/:id
 * Delete a campaign and its leads
 */
export async function DELETE(_: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  // delete leads first (FK constraint safety)
  await db.delete(leads).where(eq(leads.campaignId, id));
  // then delete campaign
  await db.delete(campaigns).where(eq(campaigns.id, id));

  return NextResponse.json({ success: true });
}
