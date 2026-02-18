# State Management Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User asks to add client-side state (UI preferences, sidebar state, etc.)
- User needs server data fetching / caching
- User wants to add an API client or endpoint integration

## Architecture Overview

| Concern | Tool | Location |
|---|---|---|
| UI state (client-only) | Zustand | `src/infrastructure/store/` |
| Server state (API data) | TanStack Query | `src/infrastructure/query/` |
| API calls | Typed fetch client | `src/infrastructure/api/` |
| Providers | React wrappers | `src/providers/` |

## Zustand Stores

### Existing Stores

| Store | File | Purpose |
|---|---|---|
| `useThemeStore` | `infrastructure/store/theme-store.ts` | Color scheme persistence |
| `useSidebarStore` | `infrastructure/store/sidebar-store.ts` | Sidebar open/collapsed state |

### Creating a New Store

```ts
// src/infrastructure/store/[name]-store.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface NameState {
  value: string
  setValue: (v: string) => void
}

export const useNameStore = create<NameState>()(
  persist(
    (set) => ({
      value: 'default',
      setValue: (v) => set({ value: v }),
    }),
    { name: 'name-storage' }   // localStorage key
  )
)
```

Add to barrel:
```ts
// src/infrastructure/store/index.ts
export { useNameStore } from './name-store'
```

### When to Use Zustand

- UI preferences (theme, sidebar, layout mode)
- Client-only ephemeral state that persists across navigation
- State that does NOT come from an API

## TanStack Query

### Query Client

The `QueryClient` is created via a SSR-safe singleton factory in `src/infrastructure/query/query-client.ts`. It's provided by `QueryProvider` → `AppProviders` in the root layout.

### Query Key Factories

```ts
// src/infrastructure/query/query-keys.ts
export const queryKeys = {
  students: {
    all: ['students'] as const,
    list: (filters: StudentFilters) => ['students', 'list', filters] as const,
    detail: (id: string) => ['students', 'detail', id] as const,
  },
}
```

### Creating a Query Hook

```ts
// src/features/students/hooks/use-students.ts
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/infrastructure/api'
import { queryKeys } from '@/infrastructure/query'

export function useStudents(filters: StudentFilters) {
  return useQuery({
    queryKey: queryKeys.students.list(filters),
    queryFn: () => apiClient.get<Student[]>('/api/students', { params: filters }),
  })
}
```

### When to Use TanStack Query

- Data that comes from a server/API
- Data that needs caching, background refetching, stale management
- Async operations (mutations)

## API Client

The typed fetch wrapper lives in `src/infrastructure/api/client.ts`:

```ts
import { apiClient } from '@/infrastructure/api'

// GET
const students = await apiClient.get<Student[]>('/api/students')

// POST
const student = await apiClient.post<Student>('/api/students', { body: data })

// Error handling — throws ApiError with status, message
try {
  await apiClient.delete(`/api/students/${id}`)
} catch (e) {
  if (e instanceof ApiError && e.status === 404) { /* handle */ }
}
```

## Provider Composition

Root layout uses `AppProviders` which composes:
1. `QueryProvider` — TanStack Query context
2. `ThemeHydrator` — Theme CSS variable injection

```tsx
// src/app/layout.tsx
import { AppProviders } from '@/providers'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
```

## Decision Tree

```
What kind of state?
│
├─ Theme, sidebar, UI preference → Zustand store
├─ API data (list, detail, search) → TanStack Query
├─ Form state → React Hook Form (local)
└─ Component-local toggle → useState (no store needed)
```

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Layer boundaries
- [feature-creation.md](./feature-creation.md) — Adding state to features
- [testing.md](./testing.md) — Testing stores and queries
