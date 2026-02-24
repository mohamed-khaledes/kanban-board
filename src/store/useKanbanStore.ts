import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { Task, TaskFormData, ColumnId } from '@/types'
import { tasksApi } from '@/lib/api'

interface KanbanState {
  // State
  tasks: Task[]
  search: string
  isLoading: boolean
  error: string | null

  // Setters
  setTasks: (tasks: Task[]) => void
  setSearch: (q: string) => void
  clearError: () => void

  // Async actions
  fetchTasks: () => Promise<void>
  addTask: (data: TaskFormData) => Promise<Task>
  updateTask: (id: number, data: Partial<Task>) => Promise<void>
  removeTask: (id: number) => Promise<void>
  moveTask: (id: number, column: ColumnId) => Promise<void>

  // Derived selector
  getColumnTasks: (columnId: ColumnId) => Task[]
}

export const useKanbanStore = create<KanbanState>()(
  devtools(
    (set, get) => ({
      tasks: [],
      search: '',
      isLoading: false,
      error: null,

      setTasks: tasks => set({ tasks }, false, 'setTasks'),

      setSearch: search => set({ search }, false, 'setSearch'),

      clearError: () => set({ error: null }, false, 'clearError'),

      fetchTasks: async () => {
        set({ isLoading: true, error: null }, false, 'fetchTasks/pending')
        try {
          const tasks = await tasksApi.getAll()
          set({ tasks, isLoading: false }, false, 'fetchTasks/fulfilled')
        } catch {
          set({ error: 'Failed to fetch tasks', isLoading: false }, false, 'fetchTasks/rejected')
        }
      },

      addTask: async data => {
        try {
          const newTask = await tasksApi.create(data)
          set(s => ({ tasks: [...s.tasks, newTask] }), false, 'addTask')
          return newTask
        } catch {
          set({ error: 'Failed to create task' }, false, 'addTask/error')
          throw new Error('Failed to create task')
        }
      },

      updateTask: async (id, data) => {
        // Optimistic
        set(
          s => ({ tasks: s.tasks.map(t => (t.id === id ? { ...t, ...data } : t)) }),
          false,
          'updateTask/optimistic'
        )
        try {
          await tasksApi.update(id, data)
        } catch {
          // Revert
          await get().fetchTasks()
          set({ error: 'Failed to update task' }, false, 'updateTask/error')
        }
      },

      removeTask: async id => {
        // Optimistic
        set(s => ({ tasks: s.tasks.filter(t => t.id !== id) }), false, 'removeTask/optimistic')
        try {
          await tasksApi.remove(id)
        } catch {
          await get().fetchTasks()
          set({ error: 'Failed to delete task' }, false, 'removeTask/error')
        }
      },

      moveTask: async (id, column) => {
        const current = get().tasks.find(t => t.id === id)
        if (!current || current.column === column) return
        // Optimistic
        set(
          s => ({ tasks: s.tasks.map(t => (t.id === id ? { ...t, column } : t)) }),
          false,
          'moveTask/optimistic'
        )
        try {
          await tasksApi.update(id, { column })
        } catch {
          await get().fetchTasks()
          set({ error: 'Failed to move task' }, false, 'moveTask/error')
        }
      },

      getColumnTasks: columnId => {
        const { tasks, search } = get()
        const q = search.toLowerCase()
        return tasks.filter(
          t =>
            t.column === columnId &&
            (!q || t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q))
        )
      }
    }),
    { name: 'kanban-store' }
  )
)
