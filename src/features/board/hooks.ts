import { useRef, useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useKanbanStore } from '@/store/useKanbanStore'
import { Task, TaskFormData, ColumnId } from '@/types'
import { tasksApi } from '@/lib/api'

export const useBoard = () => {
  const queryClient = useQueryClient()
  const dragTask = useRef<Task | null>(null)
  const [modal, setModal] = useState<Partial<Task> | null>(null)

  const {
    tasks,
    setTasks,
    search,
    setSearch,
    updateTask,
    removeTask,
    moveTask,
    getColumnTasks,
    error,
    clearError
  } = useKanbanStore()

  /* ── React Query: fetch & seed Zustand ── */
  const { isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: async () => {
      const data = await tasksApi.getAll()
      setTasks(data)
      return data
    },
    staleTime: 1000 * 60
  })

  /* ── Mutations ── */
  const createMutation = useMutation({
    mutationFn: tasksApi.create,
    onSuccess: newTask => {
      setTasks([...tasks, newTask])
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    }
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Task> }) => tasksApi.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  })

  const deleteMutation = useMutation({
    mutationFn: tasksApi.remove,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] })
  })

  /* ── Handlers ── */
  const handleSave = (data: TaskFormData, id?: number) => {
    if (id) {
      updateTask(id, data)
      updateMutation.mutate({ id, data })
    } else {
      createMutation.mutate(data)
    }
  }

  const handleDelete = (id: number) => {
    removeTask(id)
    deleteMutation.mutate(id)
  }

  const handleDragStart = (e: React.DragEvent, task: Task) => {
    dragTask.current = task
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrop = (e: React.DragEvent, colId: ColumnId) => {
    e.preventDefault()
    if (dragTask.current && dragTask.current.column !== colId) {
      moveTask(dragTask.current.id, colId)
      updateMutation.mutate({ id: dragTask.current.id, data: { column: colId } })
    }
    dragTask.current = null
  }

  return {
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
  }
}
