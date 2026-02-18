# File Placement Guide

## AI Reasoning

When deciding where to place a file, work through this flowchart:

```
START: What kind of file is it?
│
├─ Page / Route?
│   └─ src/app/(dashboard)/[route]/page.tsx
│
├─ Pure utility (no React, no framework)?
│   ├─ Formatting? → src/core/format/
│   ├─ Validation? → src/core/validation/
│   ├─ Storage? → src/core/storage/
│   └─ General? → src/core/utils/
│
├─ UI Component?
│   ├─ Primitive (button, badge, input)?
│   │   └─ src/components/ui/[name].tsx
│   ├─ Feature-specific (one module only)?
│   │   └─ src/features/[feature]/components/[name].tsx
│   ├─ Shared across features?
│   │   └─ src/components/[name].tsx
│   └─ Design-system composite (sidebar, form)?
│       └─ src/design-system/composites/[group]/[name].tsx
│
├─ Self-contained feature module?
│   └─ src/features/[feature-name]/
│       ├─ index.ts (barrel)
│       └─ [feature-name].tsx
│
├─ State management?
│   ├─ Zustand store? → src/infrastructure/store/[name]-store.ts
│   ├─ Query hook? → src/infrastructure/query/
│   └─ API client? → src/infrastructure/api/
│
├─ Theme / styling config?
│   └─ src/config/theme/[name].ts
│
├─ App-level constant?
│   └─ src/config/constants/[name].ts
│
├─ TypeScript type?
│   ├─ Shared across modules? → src/types/[name].ts
│   └─ Feature-private? → src/features/[feature]/_types/
│
├─ React provider?
│   └─ src/providers/[name].tsx
│
├─ Test file?
│   └─ Co-locate next to source: src/[module]/[name].test.ts
│
└─ Hook?
    ├─ Feature-private? → src/features/[feature]/_hooks/
    └─ Shared? → src/hooks/use-[name].ts
```

## Quick Reference

| File Type | Location | Example |
|---|---|---|
| Page | `src/app/(dashboard)/[route]/page.tsx` | `students/page.tsx` |
| Loading state | `src/app/(dashboard)/[route]/loading.tsx` | `students/loading.tsx` |
| UI primitive | `src/components/ui/[name].tsx` | `button.tsx` |
| Feature module | `src/features/[name]/` | `features/data-table/` |
| Pure utility | `src/core/[category]/[name].ts` | `core/format/index.ts` |
| Validation schema | `src/core/validation/` | `validation/index.ts` |
| Zustand store | `src/infrastructure/store/[name]-store.ts` | `theme-store.ts` |
| Query key factory | `src/infrastructure/query/query-keys.ts` | — |
| API client | `src/infrastructure/api/client.ts` | — |
| Theme config | `src/config/theme/[name].ts` | `themes.ts` |
| App constant | `src/config/constants/[name].ts` | `app.ts` |
| Provider | `src/providers/[name].tsx` | `app-providers.tsx` |
| Shared type | `src/types/[name].ts` | `navigation.ts` |
| Test | `src/[module]/[name].test.ts` | `core/format/format.test.ts` |
| Shared hook | `src/hooks/use-[name].ts` | `use-mobile.ts` |

## Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Files | kebab-case | `smart-input-field.tsx` |
| Components | PascalCase | `SmartInputField` |
| Hooks | `use-kebab-case` | `use-debounce.ts` |
| Stores | `[name]-store.ts` | `theme-store.ts` |
| Tests | `[name].test.ts` | `cn.test.ts` |
| Barrels | `index.ts` | always |

## Barrel Exports

Every directory MUST have an `index.ts` that exports its public API:

```ts
// src/features/dashboard/index.ts
export { SectionCards } from './section-cards'
export { DashboardSkeleton } from './dashboard-skeleton'
export { RevenueAreaChart, TrafficPieChart } from './dashboard-charts'
```

## File Size Limits

| File Type | Max Lines | Action if Exceeded |
|---|---|---|
| Component | 300 | Split into sub-components |
| Hook | 100 | Extract logic into utils |
| Utility | 200 | Split into focused modules |
| Page | 200 | Extract to components |
| Store | 100 | Split by domain |

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Decision tree and rules
- [feature-creation.md](./feature-creation.md) — Feature module patterns
- [shared-components.md](./shared-components.md) — Component placement
