'use client';

import { useState } from "react";
import { Task, TaskFormData, ColumnId, Priority } from "@/types";
import { COLUMNS, TAG_CONFIG } from "@/features/board/constants";
import { cn } from "@/lib/cn";

interface TaskModalProps {
  task: Partial<Task> | null;
  onClose: () => void;
  onSave: (data: TaskFormData, id?: number) => void;
}

const TAG_ACTIVE: Record<Priority, string> = {
  low:  "bg-[#10B981] text-white border-[#10B981]",
  mid:  "bg-[#F59E0B] text-white border-[#F59E0B]",
  high: "bg-[#EF4444] text-white border-[#EF4444]",
};

const TAG_IDLE: Record<Priority, string> = {
  low:  "text-[#10B981] border-[#10B981]",
  mid:  "text-[#F59E0B] border-[#F59E0B]",
  high: "text-[#EF4444] border-[#EF4444]",
};

export default function TaskModal({ task, onClose, onSave }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title ?? "");
  const [desc, setDesc] = useState(task?.description ?? "");
  const [col, setCol] = useState<ColumnId>(task?.column ?? "backlog");
  const [tag, setTag] = useState<Priority>(task?.tag ?? "low");

  const isEditing = Boolean(task?.id);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({ title: title.trim(), description: desc.trim(), column: col, tag }, task?.id);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-surface-column border border-surface-border rounded-2xl p-7 w-[440px] max-w-[92vw] flex flex-col gap-1.5 shadow-[0_20px_60px_rgba(0,0,0,0.6)] animate-fadeUp"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-display font-extrabold text-xl text-text-primary mb-3">
          {isEditing ? "Edit Task" : "New Task"}
        </h2>

        {/* Title */}
        <label className="text-[11px] font-display uppercase tracking-widest text-text-faint mt-2">
          Title
        </label>
        <input
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title..."
          className="mt-1 w-full bg-surface-card border border-surface-border rounded-xl px-3.5 py-2.5 text-[13px] text-text-primary placeholder:text-text-ghost outline-none focus:border-brand-purple transition-colors font-body"
        />

        {/* Description */}
        <label className="text-[11px] font-display uppercase tracking-widest text-text-faint mt-2">
          Description
        </label>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="Task description..."
          rows={3}
          className="mt-1 w-full bg-surface-card border border-surface-border rounded-xl px-3.5 py-2.5 text-[13px] text-text-primary placeholder:text-text-ghost outline-none focus:border-brand-purple transition-colors font-body resize-none"
        />

        {/* Column */}
        <label className="text-[11px] font-display uppercase tracking-widest text-text-faint mt-2">
          Column
        </label>
        <select
          value={col}
          onChange={(e) => setCol(e.target.value as ColumnId)}
          className="mt-1 w-full bg-surface-card border border-surface-border rounded-xl px-3.5 py-2.5 text-[13px] text-text-primary outline-none focus:border-brand-purple transition-colors font-body appearance-none cursor-pointer"
        >
          {COLUMNS.map((c) => (
            <option key={c.id} value={c.id} className="bg-surface-card">
              {c.label}
            </option>
          ))}
        </select>

        {/* Priority */}
        <label className="text-[11px] font-display uppercase tracking-widest text-text-faint mt-2">
          Priority
        </label>
        <div className="flex gap-2 mt-1 mb-4">
          {(["low", "mid", "high"] as Priority[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className={cn(
                "flex-1 border rounded-lg py-1.5 text-[11px] font-display font-bold uppercase tracking-widest transition-all duration-150",
                tag === t ? TAG_ACTIVE[t] : `bg-transparent ${TAG_IDLE[t]}`
              )}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex gap-2.5">
          <button
            type="button"
            onClick={handleSave}
            disabled={!title.trim()}
            className="flex-1 bg-brand-purple text-white rounded-xl py-2.5 text-[13px] font-display font-bold tracking-wide hover:bg-[#5A52E0] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Save Task
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-surface-elevated text-text-muted rounded-xl py-2.5 px-5 text-[13px] font-body font-medium hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
