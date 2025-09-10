// lib/queries/campaigns.ts
import { db } from "../db";
import { campaigns, leads } from "../../drizzle/schema";
import { eq, sql } from "drizzle-orm";

export async function getAllCampaigns() {
  const rows = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      status: campaigns.status,
      createdAt: campaigns.createdAt,
      totalLeads: sql<number>`count(${leads.id})`.as("totalLeads"),
      successfulLeads: sql<number>`count(${leads.id}) filter (where ${leads.status} = 'Accepted')`.as("successfulLeads"),
    })
    .from(campaigns)
    .leftJoin(leads, eq(leads.campaignId, campaigns.id))
    .groupBy(campaigns.id, campaigns.name, campaigns.status, campaigns.createdAt);

  return rows;
}

export async function getCampaignById(id: string) {
  const rows = await db
    .select({
      id: campaigns.id,
      name: campaigns.name,
      status: campaigns.status,
      createdAt: campaigns.createdAt,
      totalLeads: sql<number>`count(${leads.id})`.as("totalLeads"),
      successfulLeads: sql<number>`count(${leads.id}) filter (where ${leads.status} = 'Accepted')`.as("successfulLeads"),
    })
    .from(campaigns)
    .leftJoin(leads, eq(leads.campaignId, campaigns.id))
    .where(eq(campaigns.id, id))
    .groupBy(campaigns.id, campaigns.name, campaigns.status, campaigns.createdAt);

  return rows[0] || null;
}

export async function createCampaign(data: { name: string; status?: string }) {
  const [row] = await db
    .insert(campaigns)
    .values({
      name: data.name,
      status: data.status ?? "Draft",
    })
    .returning();
  return row;
}

export async function updateCampaign(id: string, patch: Partial<{ name: string; status: string }>) {
  const [row] = await db
    .update(campaigns)
    .set(patch)
    .where(eq(campaigns.id, id))
    .returning();
  return row;
}

export async function deleteCampaign(id: string) {
  await db.delete(campaigns).where(eq(campaigns.id, id));
  return true;
}