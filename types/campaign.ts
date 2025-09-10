// types/campaign.ts
export type CampaignStatus = "draft" | "active" | "paused" | "completed";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  totalLeads: number;
  successfulLeads: number;
  createdAt: string; // ISO
}
