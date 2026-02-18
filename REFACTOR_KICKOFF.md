# Architecture Refactor Kickoff Prompt

Use this prompt to instruct an AI agent to implement the architectural refactor defined in `ARCHITECTURE_AUDIT.md`.

---

## Kickoff Prompt

```
You are a Senior Frontend Architect tasked with refactoring this Next.js codebase into an enterprise-scale boilerplate.

## Context

Read the file at `ARCHITECTURE_AUDIT.md` which contains:
1. A comprehensive architectural audit of the current codebase
2. Identified anti-patterns with severity levels
3. A proposed enterprise folder structure
4. Boilerplate template specifications
5. A phased migration plan
6. Governance rules

## Your Mission

Implement the migration plan **phase by phase**, starting with Phase 1. Do NOT skip ahead. Each phase must be validated before proceeding.

## Critical Constraints

1. **ZERO BREAKING CHANGES**: The application must continue to work after every change
2. **Build Validation**: Run `npm run build` after each significant change
3. **Import Path Discipline**: Use absolute imports with `@/` prefix only
4. **Preserve Functionality**: Theme switching, navigation, and all UI must remain functional

## Technical Stack

- Next.js 16.1.1 with App Router
- React 19.2.3
- Tailwind CSS v4
- TypeScript
- Target state management: Zustand + TanStack Query (to be added)
- Target deployment: Vercel

## Phase 1 Instructions (Start Here)

Execute Phase 1 from the migration plan:

### Step 1.1: Create Directory Structure
Create the following empty directory structure under `src/`:
- `src/core/format/`
- `src/core/validation/`
- `src/core/storage/`
- `src/core/utils/`
- `src/core/errors/`
- `src/config/theme/`
- `src/config/constants/`
- `src/features/`
- `src/shared/components/`
- `src/shared/hooks/`
- `src/design-system/primitives/`
- `src/design-system/composites/`
- `src/design-system/tokens/`
- `src/infrastructure/api/`
- `src/infrastructure/query/`
- `src/infrastructure/store/`

### Step 1.2: Move Theme System
1. Move all files from `./themes/` (root level) to `src/config/theme/`
2. Update ALL imports that reference `../../../themes/` or `../../themes/` to use `@/config/theme/`
3. Key files to update:
   - `src/app/layout.tsx`
   - `src/app/theme-hydrator.tsx`
   - `src/lib/theme-server.ts`
   - `src/lib/theme-init-script.ts`
   - `src/components/ui/button.tsx`
   - `src/components/theme-customizer.tsx`
   - Any other files importing from `themes/`

### Step 1.3: Create Core Modules
1. Move `src/lib/format.ts` → `src/core/format/index.ts` (create barrel with named exports)
2. Move `src/lib/validation.ts` → `src/core/validation/index.ts`
3. Move `src/lib/storage.ts` → `src/core/storage/index.ts`
4. Move `src/lib/utils.ts` → `src/core/utils/cn.ts`, create barrel in `src/core/utils/index.ts`
5. Update all imports referencing `@/lib/format`, `@/lib/validation`, `@/lib/storage`, `@/lib/utils`

### Step 1.4: Consolidate Constants
1. Create `src/config/constants/cookies.ts` with `THEME_COOKIE` and `DARK_MODE_COOKIE` exports
2. Create `src/config/constants/layout.ts` (move existing content from `src/constants/layout.ts`)
3. Create `src/config/constants/index.ts` barrel
4. Update imports in:
   - `src/lib/theme-server.ts`
   - `src/middleware.ts`
   - `src/app/api/theme/route.ts`
5. Remove old `src/constants/` directory after migration

### Step 1.5: Update Lib Barrel
Update `src/lib/index.ts` to re-export from new core locations (for backwards compatibility):
```ts
// Backwards compatibility - delegates to core
export * from '@/core/format'
export * from '@/core/validation'
export * from '@/core/storage'
export * from '@/core/utils'
```

### Step 1.6: Validate
1. Run `npm run build` - must pass with no errors
2. Run `npm run dev` - visually verify:
   - Theme switching works
   - All pages render
   - No console errors

### Step 1.7: Clean Up
1. Remove `./themes/` directory at root (after confirming all imports updated)
2. Update `tsconfig.json` if needed to ensure paths resolve correctly

## Output Requirements

After completing Phase 1, report:
1. Files created
2. Files moved
3. Files deleted
4. Imports updated (count)
5. Build result (pass/fail)
6. Any issues encountered

## Do NOT Proceed To Phase 2 Until:
- [ ] Build passes
- [ ] Theme switching works
- [ ] All pages render
- [ ] No TypeScript errors
- [ ] No console errors

## Important Notes

- The `src/lib/theme-server.ts` and `src/lib/theme-init-script.ts` files reference theme config - update these imports carefully
- The `src/app/theme-hydrator.tsx` has duplicated `CSS_VARIABLE_NAMES` - note this but DO NOT fix in Phase 1 (that's a later optimization)
- Preserve all existing functionality exactly

Begin with Phase 1 now.
```

---

## Phase 2 Kickoff (Run After Phase 1 Complete)

```
Phase 1 is complete. Now implement Phase 2: State Infrastructure.

## Phase 2 Instructions

### Step 2.1: Install Dependencies
```bash
npm install zustand @tanstack/react-query
```

### Step 2.2: Create Zustand Stores

Create `src/infrastructure/store/theme-store.ts`:
```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
  colorScheme: string
  setColorScheme: (scheme: string) => void
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      colorScheme: 'neutral',
      setColorScheme: (scheme) => set({ colorScheme: scheme }),
    }),
    {
      name: 'theme-storage',
    }
  )
)
```

Create `src/infrastructure/store/sidebar-store.ts`:
```ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
  isOpen: boolean
  isCollapsed: boolean
  setOpen: (open: boolean) => void
  setCollapsed: (collapsed: boolean) => void
  toggle: () => void
}

export const useSidebarStore = create<SidebarState>()(
  persist(
    (set, get) => ({
      isOpen: true,
      isCollapsed: false,
      setOpen: (open) => set({ isOpen: open }),
      setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
      toggle: () => set({ isCollapsed: !get().isCollapsed }),
    }),
    {
      name: 'sidebar-storage',
    }
  )
)
```

Create `src/infrastructure/store/index.ts` barrel.

### Step 2.3: Create TanStack Query Setup

Create `src/infrastructure/query/query-client.ts`:
```ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
})
```

Create `src/infrastructure/query/query-keys.ts`:
```ts
export const queryKeys = {
  theme: ['theme'] as const,
  user: ['user'] as const,
  // Add more as features are extracted
}
```

Create `src/infrastructure/query/index.ts` barrel.

### Step 2.4: Create API Client

Create `src/infrastructure/api/client.ts`:
```ts
const BASE_URL = ''

interface RequestOptions extends RequestInit {
  params?: Record<string, string>
}

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = '') {
    this.baseUrl = baseUrl
  }

  private buildUrl(path: string, params?: Record<string, string>): string {
    const url = new URL(path, window.location.origin)
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.set(key, value)
      })
    }
    return url.toString()
  }

  async request<T>(path: string, options: RequestOptions = {}): Promise<T> {
    const { params, ...init } = options
    const response = await fetch(this.buildUrl(path, params), {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...init.headers,
      },
    })

    if (!response.ok) {
      throw new ApiError(response.status, response.statusText)
    }

    return response.json()
  }

  get<T>(path: string, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, { ...options, method: 'GET' })
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return this.request<T>(path, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    })
  }
}

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

export const apiClient = new ApiClient(BASE_URL)
```

Create `src/infrastructure/api/index.ts` barrel.
Create `src/infrastructure/index.ts` barrel.

### Step 2.5: Create Provider Composition

Create `src/providers/query-provider.tsx`:
```tsx
'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/infrastructure/query'
import type { ReactNode } from 'react'

export function QueryProvider({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
```

Create `src/providers/app-providers.tsx`:
```tsx
'use client'

import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { ThemeHydrator } from '@/app/theme-hydrator'

interface AppProvidersProps {
  children: ReactNode
  initialColorScheme: string
}

export function AppProviders({ children, initialColorScheme }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeHydrator initialColorScheme={initialColorScheme}>
        {children}
      </ThemeHydrator>
    </QueryProvider>
  )
}
```

Update `src/providers/index.ts` to export all providers.

### Step 2.6: Update Root Layout

Update `src/app/layout.tsx` to use `AppProviders` instead of `ThemeHydrator` directly.

### Step 2.7: Validate
1. Run `npm run build`
2. Run `npm run dev`
3. Verify theme switching still works
4. Check React DevTools for QueryProvider presence

## Output Requirements

Report:
1. Packages installed
2. Files created
3. Build result
4. Any issues

Proceed only when validation passes.
```

---

## Phase 3 Kickoff (Run After Phase 2 Complete)

```
Phase 2 is complete. Now implement Phase 3: Feature Extraction.

## Phase 3 Instructions

Start with the largest/most complex feature: `data-table`.

### Step 3.1: Create Feature Structure

Create:
- `src/features/data-table/`
- `src/features/data-table/components/`
- `src/features/data-table/hooks/`
- `src/features/data-table/api/`

### Step 3.2: Extract Types and Schemas

From `src/components/data-table.tsx`:
1. Extract the `schema` Zod definition to `src/features/data-table/schemas.ts`
2. Create `src/features/data-table/types.ts` with:
   - `DataTableProps`
   - `TableRow` (inferred from schema)
   - `ColumnDef` types if custom

### Step 3.3: Extract Components

Split `src/components/data-table.tsx` into:
- `src/features/data-table/components/data-table.tsx` (main table)
- `src/features/data-table/components/drag-handle.tsx`
- `src/features/data-table/components/draggable-row.tsx`
- `src/features/data-table/components/cell-viewer-drawer.tsx` (TableCellViewer)
- `src/features/data-table/components/table-pagination.tsx` (pagination controls)
- `src/features/data-table/components/column-visibility-dropdown.tsx`

### Step 3.4: Extract Columns Definition

Create `src/features/data-table/columns.tsx` with the `columns` array definition.

### Step 3.5: Extract Hooks

Create:
- `src/features/data-table/hooks/use-table-state.ts` - manages table state (sorting, filtering, pagination)
- `src/features/data-table/hooks/use-drag-sort.ts` - manages drag and drop logic

### Step 3.6: Create Feature Barrel

Create `src/features/data-table/index.ts`:
```ts
export { DataTable } from './components/data-table'
export type { DataTableProps, TableRow } from './types'
```

### Step 3.7: Update Importers

Find and update all files that import from `@/components/data-table` to use `@/features/data-table`.

### Step 3.8: Delete Original

After confirming everything works:
1. Delete `src/components/data-table.tsx`
2. Remove from `src/components/index.ts` if present

### Step 3.9: Repeat for Other Features

Follow the same pattern for:
- `console-drawer` → `src/features/console-drawer/`
- `theme-customizer` → `src/features/theme-customizer/`
- Dashboard components → `src/features/dashboard/`

### Step 3.10: Validate

1. `npm run build`
2. Visual verification of all affected features
3. No TypeScript errors
4. No runtime errors

## Output Requirements

Report for each feature extracted:
1. Files created
2. Components extracted
3. Hooks extracted
4. Import paths updated
5. Build result
6. Visual verification status
```

---

## Quick Reference: File Mapping

| Current Location | New Location |
|-----------------|--------------|
| `./themes/*` | `src/config/theme/*` |
| `src/lib/format.ts` | `src/core/format/index.ts` |
| `src/lib/validation.ts` | `src/core/validation/index.ts` |
| `src/lib/storage.ts` | `src/core/storage/index.ts` |
| `src/lib/utils.ts` | `src/core/utils/cn.ts` |
| `src/lib/theme-server.ts` | `src/config/theme/server.ts` |
| `src/lib/theme-init-script.ts` | `src/config/theme/init-script.ts` |
| `src/constants/*` | `src/config/constants/*` |
| `src/components/data-table.tsx` | `src/features/data-table/` |
| `src/components/console-drawer/` | `src/features/console-drawer/` |
| `src/components/theme-customizer.tsx` | `src/features/theme-customizer/` |
| `src/components/ui/*` | `src/design-system/primitives/*` |
| `src/components/loading/*` | `src/shared/components/feedback/` |
| `src/components/layout/*` | `src/shared/components/layout/` |
| `src/hooks/*` | `src/shared/hooks/` |

---

## Validation Commands

After each phase:

```bash
# Type check
npm run build

# Visual check
npm run dev

# Lint (if configured)
npm run lint
```

---

## Rollback Strategy

If any phase fails catastrophically:

1. Use git to revert: `git checkout -- .`
2. Review the error carefully
3. Fix the issue in isolation
4. Retry the specific step
5. Do not proceed until the step passes
