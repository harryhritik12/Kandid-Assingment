// lib/queries/leads.ts (client-safe)
import { Lead } from "@/types/lead";

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

export async function fetchLeadsByCampaignId(campaignId: string): Promise<Lead[]> {
  const res = await fetch(`/api/campaigns/${campaignId}/leads`);
  if (!res.ok) {
    throw new Error("Failed to fetch campaign leads");
  }
  return res.json();
}
