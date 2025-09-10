// app/api/campaigns/route.ts
import { NextResponse } from "next/server";
import { getAllCampaigns, createCampaign } from "../../../lib/queries/campaigns";

export async function GET() {
  const list = await getAllCampaigns();
  return NextResponse.json({ data: list });
}

export async function POST(req: Request) {
  const body = await req.json();
  if (!body.name) {
    return NextResponse.json({ error: "Name required" }, { status: 400 });
  }
  const created = await createCampaign({ name: body.name, status: body.status });
  return NextResponse.json({ data: created }, { status: 201 });
}
