// app/dashboard/campaigns/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

interface CampaignDetail {
  id: string;
  name: string;
  status: string;
  totalLeads: number;
  startDate: string;
  requests: {
    sent: number;
    accepted: number;
    replied: number;
    failed: number;
    pending: number;
  };
  connections: {
    people: number;
    chats: number;
  };
  createdAt: string;
}

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [campaign, setCampaign] = useState<CampaignDetail | null>(null);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch campaign
  useEffect(() => {
    if (!id) return;

    async function fetchCampaign() {
      try {
        const res = await fetch(`/api/campaigns/${id}`, { cache: "no-store" });
        const data = await res.json();
        const campaignData = data.data || data;

        if (campaignData) {
          setCampaign({
            ...campaignData,
            requests: {
              sent: campaignData.requests?.sent || 0,
              accepted: campaignData.requests?.accepted || 0,
              replied: campaignData.requests?.replied || 0,
              failed: campaignData.requests?.failed || 0,
              pending: campaignData.requests?.pending || 0,
            },
            connections: {
              people: campaignData.connections?.people || 0,
              chats: campaignData.connections?.chats || 0,
            },
            startDate: campaignData.startDate || campaignData.createdAt,
          });
        } else {
          setCampaign(null);
        }
      } catch (e) {
        console.error("Failed to fetch campaign:", e);
        setCampaign(null);
      } finally {
        setLoading(false);
      }
    }

    fetchCampaign();
  }, [id]);

  // Fetch leads (only when Leads tab is active)
  useEffect(() => {
    if (!id || activeTab !== "leads") return;

    async function fetchLeads() {
      try {
        const res = await fetch(`/api/campaigns/${id}/leads`, { cache: "no-store" });
        const data = await res.json();
        setLeads(data.data || []);
      } catch (e) {
        console.error("Failed to fetch leads:", e);
        setLeads([]);
      }
    }

    fetchLeads();
  }, [id, activeTab]);

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!campaign) {
    return (
      <div className="p-6">
        <button
          onClick={() => router.push("/dashboard/campaigns")}
          className="mb-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
        >
          ← Back to Campaigns
        </button>
        <div className="text-red-600 bg-red-50 p-4 rounded border border-red-200">
          Campaign not found
        </div>
      </div>
    );
  }

  // Calculate metrics
  const contactedPercent =
    campaign.totalLeads > 0
      ? (campaign.requests.sent / campaign.totalLeads) * 100
      : 0;

  const acceptanceRate =
    campaign.requests.sent > 0
      ? (campaign.requests.accepted / campaign.requests.sent) * 100
      : 0;

  const replyRate =
    campaign.requests.accepted > 0
      ? (campaign.requests.replied / campaign.requests.accepted) * 100
      : 0;

  return (
    <div className="p-6">
      {/* Back button */}
      <button
        onClick={() => router.push("/dashboard/campaigns")}
        className="mb-4 px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
      >
        ← Back to Campaigns
      </button>

      {/* Header */}
      <h1 className="text-2xl font-bold mb-2">{campaign.name}</h1>
      <p className="text-gray-600 mb-6">Manage and track your campaign performance</p>

      {/* Tabs */}
      <div className="flex border-b mb-6">
        {["overview", "leads", "sequence", "settings"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 font-medium ${
              activeTab === tab
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Overview Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">{campaign.totalLeads}</h2>
            <p className="text-gray-600 mb-2">Total Leads</p>
            <div className="space-y-2 mt-4">
              <div className="flex justify-between">
                <span>Request Sent</span>
                <span className="font-medium">{campaign.requests.sent}</span>
              </div>
              <div className="flex justify-between">
                <span>Request Accepted</span>
                <span className="font-medium">{campaign.requests.accepted}</span>
              </div>
              <div className="flex justify-between">
                <span>Request Replied</span>
                <span className="font-medium">{campaign.requests.replied}</span>
              </div>
            </div>
          </div>

          {/* Progress Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Campaign Progress</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span>Leads Contacted</span>
                  <span className="font-medium">{contactedPercent.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${contactedPercent}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Acceptance Rate</span>
                  <span className="font-medium">{acceptanceRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${acceptanceRate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span>Reply Rate</span>
                  <span className="font-medium">{replyRate.toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${replyRate}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-xl font-bold mb-4">Campaign Details</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Start Date:</span>
                <span>{new Date(campaign.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`px-2 py-1 rounded text-xs font-medium ${
                    campaign.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Conversion Rate:</span>
                <span>0.0%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Leads Content */}
      {activeTab === "leads" && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">Leads</h2>
          {leads.length === 0 ? (
            <p className="text-gray-600">No leads found for this campaign.</p>
          ) : (
            <table className="min-w-full border border-gray-200 rounded">
              <thead className="bg-gray-100 text-left">
                <tr>
                  <th className="px-4 py-2 border-b">Name</th>
                  <th className="px-4 py-2 border-b">Email</th>
                  <th className="px-4 py-2 border-b">Status</th>
                  <th className="px-4 py-2 border-b">Added</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{lead.name}</td>
                    <td className="px-4 py-2 border-b">{lead.email}</td>
                    <td className="px-4 py-2 border-b">{lead.status}</td>
                    <td className="px-4 py-2 border-b">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Other tabs */}
      {activeTab !== "overview" && activeTab !== "leads" && (
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <h2 className="text-xl font-bold mb-4">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Content
          </h2>
          <p className="text-gray-600">This section is under development.</p>
        </div>
      )}
    </div>
  );
}
