// app/api/campaigns/[id]/leads/route.ts
import { NextResponse } from "next/server";
import { fetchLeadsByCampaignId } from "@/lib/queries/leads";

// GET all leads for a campaign
export async function GET(
  _: Request,
  context: { params: Promise<{ id: string }> }  // 👈 params is a Promise
) {
  const { id } = await context.params;           // 👈 await it

  try {
    const leads = await fetchLeadsByCampaignId(id);

    return NextResponse.json(
      { data: leads ?? [] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
