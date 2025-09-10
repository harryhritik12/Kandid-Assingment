"use client";

import { Lead } from "@/types/lead";

interface LeadsTableProps {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
}

export default function LeadsTable({ leads, onSelect }: LeadsTableProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Campaign</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Activity</th>
            <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {leads.map((lead) => (
            <tr
              key={lead.id}
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => onSelect(lead)}
            >
              {/* Name Column */}
              <td className="py-3 px-4">
                <div>
                  <div className="font-medium text-gray-900 text-sm">
                    {lead.name || "Unnamed Lead"}
                  </div>
                  <div className="text-gray-500 text-xs mt-1">
                    {lead.company || "No company"}
                  </div>
                </div>
              </td>

              {/* Campaign Name Column */}
              <td className="py-3 px-4 text-sm text-gray-700">
                {lead.campaignName || "No campaign"}
              </td>

              {/* Activity Column */}
              <td className="py-3 px-4">
                <div className="w-4 h-4 border border-gray-300 rounded-sm flex items-center justify-center"></div>
              </td>

              {/* Status Column */}
              <td className="py-3 px-4">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    lead.status?.includes("Pending Approval")
                      ? "bg-yellow-100 text-yellow-800"
                      : lead.status?.includes("Sent")
                      ? "bg-green-100 text-green-800"
                      : lead.status?.includes("Do Not Contact")
                      ? "bg-red-100 text-red-800"
                      : lead.status?.includes("Followup")
                      ? "bg-blue-100 text-blue-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {lead.status || "Pending"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
