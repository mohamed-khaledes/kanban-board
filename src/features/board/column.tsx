'use client'

import { useState } from 'react'
import { Task, KanbanColumn as ColumnType, ColumnId } from '@/types'
import { PAGE_SIZE } from '@/features/board/constants'
import TaskCard from '@/features/tasks/TaskCard'

interface KanbanColumnProps {
  col: ColumnType
  tasks: Task[]
  onEdit: (task: Task) => void
  onDelete: (id: number) => void
  onDrop: (e: React.DragEvent, colId: ColumnId) => void
  onDragOver: (e: React.DragEvent) => void
  onDragStart: (e: React.DragEvent, task: Task) => void
  onAdd: (colId: ColumnId) => void
}

export default function KanbanColumn({
  col,
  tasks,
  onEdit,
  onDelete,
  onDrop,
  onDragOver,
  onDragStart,
  onAdd
}: KanbanColumnProps) {
  const [page, setPage] = useState(1)
  const [isDragOver, setIsDragOver] = useState(false)

  const total = tasks.length
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const visible = tasks.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
    onDragOver(e)
  }

  const handleDrop = (e: React.DragEvent) => {
    setIsDragOver(false)
    onDrop(e, col.id)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={() => setIsDragOver(false)}
      onDrop={handleDrop}
      style={{
        borderColor: isDragOver ? col.color + '66' : '#1E1F2E',
        background: isDragOver ? '#16172480' : '#13141F'
      }}
      className='rounded-2xl p-4 min-w-[260px] w-[272px] flex-shrink-0 border flex flex-col gap-2.5 transition-all duration-200'
    >
      {/* Header */}
      <div className='flex items-center justify-between mb-1'>
        <div className='flex items-center gap-2'>
          <span className='w-2 h-2 rounded-full flex-shrink-0' style={{ background: col.color }} />
          <span className='font-display font-bold text-[13px] tracking-wider text-text-primary'>
            {col.label}
          </span>
          <span
            className='text-[11px] font-display font-bold rounded-md px-2 py-0.5'
            style={{ background: col.color + '22', color: col.color }}
          >
            {total}
          </span>
        </div>
      </div>

      {/* Card list */}
      <div className='flex flex-col gap-2.5 min-h-[60px]'>
        {visible.length === 0 ? (
          <div className='text-[11px] text-text-ghost text-center py-5 border border-dashed border-surface-elevated rounded-xl tracking-wide'>
            {isDragOver ? 'Drop here' : 'No tasks'}
          </div>
        ) : (
          visible.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
              onDragStart={onDragStart}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className='flex items-center justify-center gap-2'>
          <button
            type='button'
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
            className='w-7 h-7 bg-surface-elevated border-none text-text-muted rounded-md text-lg leading-none flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:text-text-primary transition-colors'
          >
            ‹
          </button>
          <span className='text-[11px] font-display text-text-faint'>
            {page} / {totalPages}
          </span>
          <button
            type='button'
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
            className='w-7 h-7 bg-surface-elevated border-none text-text-muted rounded-md text-lg leading-none flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:text-text-primary transition-colors'
          >
            ›
          </button>
        </div>
      )}

      {/* Add task */}
      <button
        type='button'
        onClick={() => onAdd(col.id)}
        style={{ color: col.color }}
        className='w-full border border-dashed border-surface-border rounded-xl py-2 text-[12px] font-body font-semibold tracking-wide hover:bg-surface-elevated transition-colors'
      >
        + Add task
      </button>
    </div>
  )
}
