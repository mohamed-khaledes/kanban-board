# Kanban Board

A Kanban-board task management app built with **Next.js 14 App Router**, **TypeScript**, **Tailwind
CSS**, **Zustand**, **TanStack React Query**, and **json-server**.

---

## Tech Stack

| Layer                | Technology                             |
| -------------------- | -------------------------------------- |
| Framework            | Next.js 14 (App Router)                |
| Language             | TypeScript                             |
| Styling              | Tailwind CSS v3 + custom design tokens |
| State Management     | Zustand v4 (with devtools middleware)  |
| Server State / Cache | TanStack React Query v5                |
<!-- | Mock REST API        | json-server                            | -->
| In-memory data store | (no external DB)                         |
| HTTP Client          | Axios                                  |

---

## Project Structure (Feature-based)

```
src/
├── app/
│   ├── globals.css           # Tailwind base + Google Fonts
│   ├── layout.tsx            # Root layout (QueryProvider)
│   └── page.tsx              # Home → KanbanBoard
│   ├── api/
│   │   └── tasks               # tasks api
│             └── route.ts              
│             └── [id]             
│                   └── route.ts           
│
├── features/
│   ├── board/
│   │   └── column.ts          # COLUMNS, TAG_CONFIG, PAGE_SIZE
│   │   └── header.ts          # HEADER
│   │   └── hooks.ts            # HOOKS
│   │   └── constants.ts         # CONSTANTS
│   │
│   └── tasks/
│       └──  TaskCard.tsx      # Draggable task card
│       └── TaskModal.tsx     # Create / edit modal
│
├── components/
│   └── ui/
├── providers/
│       └── QueryProvider.tsx    # React Query client + devtools
│
├── store/
│   └── useKanbanStore.ts        # Zustand store
│
├── lib/
│   ├── api.ts                   # Axios tasksApi service
│   └── cn.ts                    # clsx utility
│
└── types/
    └── index.ts                 # Task, ColumnId, Priority, etc.

db.json                          # json-server mock database
```

---

## 🗂️ Data Model

```ts
interface Task {
  id: number
  title: string
  description: string
  column: 'backlog' | 'in_progress' | 'review' | 'done'
  tag: 'high' | 'mid' | 'low'
}
```

---

## 📡 API Endpoints

### Tasks

| Method | Endpoint          | Description              |
|--------|-------------------|--------------------------|
| GET    | `/api/tasks`      | Get all tasks            |
| GET    | `/api/tasks`      | Filter by column |
| GET    | `/api/tasks/:id`  | Get a single task        |
| POST   | `/api/tasks`      | Create a new task        |
| PATCH  | `/api/tasks/:id`  | Update a task            |
| DELETE | `/api/tasks/:id`  | Delete a task            |

### Example Requests

**Get all tasks**
```http
GET /api/tasks
```

**Filter by column**
```http
GET /api/tasks?column=in_progress
```

**Create a task**
```http
POST /api/tasks
Content-Type: application/json

{
  "title": "New Task",
  "description": "Task description",
  "column": "backlog",
  "tag": "high"
}
```

**Move task to another column**
```http
PATCH /api/tasks/1
Content-Type: application/json

{
  "column": "in_progress"
}
```

**Delete a task**
```http
DELETE /api/tasks/1
```

---

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deploying to Vercel

1. Push your project to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repo
3. Click **Deploy** — no environment variables needed

> ⚠️ **Note:** Since the data is stored in-memory, it resets on every server restart or redeploy. This is intentional for a demo/portfolio project. If you need persistence, consider migrating to [Supabase](https://supabase.com) or [PlanetScale](https://planetscale.com).

---

## 📌 Columns

| Column       | Description              |
|--------------|--------------------------|
| `backlog`    | Tasks not started yet    |
| `in_progress`| Tasks currently in work  |
| `review`     | Tasks pending review     |
| `done`       | Completed tasks          |