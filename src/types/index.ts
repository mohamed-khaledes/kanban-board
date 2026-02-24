export type ColumnId = 'backlog' | 'in_progress' | 'review' | 'done'
export type Priority = 'low' | 'mid' | 'high'

export interface Task {
  id: number
  title: string
  description: string
  column: ColumnId
  tag: Priority
}

export interface KanbanColumn {
  id: ColumnId
  label: string
  color: string
  accent: string
}

export interface TaskFormData {
  title: string
  description: string
  column: ColumnId
  tag: Priority
}
