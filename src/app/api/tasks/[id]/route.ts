import { tasks, Task } from '@/lib/db'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const task = tasks.find(t => t.id === Number(params.id))
  if (!task) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(task)
}

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const i = tasks.findIndex(t => t.id === Number(params.id))
  if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  const body: Partial<Omit<Task, 'id'>> = await request.json()
  tasks[i] = { ...tasks[i], ...body }
  return NextResponse.json(tasks[i])
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const i = tasks.findIndex(t => t.id === Number(params.id))
  if (i === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

  tasks.splice(i, 1)
  return NextResponse.json({})
}