import React from "react";
import CampaignsTable from "../../../components/campaigns/campaigns-table";

export const metadata = {
  title: "Campaigns | Dashboard",
};

export default function CampaignsPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-2">Campaigns</h1>
      <p className="text-gray-600 mb-6">
        Manage and track performance of your campaigns.
      </p>
      <CampaignsTable />
    </div>
  );
}
