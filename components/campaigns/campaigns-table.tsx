"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import CampaignProgress from "./campaign-progress";

export interface Campaign {
  id: string;
  name: string;
  status: string;
  totalLeads: number;
  requests?: {
    sent: number;
    pending: number;
    failed: number;
  };
  connections?: {
    people: number;
    chats: number;
  };
}

export default function CampaignsTable() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  async function fetchCampaigns() {
    const res = await fetch("/api/campaigns", { cache: "no-store" });
    const json = await res.json();

    const data: Campaign[] = (json.data || []).map((c: any) => ({
      ...c,
      requests: c.requests || { sent: 0, pending: 0, failed: 0 },
      connections: c.connections || { people: 0, chats: 0 },
    }));

    setCampaigns(data);
  }

  const filtered = useMemo(() => {
    let list = campaigns;
    if (statusFilter !== "all") {
      list = list.filter(
        (c) => c.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    if (search.trim()) {
      list = list.filter((c) =>
        c.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return list;
  }, [campaigns, statusFilter, search]);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Campaigns</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          + Create Campaign
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 mb-4">
        {["all", "active", "inactive"].map((tab) => (
          <button
            key={tab}
            onClick={() => setStatusFilter(tab)}
            className={`px-3 py-1 rounded ${
              statusFilter === tab
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            {tab[0].toUpperCase() + tab.slice(1)}
          </button>
        ))}

        <input
          type="text"
          placeholder="Search campaigns..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="ml-auto border px-3 py-1 rounded w-64"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600 text-left">
            <tr>
              <th className="p-3">Campaign Name</th>
              <th className="p-3">Status</th>
              <th className="p-3">Total Leads</th>
              <th className="p-3">Progress</th>
              <th className="p-3">Request Status</th>
              <th className="p-3">Connection Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-gray-500">
                  No campaigns found
                </td>
              </tr>
            ) : (
              filtered.map((c) => {
                const percent =
                  c.totalLeads > 0
                    ? ((c.requests?.sent ?? 0) / c.totalLeads) * 100
                    : 0;

                return (
                  <tr
                    key={c.id}
                    className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() =>
                      router.push(`/dashboard/campaigns/${c.id}`)
                    }
                  >
                    <td className="p-3 font-medium text-blue-600 hover:underline">
                      {c.name}
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-3">{c.totalLeads}</td>
                    <td className="p-3">
                      <CampaignProgress percent={percent} />
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1 text-green-600">
                          🟢 {c.requests?.sent ?? 0}
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          🕒 {c.requests?.pending ?? 0}
                        </span>
                        <span className="flex items-center gap-1 text-red-600">
                          ❌ {c.requests?.failed ?? 0}
                        </span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-6">
                        <span className="flex items-center gap-1 text-blue-600">
                          👥 {c.connections?.people ?? 0}
                        </span>
                        <span className="flex items-center gap-1 text-purple-600">
                          💬 {c.connections?.chats ?? 0}
                        </span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
