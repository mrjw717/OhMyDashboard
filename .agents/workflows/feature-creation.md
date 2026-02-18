# Feature Creation Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User asks to "add a new feature/page/module"
- User wants to create a self-contained domain area (e.g., Students, Analytics, Settings)
- A component grows large enough to become its own feature module

Do NOT use this for:
- Adding a small shared component → use [shared-components.md](./shared-components.md)
- Creating a UI primitive → use [shared-components.md](./shared-components.md)
- Changing theme/colors → use [theming.md](./theming.md)

## Step-by-Step Process

### Step 1: Check Existing Structure

Before creating anything, verify:
1. Does this feature already exist in `src/features/`?
2. Are there reusable components in `src/components/` or `src/design-system/`?
3. Are there shared types in `src/types/`?
4. Are there relevant Zod schemas in `src/core/validation/`?

### Step 2: Create Feature Module

All features live in `src/features/[feature-name]/`:

```
src/features/[feature-name]/
├── index.ts                   # Barrel export (public API)
├── [feature-name].tsx         # Main component
├── components/                # Feature-private sub-components
│   ├── [feature]-table.tsx
│   ├── [feature]-filter.tsx
│   └── index.ts
├── hooks/                     # Feature-private hooks (optional)
│   └── use-[feature].ts
├── types.ts                   # Feature-private types (optional)
└── utils.ts                   # Feature-private utils (optional)
```

### Step 3: Create the Main Component

```tsx
// src/features/students/students.tsx
'use client'

import * as React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/core/utils'

export function Students() {
  return (
    <div className="space-y-6">
      {/* Feature content */}
    </div>
  )
}
```

### Step 4: Create the Barrel Export

```ts
// src/features/students/index.ts
export { Students } from './students'
```

Only export what external consumers need. Internal components stay private.

### Step 5: Wire to App Router (if it needs a page)

```tsx
// src/app/(dashboard)/students/page.tsx
import { Students } from '@/features/students'

export default function StudentsPage() {
  return <Students />
}
```

### Step 6: Add Navigation

Update `src/config/navigation/nav-primary.ts`:
```tsx
import { IconUsers } from '@tabler/icons-react'

export const navPrimaryItems: NavItem[] = [
  // ... existing items
  {
    title: 'Students',
    url: '/students',
    icon: IconUsers,
  },
]
```

### Step 7: Add Types (if needed)

- **Feature-private types**: Keep in `src/features/[feature]/types.ts`
- **Shared types**: Add to `src/types/[name].ts`

### Step 8: Add Tests

```ts
// src/features/students/students.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Students } from './students'

describe('Students', () => {
  it('renders', () => {
    render(<Students />)
    expect(screen.getByText('Students')).toBeInTheDocument()
  })
})
```

## Import Rules for Features

Features can import from:
- `@/core/*` — utilities, formatting, validation
- `@/config/*` — constants, theme tokens
- `@/components/ui/*` — UI primitives
- `@/design-system/*` — design system barrels
- `@/infrastructure/*` — stores, query, API client

Features CANNOT import from:
- Other `@/features/*` modules — features are isolated silos
- `@/app/*` — app layer depends on features, not the reverse

## Backwards Compatibility

When extracting an existing component into a feature:
1. Move the file to `src/features/[name]/`
2. Create the barrel export
3. Replace the original file with a shim re-export:

```ts
// src/components/[old-name].tsx
// Backwards-compat shim — canonical source: @/features/[name]
export { ComponentName } from '@/features/[name]'
```

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Decision tree
- [file-placement.md](./file-placement.md) — Where to put files
- [testing.md](./testing.md) — How to add tests
- [state-management.md](./state-management.md) — If feature needs state
