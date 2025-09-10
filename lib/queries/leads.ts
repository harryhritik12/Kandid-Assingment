// lib/queries/leads.ts
import { Lead } from "@/types/lead";
import { db } from "@/lib/db";
import { leads } from "@/drizzle/schema";
import { eq } from "drizzle-orm";
/**
 * Fetch paginated leads (all campaigns, optional search)
 */
export async function fetchLeads(
  page = 1,
  search = ""
): Promise<{ items: Lead[]; nextPage: number | null }> {
  const params = new URLSearchParams();
  params.set("page", page.toString());
  if (search) params.set("search", search);

  const res = await fetch(`/api/leads?${params.toString()}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch leads");
  }

  return res.json();
}

/**
 * Fetch all leads for a specific campaign
 */
export async function fetchLeadsByCampaignId(campaignId: string): Promise<Lead[]> {
  const rows = await db
    .select()
    .from(leads)
    .where(eq(leads.campaignId, campaignId));

  return rows.map((row) => ({
    ...row,
    status: row.status as Lead["status"], // 👈 force-cast
  }));
}
