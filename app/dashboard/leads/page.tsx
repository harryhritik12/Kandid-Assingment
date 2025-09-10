"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import LeadsTable from "@/components/leads/leads-table";
import LeadDetailSheet from "@/components/leads/lead-detail-sheet";
import { Lead } from "@/types/lead";
import { fetchLeads } from "@/lib/queries/leads";
import LoadingSpinner from "@/components/shared/loading-spinner";
import InfiniteScroll from "@/components/shared/infinite-scroll";
import { Input } from "@/components/ui/input";

export default function LeadsPage() {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [search, setSearch] = useState("");

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
  } = useInfiniteQuery({
    queryKey: ["leads", search],
    queryFn: ({ pageParam }) => fetchLeads(pageParam, search),
    initialPageParam: 1, // ✅ required in React Query v5
    getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
  });

  const leads = data?.pages.flatMap((p) => p.items) || [];

  return (
    <div className="p-6 space-y-6">
      {/* Search Bar */}
      <div className="flex items-center gap-3">
        <Input
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80"
        />
      </div>

      {/* Leads Table */}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <InfiniteScroll
          loadMore={fetchNextPage}
          hasMore={!!hasNextPage}
          isLoading={isFetchingNextPage}
        >
          <LeadsTable leads={leads} onSelect={setSelectedLead} />
        </InfiniteScroll>
      )}

      {/* Lead Details Side Sheet */}
      {selectedLead && (
        <LeadDetailSheet
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}
