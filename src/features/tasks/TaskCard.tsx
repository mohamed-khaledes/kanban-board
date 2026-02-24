'use client';

import { Task } from "@/types";
import { TAG_CONFIG } from "@/features/board/constants";
import { cn } from "@/lib/cn";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: number) => void;
  onDragStart: (e: React.DragEvent, task: Task) => void;
}

export default function TaskCard({ task, onEdit, onDelete, onDragStart }: TaskCardProps) {
  const tag = TAG_CONFIG[task.tag];

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      className={cn(
        "group bg-surface-card border border-surface-border rounded-xl p-3.5",
        "cursor-grab active:cursor-grabbing select-none",
        "transition-all duration-150",
        "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]",
        "animate-fadeUp"
      )}
    >
      {/* Title row */}
      <div className="flex items-start justify-between gap-2">
        <span className="font-display font-semibold text-[13px] text-text-primary leading-snug">
          {task.title}
        </span>

        {/* Actions — visible on hover */}
        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <button
            type="button"
            onClick={() => onEdit(task)}
            className="text-xs px-1.5 py-0.5 rounded-md bg-surface-elevated text-text-muted hover:text-text-primary transition-colors"
            title="Edit"
          >
            ✏️
          </button>
          <button
            type="button"
            onClick={() => onDelete(task.id)}
            className="text-xs px-1.5 py-0.5 rounded-md bg-surface-elevated text-text-muted hover:text-brand-red transition-colors"
            title="Delete"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-[12px] text-text-muted leading-relaxed mt-1.5 line-clamp-2">
          {task.description}
        </p>
      )}

      {/* Priority tag */}
      <span
        className={cn(
          "inline-block mt-2 text-[10px] font-display font-bold uppercase tracking-widest",
          "px-2 py-0.5 rounded-md border",
          tag.bg, tag.text, tag.border
        )}
      >
        {tag.label}
      </span>
    </div>
  );
}
