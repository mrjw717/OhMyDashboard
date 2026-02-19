# Architecture Overview

> Enterprise-grade Next.js 16 boilerplate with modular architecture

## Directory Structure

```
src/
├── app/                   # Next.js App Router (pages, layouts, API routes)
├── components/            # Legacy component location (shims to features/design-system)
│   └── ui/                # ShadCN primitives (canonical source for design-system)
├── config/                # Application configuration
│   ├── constants/         # Environment variables, app-level constants
│   └── theme/             # Theme tokens, colors, animations, input styles
├── core/                  # Pure business logic (zero framework deps)
│   ├── format/            # Number, currency, date formatting
│   ├── storage/           # LocalStorage & cookie helpers
│   ├── utils/             # cn() and generic utilities
│   └── validation/        # Zod schemas for common patterns
├── design-system/         # UI component library (re-exports from components/ui)
│   ├── composites/        # Multi-primitive components (sidebar, form, drawer)
│   ├── primitives/        # Atomic UI (button, input, card, badge, etc.)
│   └── tokens/            # Design token barrel (re-exports config/theme)
├── features/              # Self-contained feature modules
│   ├── console-drawer/    # DevUX expandable drawer
│   ├── dashboard/         # Charts, section cards, skeleton
│   ├── data-table/        # Sortable data table with DnD
│   └── theme-customizer/  # Theme color/mode switcher
├── infrastructure/        # External integrations & plumbing
│   ├── api/               # Typed fetch client + ApiError
│   ├── query/             # TanStack Query client + key factories
│   └── store/             # Zustand stores (theme, sidebar)
├── providers/             # React provider composition
│   ├── app-providers.tsx  # Root provider wrapper
│   └── query-provider.tsx # TanStack QueryClientProvider
├── test/                  # Test infrastructure
│   ├── setup.ts           # jest-dom matchers
│   └── utils.tsx          # Custom render with providers
└── types/                 # Shared TypeScript types
```

## Layer Rules

| Layer | May Import From | Never Import From |
|---|---|---|
| `core/` | External packages only | Any `src/` module |
| `config/` | `core/` | `components/`, `features/`, `app/` |
| `design-system/` | `components/ui/`, `core/` | `features/`, `app/` |
| `infrastructure/` | `core/`, `config/` | `features/`, `app/` |
| `features/` | `core/`, `config/`, `design-system/`, `infrastructure/` | Other `features/`, `app/` |
| `providers/` | `infrastructure/`, `config/` | `features/`, `app/` |
| `app/` | Everything | — |

## Key Patterns

### Backwards Compatibility
Original `src/components/` files are **shim re-exports** pointing to canonical sources in `features/` or `design-system/`. Existing imports like `@/components/data-table` continue to work unchanged.

### State Management
- **UI State**: Zustand stores with `persist` middleware (`infrastructure/store/`)
- **Server State**: TanStack Query via `QueryProvider` (`infrastructure/query/`)
- **Provider Composition**: Single `AppProviders` wraps the root layout

### Testing
- Framework: Vitest + jsdom
- `npm test` — watch mode
- `npm run test:ci` — single run
- Custom `render()` in `src/test/utils.tsx` wraps components with providers

## Tech Stack

| Concern | Tool |
|---|---|
| Framework | Next.js 16.1.1 |
| UI | React 19.2.3 |
| Styling | Tailwind CSS v4 |
| Components | ShadCN/ui + Radix |
| State | Zustand 5 |
| Data Fetching | TanStack Query 5 |
| Validation | Zod 4 |
| Forms | React Hook Form 7 |
| Testing | Vitest 4 + Testing Library |
| Charts | Recharts |
| DnD | dnd-kit |
