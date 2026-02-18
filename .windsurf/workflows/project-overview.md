# Project Overview — OHHHBoiler Enterprise Dashboard

## Project Type
Enterprise-grade Next.js admin dashboard boilerplate with dual-sidebar layout, animated backgrounds, and modular architecture.

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | Next.js 16.1.1 (App Router) |
| UI | React 19.2.3 |
| Styling | Tailwind CSS v4 |
| Components | ShadCN/ui + Radix UI |
| State (UI) | Zustand 5 |
| State (Server) | TanStack Query 5 |
| Validation | Zod 4 |
| Forms | React Hook Form 7 |
| Testing | Vitest 4 + Testing Library |
| Charts | Recharts |
| DnD | dnd-kit |
| Animations | Framer Motion |
| Icons | Tabler Icons + Lucide |

## Directory Structure

```
src/
├── app/                     # Next.js App Router pages, layouts, API routes
│   ├── (dashboard)/         # Route group for dashboard pages
│   │   ├── page.tsx         # Main dashboard
│   │   └── inputs/          # Example feature route
│   ├── layout.tsx           # Root layout (wraps AppProviders)
│   └── globals.css          # Global styles + CSS variables
│
├── components/              # Backwards-compat shims + UI source
│   ├── ui/                  # ShadCN primitives (canonical source)
│   └── *.tsx                # Shim re-exports → features/
│
├── config/                  # Application configuration
│   ├── constants/           # Environment vars, app constants
│   │   └── app.ts
│   └── theme/               # Theme tokens, colors, animations
│       ├── types.ts         # ThemeColors, Theme interfaces
│       ├── themes.ts        # Theme definitions (blue, slate, etc.)
│       ├── colors.ts        # Color utilities
│       ├── input-formatters.ts
│       ├── input-styles.ts
│       └── index.ts         # Theme barrel
│
├── core/                    # Pure business logic (ZERO framework deps)
│   ├── format/              # Number, currency, date formatting
│   ├── storage/             # localStorage & cookie helpers
│   ├── utils/               # cn() and generic utilities
│   └── validation/          # Zod schemas (email, password, phone, URL)
│
├── design-system/           # UI component library (re-exports)
│   ├── primitives/          # Atomic UI (button, input, card, etc.)
│   ├── composites/          # Multi-primitive (sidebar, form, drawer)
│   │   ├── sidebar/
│   │   └── smart-input/
│   └── tokens/              # Design token barrel
│
├── features/                # Self-contained feature modules
│   ├── console-drawer/      # DevUX expandable drawer
│   ├── dashboard/           # Charts, section cards, skeleton
│   ├── data-table/          # Sortable data table with DnD
│   └── theme-customizer/    # Theme color/mode switcher
│
├── infrastructure/          # External integrations
│   ├── api/                 # Typed fetch client + ApiError
│   ├── query/               # TanStack Query client + key factories
│   └── store/               # Zustand stores (theme, sidebar)
│
├── providers/               # React provider composition
│   ├── app-providers.tsx    # Root wrapper (QueryProvider + ThemeHydrator)
│   └── query-provider.tsx
│
├── test/                    # Test infrastructure
│   ├── setup.ts             # jest-dom matchers
│   └── utils.tsx            # Custom render with providers
│
└── types/                   # Shared TypeScript types
```

## Layer Rules

See [master-workflow.md](./master-workflow.md) for the full import boundary table.

**Summary**: core → config → infrastructure → features → app. Never import "up" the stack.

## Critical Layout Rules

1. **Dual Sidebar Architecture**: Primary (left) + Secondary (right)
2. **Floating Shell**: Center content with glow effect — NEVER add `overflow-hidden`
3. **Transparency**: Sidebars are transparent to show animated background
4. **Z-Index Layering**: Defined in `src/config/constants/`

## Key Conventions

- **Absolute imports**: Always `@/` prefix
- **Barrel exports**: Every directory has `index.ts`
- **Named exports only**: No default exports (except Next.js pages)
- **co-located tests**: `module.test.ts` next to `module.ts`
- **Backwards compat**: Old `components/` paths still work via shim re-exports

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Decision tree and critical rules
- [file-placement.md](./file-placement.md) — Where to put files
- [feature-creation.md](./feature-creation.md) — Feature module patterns
