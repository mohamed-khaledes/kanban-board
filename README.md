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
| Mock REST API        | json-server                            |
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

## Getting Started

### 1. Install

```bash
npm install
```

### 2. Run (Next.js + json-server together)

```bash
npm run dev
```

- **App**: http://localhost:3000
- **API**: http://localhost:3001

### 3. Change API port

In `package.json` change `--port 3001` to any port, then update `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:YOUR_PORT
```

---

## API Endpoints (json-server)

| Method | Endpoint     | Action         |
| ------ | ------------ | -------------- |
| GET    | `/tasks`     | List all tasks |
| GET    | `/tasks/:id` | Get one task   |
| POST   | `/tasks`     | Create task    |
| PATCH  | `/tasks/:id` | Update task    |
| DELETE | `/tasks/:id` | Delete task    |

---

## Architecture

**Zustand + React Query pattern:**

- React Query handles fetching, caching (1 min stale time), and background sync
- On success → seeds the Zustand store via `setTasks()`
- All CRUD mutations do **optimistic updates** in Zustand first
- React Query invalidates cache after each mutation for consistency

**Feature-based structure:**

- `features/board` owns the layout, columns, header, and board-level state
- `features/tasks` owns the card and modal (task-specific UI)
- `store/` and `lib/` are shared across features
