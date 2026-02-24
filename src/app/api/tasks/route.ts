import { tasks, newId, Task } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const column = searchParams.get('column')

  const result = column ? tasks.filter(t => t.column === column) : tasks
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body: Omit<Task, 'id'> = await request.json()
  const task: Task = { id: newId(), ...body }
  tasks.push(task)
  return NextResponse.json(task, { status: 201 })
}