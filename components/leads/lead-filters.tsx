"use client";

import { Input } from "@/components/ui/input";
import { Select, SelectItem } from "@/components/ui/select";

export default function LeadFilters() {
  return (
    <div className="flex gap-4 items-center">
      <Input placeholder="Search leads..." className="w-64" />
      <Select defaultValue="all">
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="contacted">Contacted</SelectItem>
        <SelectItem value="responded">Responded</SelectItem>
        <SelectItem value="converted">Converted</SelectItem>
      </Select>
    </div>
  );
}
