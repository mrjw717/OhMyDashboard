# Shared Components Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User wants to create a reusable UI component
- User wants to add/modify a UI primitive (button, badge, dialog)
- User asks about the design-system layer
- A feature component needs to be promoted to shared

Do NOT use when:
- Creating a self-contained feature module → use [feature-creation.md](./feature-creation.md)
- Creating an input → use [input-components.md](./input-components.md)
- Changing colors/theme → use [theming.md](./theming.md)

## Component Location Decision Tree

```
Is this a PRIMITIVE (button, input, badge, dialog)?
├── YES → src/components/ui/[name].tsx
│         + re-export in src/design-system/primitives/index.ts
└── NO → Is this a COMPOSITE (sidebar, form, drawer)?
    ├── YES → src/components/ui/[name].tsx (source)
    │         + re-export in src/design-system/composites/index.ts
    └── NO → Is this used in MORE THAN ONE feature?
        ├── YES → src/components/[name].tsx
        └── NO → src/features/[feature]/components/[name].tsx
```

## Architecture: Two Layers

### 1. Source: `src/components/ui/`
The canonical source for all UI components. ShadCN components live here. This is where you create and edit files.

### 2. Re-export: `src/design-system/`
The design-system barrels re-export from `@/components/ui/*`. New consumers SHOULD import from `@/design-system/`, but old consumers importing from `@/components/ui/` still work.

```
src/design-system/
├── primitives/index.ts    # Re-exports from @/components/ui/*
├── composites/
│   ├── sidebar/index.ts   # Re-exports sidebar, right-sidebar
│   ├── smart-input/index.ts   # Re-exports smart-input, SSN input
│   └── index.ts           # Re-exports drawer, form, dropdown-menu, glass-tabs
├── tokens/index.ts        # Re-exports from @/config/theme
└── index.ts               # Top-level barrel
```

## Creating a New Primitive

1. Create in `src/components/ui/[name].tsx`
2. Use `cn()` from `@/core/utils` for class merging
3. Use theme tokens — no hardcoded colors
4. Add re-export to `src/design-system/primitives/index.ts`

```tsx
// src/components/ui/status-indicator.tsx
'use client'

import * as React from 'react'
import { cn } from '@/core/utils'

export interface StatusIndicatorProps {
  status: 'active' | 'inactive' | 'pending'
  className?: string
}

export function StatusIndicator({ status, className }: StatusIndicatorProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 text-xs font-medium',
      status === 'active' && 'text-[hsl(var(--color-success))]',
      status === 'inactive' && 'text-[hsl(var(--color-error))]',
      status === 'pending' && 'text-[hsl(var(--color-warning))]',
      className
    )}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  )
}
```

## Promoting Feature → Shared

When a feature-private component becomes useful elsewhere:

1. Move file from `src/features/[feature]/components/` to `src/components/[name].tsx`
2. Remove feature prefix from name if now generic
3. Add to `src/components/index.ts` barrel
4. Leave a shim re-export in the original location
5. Update imports across the codebase

## Current Shared Components

| Component | Source | Feature Module |
|---|---|---|
| `DataTable` | `components/data-table.tsx` (shim) | `features/data-table/` |
| `SectionCards` | `components/section-cards.tsx` (shim) | `features/dashboard/` |
| `DashboardSkeleton` | `components/dashboard-skeleton.tsx` (shim) | `features/dashboard/` |
| `ThemeCustomizer` | `components/theme-customizer.tsx` (shim) | `features/theme-customizer/` |
| `ConsoleDrawer` | `components/console-drawer/` (shim) | `features/console-drawer/` |

## Best Practices

1. **Single Responsibility**: One component, one job
2. **Composition over Props**: Use `children` and slots, not massive prop APIs
3. **Theme Tokens Only**: Never hardcode colors (see [theming.md](./theming.md))
4. **TypeScript**: All props typed and exported
5. **Barrel Exports**: Add to the appropriate `index.ts`
6. **Tests**: Add test file next to component (see [testing.md](./testing.md))

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Decision tree
- [file-placement.md](./file-placement.md) — Where to put files
- [input-components.md](./input-components.md) — Input-specific patterns
- [theming.md](./theming.md) — Styling tokens
