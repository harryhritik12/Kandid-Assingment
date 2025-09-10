// types/lead.ts
export type Lead = {
  id: string;
  name: string;
  email: string;
  company: string;
  title?: string;
  campaign?: string;
  campaignName?: string;
  status: "Pending" | "Contacted" | "Responded" | "Converted" | "Do Not Contact" | "Pending Approval" | "Sent" | "Followup";
  lastContact?: string;
  interactions?: string[];
  timestamp?: string; // Add this for "7 mins ago", "10 mins ago"
};