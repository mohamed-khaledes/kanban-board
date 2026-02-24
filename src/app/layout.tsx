import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/QueryProvider'
import './globals.css'

export const metadata: Metadata = {
  title: 'Kanban Board',
  description: 'Kanban-board task management — Next.js + TypeScript + Zustand + React Query'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  )
}
