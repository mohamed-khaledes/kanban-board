'use client';

interface BoardHeaderProps {
  taskCount: number;
  search: string;
  onSearch: (q: string) => void;
}

export default function BoardHeader({ taskCount, search, onSearch }: BoardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-7 py-4 border-b border-surface-line bg-surface">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <span className="text-2xl text-brand-purple leading-none">⬡</span>
        <div>
          <div className="font-display font-extrabold text-[13px] tracking-[0.12em] text-white uppercase">
            Kanban Board
          </div>
          <div className="text-[11px] text-text-faint tracking-wider">
            {taskCount} tasks
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-text-faint text-lg leading-none pointer-events-none select-none">
          ⌕
        </span>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="Search tasks..."
          className="bg-surface-elevated border border-surface-border rounded-xl pl-9 pr-9 py-2 text-[13px] text-text-primary placeholder:text-text-ghost outline-none focus:border-brand-purple transition-colors w-60 font-body"
        />
        {search && (
          <button
            type="button"
            onClick={() => onSearch("")}
            className="absolute right-3 text-text-faint hover:text-text-primary text-lg leading-none transition-colors"
          >
            ×
          </button>
        )}
      </div>
    </header>
  );
}
