'use client'

import { COLUMNS } from '@/features/board/constants'
import KanbanColumn from '@/features/board/column'
import BoardHeader from '@/features/board/header'
import TaskModal from '@/features/tasks/TaskModal'
import { useBoard } from './hooks'

export default function KanbanBoard() {
  const {
    modal,
    setModal,
    isLoading,
    error,
    clearError,
    handleSave,
    handleDelete,
    handleDragStart,
    handleDrop,
    tasks,
    search,
    setSearch,
    getColumnTasks
  } = useBoard()

  return (
    <div className='min-h-screen bg-surface text-text-primary font-body'>
      {/* Loading bar */}
      {isLoading && (
        <div className='fixed top-0 left-0 w-full h-0.5 bg-surface-elevated z-50 overflow-hidden'>
          <div className='h-full w-1/3 bg-brand-purple animate-shimmer' />
        </div>
      )}

      {/* Error toast */}
      {error && (
        <div
          className='fixed top-4 right-4 z-50 flex items-center gap-3 bg-surface-column border border-brand-red/30 text-brand-red text-[13px] rounded-xl px-4 py-3 shadow-xl animate-slideIn cursor-pointer'
          onClick={clearError}
        >
          <span>⚠️</span>
          <span>{error}</span>
          <span className='text-text-faint ml-1'>×</span>
        </div>
      )}

      <BoardHeader taskCount={tasks.length} search={search} onSearch={setSearch} />

      {/* Board */}
      <main className='flex gap-4 px-6 py-6 overflow-x-auto min-h-[calc(100vh-73px)] items-start'>
        {COLUMNS.map(col => (
          <KanbanColumn
            key={col.id}
            col={col}
            tasks={getColumnTasks(col.id)}
            onEdit={task => setModal(task)}
            onDelete={handleDelete}
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onDragStart={handleDragStart}
            onAdd={colId => setModal({ column: colId, title: '', description: '', tag: 'low' })}
          />
        ))}
      </main>

      {/* Modal */}
      {modal !== null && (
        <TaskModal task={modal} onClose={() => setModal(null)} onSave={handleSave} />
      )}
    </div>
  )
}
