export type Tag = 'high' | 'mid' | 'low'
export type Column = 'backlog' | 'in_progress' | 'review' | 'done'

export interface Task {
  id: number
  title: string
  description: string
  column: Column
  tag: Tag
}

export let tasks: Task[] = [
  { id: 1, title: "API Integration", description: "Connect frontend to REST API endpoints", column: "backlog", tag: "high" },
  { id: 2, title: "Unit Tests", description: "Write tests for utility functions and hooks", column: "backlog", tag: "low" },
  { id: 3, title: "Performance Audit", description: "Lighthouse scores and bundle analysis", column: "backlog", tag: "low" },
  { id: 4, title: "Notification System", description: "Toast notifications and in-app alerts", column: "in_progress", tag: "mid" },
  { id: 5, title: "User Settings Page", description: "Profile editing, preferences, and account management", column: "backlog", tag: "low" },
  { id: 6, title: "Authentication Flow", description: "Implement login, signup, and password reset screens", column: "in_progress", tag: "high" },
  { id: 7, title: "File Upload Component", description: "Drag and drop file upload with preview", column: "in_progress", tag: "mid" },
  { id: 8, title: "Dark Mode Support", description: "Add theme toggle and CSS variable switching", column: "review", tag: "mid" },
  { id: 9, title: "Dashboard Layout", description: "Build responsive sidebar and main content area", column: "done", tag: "mid" },
  { id: 10, title: "Design System Tokens", description: "Set up color palette, typography, and spacing scales", column: "done", tag: "high" },
]

export const newId = (): number =>
  tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1