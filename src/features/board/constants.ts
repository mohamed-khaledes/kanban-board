import { KanbanColumn, Priority } from "@/types";

export const COLUMNS: KanbanColumn[] = [
  { id: "backlog",     label: "Backlog",      color: "#6C63FF", accent: "bg-[#6C63FF]" },
  { id: "in_progress", label: "In Progress",  color: "#F59E0B", accent: "bg-[#F59E0B]" },
  { id: "review",      label: "Review",       color: "#3B82F6", accent: "bg-[#3B82F6]" },
  { id: "done",        label: "Done",         color: "#10B981", accent: "bg-[#10B981]" },
];

export const TAG_CONFIG: Record<Priority, { label: string; bg: string; text: string; border: string }> = {
  low:  { label: "low",  bg: "bg-[#10B98122]", text: "text-[#10B981]", border: "border-[#10B98144]" },
  mid:  { label: "mid",  bg: "bg-[#F59E0B22]", text: "text-[#F59E0B]", border: "border-[#F59E0B44]" },
  high: { label: "high", bg: "bg-[#EF444422]", text: "text-[#EF4444]", border: "border-[#EF444444]" },
};

export const PAGE_SIZE = 4;
