"use client";
import React from "react";

export default function CampaignProgress({ percent }: { percent: number }) {
  const safe = Math.max(0, Math.min(100, percent));
  return (
    <div className="w-40">
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <div
          style={{ width: `${safe}%` }}
          className="h-2 bg-green-500 rounded-full transition-all"
        />
      </div>
      <span className="text-xs text-gray-500">{safe.toFixed(0)}%</span>
    </div>
  );
}
