# Comprehensive Architectural Audit & Refactor Plan

**Project:** OHHHBoiler-Doublesidebar  
**Date:** February 2026  
**Status:** Pre-implementation  

---

## Table of Contents

1. [Executive Architecture Audit](#section-1-executive-architecture-audit)
2. [Identified Anti-Patterns](#section-2-identified-anti-patterns)
3. [Proposed Enterprise Folder Structure](#section-3-proposed-enterprise-folder-structure)
4. [Boilerplate Template Specification](#section-4-boilerplate-template-specification)
5. [Migration Plan](#section-5-migration-plan)
6. [Governance Rules](#section-6-governance-rules)

---

## SECTION 1: Executive Architecture Audit

### Structural Risks

| Risk | Severity | Description |
|------|----------|-------------|
| **Dual Theme System Location** | HIGH | Theme logic split between `themes/` (root level) and `src/` - `theme-hydrator.tsx` duplicates `CSS_VARIABLE_NAMES` array found in `css-generator.ts`. Single source of truth violated. |
| **Layer vs Feature Hybrid** | MEDIUM | Project is neither cleanly layer-based nor feature-based. Components mixed in `src/components/` with no domain partitioning. |
| **Root-Level Themes Directory** | HIGH | `themes/` lives outside `src/`, creating import path inconsistency (`../../../themes/`) and violating the `@/*` alias convention. |
| **No API Abstraction Layer** | HIGH | Direct `fetch()` calls in `theme-hydrator.tsx:82-92`. No error normalization, retry logic, or request orchestration. |

### Scaling Risks

| Risk | Severity | Description |
|------|----------|-------------|
| **No State Management** | CRITICAL | Zero global state architecture. 50+ contributors will create inconsistent patterns (prop drilling, context soup, localStorage sprawl). |
| **Component File Bloat** | HIGH | `data-table.tsx` is 808 lines with inline schema, columns, chart data, and multiple component definitions. Unmaintainable at scale. |
| **No Testing Infrastructure** | CRITICAL | Zero test files. No testing framework configured. 5x growth without tests = guaranteed regression hell. |
| **Missing Environment Configuration** | HIGH | No `.env` structure, no typed environment contracts, feature flags absent. |

### Maintenance Risks

| Risk | Severity | Description |
|------|----------|-------------|
| **Globals.css is 375 lines** | MEDIUM | Contains inline CSS, Tailwind config, theme defaults, and effect styles. Single-file CSS god-object. |
| **Barrel Export Inconsistency** | MEDIUM | Some directories have `index.ts` barrels (`lib/`, `types/`), some don't (`components/ui/`). Import discipline will degrade. |
| **Magic Numbers/Strings** | MEDIUM | Hardcoded values scattered: `DRAWER_HEIGHT = 200` (line 69), theme timeouts like `3000ms` (line 52). |

### Team-Collaboration Risks

| Risk | Severity | Description |
|------|----------|-------------|
| **No Feature Boundaries** | CRITICAL | All components share `src/components/`. No ownership model. Teams will conflict on file modifications. |
| **No Module Boundary Contracts** | HIGH | No documented rules on what can import what. Cross-cutting concerns will leak everywhere. |
| **Missing Governance Documentation** | HIGH | No `ARCHITECTURE.md`, no `CONTRIBUTING.md` standards. Onboarding friction. |

### Performance Risks

| Risk | Severity | Description |
|------|----------|-------------|
| **No Code Splitting Strategy** | MEDIUM | No lazy loading patterns observed. Bundle will grow linearly with features. |
| **Inline Script Injection** | MEDIUM | `layout.tsx:157-176` injects blocking scripts. Could impact Core Web Vitals. |
| **Theme Flash Prevention Complexity** | LOW | Complex theme hydration with multiple fallback layers. Maintenance burden. |

---

## SECTION 2: Identified Anti-Patterns

### AP-1: Dual Theme Constant Definition

**Location:** `src/app/theme-hydrator.tsx:21-45` and `themes/css-generator.ts:18-135`

**Problem:** `CSS_VARIABLE_NAMES` defined twice with different formats. Source of truth unclear.

**Risk at Scale:** Silent desync when adding tokens. Debugging nightmare. One location updated, other forgotten.

**Recommendation:** Single constant in `src/config/theme/tokens.ts`, consumed by both files.

**Severity:** HIGH

---

### AP-2: Root-Level Themes Directory

**Location:** `./themes/` at project root

**Problem:** Themes exist outside `src/`, breaking the `@/*` path alias. Imports use `../../../themes/`.

**Risk at Scale:** Import path chaos. ESLint path rules fail. IDE refactoring breaks.

**Recommendation:** Move to `src/config/theme/` or `src/core/theme/`.

**Severity:** HIGH

---

### AP-3: God Component File

**Location:** `src/components/data-table.tsx` (808 lines)

**Problem:** Contains schema, column definitions, chart data, 3+ component definitions, inline business logic.

**Risk at Scale:** Merge conflicts. No testability. Impossible code review. Cognitive overload.

**Recommendation:** Split into:
- `features/data-table/types.ts` (schema)
- `features/data-table/columns.tsx` (column defs)
- `features/data-table/components/` (sub-components)
- `features/data-table/hooks/` (table logic)

**Severity:** CRITICAL

---

### AP-4: Direct Fetch in Components

**Location:** `src/app/theme-hydrator.tsx:82-92`

**Problem:** API call embedded in component logic. No abstraction.

**Risk at Scale:** No caching. No retry. No error boundary. No request deduplication. Inconsistent error handling.

**Recommendation:** API client layer with TanStack Query integration.

**Severity:** HIGH

---

### AP-5: Utils Dumping Ground

**Location:** `src/lib/`

**Problem:** `lib/` contains unrelated utilities (format, validation, storage, theme-server, utils). No domain grouping.

**Risk at Scale:** Becomes a junk drawer. Developers dump anything here. No discoverability.

**Recommendation:** Domain-organized utilities:
- `src/core/format/`
- `src/core/validation/`
- `src/core/storage/`
- `src/core/theme/`

**Severity:** MEDIUM

---

### AP-6: No Barrel Export for UI Components

**Location:** `src/components/ui/`

**Problem:** No `index.ts` barrel. Each import requires full path: `@/components/ui/button`.

**Risk at Scale:** Import statement verbosity. Refactoring friction.

**Recommendation:** Add barrel with public API surface only (not internal helpers).

**Severity:** LOW

---

### AP-7: Duplicate Theme Cookie Constants

**Location:** `src/lib/theme-server.ts:5-6` and `src/middleware.ts:4-5`

**Problem:** `THEME_COOKIE` and `DARK_MODE_COOKIE` defined in both files.

**Risk at Scale:** Desync risk when changing cookie names.

**Recommendation:** Single source in `src/config/constants/cookies.ts`.

**Severity:** MEDIUM

---

### AP-8: Layout Component in Components Directory

**Location:** `src/components/shell-layout.tsx`

**Problem:** Layout components mixed with presentational components.

**Risk at Scale:** Unclear ownership. Layout changes affect unrelated code reviews.

**Recommendation:** Move to `src/app/(main)/_layout/` or `src/core/layout/`.

**Severity:** LOW

---

### AP-9: No Error Boundary Architecture

**Location:** Project-wide

**Problem:** No error boundaries observed. `error.tsx` exists but no granular error handling.

**Risk at Scale:** Full page crashes from component errors. Poor UX.

**Recommendation:** Feature-level error boundaries with typed error contracts.

**Severity:** HIGH

---

### AP-10: Hardcoded Theme Lists

**Location:** `src/middleware.ts:8-12`, `src/app/api/theme/route.ts:4-8`

**Problem:** Valid themes list duplicated in multiple files.

**Risk at Scale:** Adding themes requires updating 3+ locations.

**Recommendation:** Single theme registry in `src/config/theme/registry.ts`.

**Severity:** MEDIUM

---

### AP-11: No Loading State Architecture

**Location:** `src/components/loading/` exists but not systematically used

**Problem:** Loading states exist in isolation. No Suspense boundaries. No streaming patterns.

**Risk at Scale:** Inconsistent UX. Waterfall loading. No skeleton standardization.

**Recommendation:** Implement loading.tsx at route level with standardized skeleton patterns.

**Severity:** MEDIUM

---

### AP-12: Provider Empty Shell

**Location:** `src/providers/index.ts`

**Problem:** File exists with comment only. No actual provider pattern.

**Risk at Scale:** Dead code. Developers unsure where to add providers.

**Recommendation:** Remove or implement proper provider composition.

**Severity:** LOW

---

## SECTION 3: Proposed Enterprise Folder Structure

```
src/
├── app/                          # Next.js App Router (PRESENTATION LAYER ONLY)
│   ├── (main)/                   # Route group for authenticated section
│   │   ├── _layout/              # Co-located layout components
│   │   │   ├── shell-layout.tsx
│   │   │   └── index.ts
│   │   ├── dashboard/            # Feature: Dashboard (route = /dashboard)
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── error.tsx
│   │   ├── inputs/               # Feature: Inputs
│   │   │   └── page.tsx
│   │   ├── layout.tsx            # Route group layout
│   │   └── page.tsx              # Default route
│   ├── (auth)/                   # Route group for auth pages
│   │   ├── login/
│   │   └── layout.tsx
│   ├── api/                      # API Routes (INFRASTRUCTURE LAYER)
│   │   ├── theme/
│   │   │   └── route.ts
│   │   └── trpc/                 # Future tRPC router
│   │       └── [trpc]/route.ts
│   ├── layout.tsx                # Root layout
│   ├── globals.css               # Global styles (import only)
│   ├── not-found.tsx
│   └── error.tsx
│
├── core/                         # CORE LAYER (no external deps, pure logic)
│   ├── format/                   # Formatting utilities
│   │   ├── number.ts
│   │   ├── date.ts
│   │   ├── currency.ts
│   │   └── index.ts
│   ├── validation/               # Validation schemas (Zod)
│   │   ├── email.ts
│   │   ├── password.ts
│   │   ├── common.ts
│   │   └── index.ts
│   ├── storage/                  # Storage abstractions
│   │   ├── local-storage.ts
│   │   ├── cookie.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── errors/                   # Error handling
│   │   ├── types.ts              # AppError, ErrorCode enums
│   │   ├── factory.ts            # Error creation utilities
│   │   ├── boundaries.tsx        # Error boundary components
│   │   └── index.ts
│   ├── utils/                    # Pure utility functions
│   │   ├── cn.ts                 # Class name merge
│   │   └── index.ts
│   └── index.ts                  # Core barrel export
│
├── config/                       # CONFIGURATION LAYER (static, typed)
│   ├── theme/
│   │   ├── tokens.ts             # CSS_VARIABLE_NAMES (SSOT)
│   │   ├── registry.ts           # Theme list and validation
│   │   ├── css-generator.ts      # CSS variable generation
│   │   ├── server.ts             # Server-side theme resolution
│   │   ├── init-script.ts        # Client hydration script
│   │   └── index.ts
│   ├── navigation/
│   │   ├── primary.ts
│   │   ├── secondary.ts
│   │   ├── documents.ts
│   │   └── index.ts
│   ├── constants/
│   │   ├── layout.ts
│   │   ├── cookies.ts
│   │   ├── animation.ts
│   │   └── index.ts
│   ├── environment.ts            # Typed env contracts
│   ├── feature-flags.ts          # Feature toggle definitions
│   └── index.ts
│
├── features/                     # FEATURE LAYER (domain-driven)
│   ├── dashboard/
│   │   ├── api/                  # Feature-specific API calls
│   │   │   ├── get-metrics.ts
│   │   │   └── index.ts
│   │   ├── components/           # Feature-specific components
│   │   │   ├── metric-card.tsx
│   │   │   ├── revenue-chart.tsx
│   │   │   └── index.ts
│   │   ├── hooks/                # Feature-specific hooks
│   │   │   ├── use-dashboard-data.ts
│   │   │   └── index.ts
│   │   ├── types.ts              # Feature types
│   │   ├── schemas.ts            # Feature Zod schemas
│   │   └── index.ts              # Feature barrel (PUBLIC API)
│   ├── data-table/
│   │   ├── api/
│   │   ├── components/
│   │   │   ├── table-row.tsx
│   │   │   ├── table-header.tsx
│   │   │   ├── table-pagination.tsx
│   │   │   ├── cell-viewer-drawer.tsx
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── use-table-state.ts
│   │   │   ├── use-drag-sort.ts
│   │   │   └── index.ts
│   │   ├── columns.tsx           # Column definitions
│   │   ├── types.ts
│   │   ├── schemas.ts
│   │   └── index.ts
│   ├── console-drawer/
│   │   ├── components/
│   │   ├── views/
│   │   ├── types.ts
│   │   └── index.ts
│   └── theme-customizer/
│       ├── components/
│       ├── hooks/
│       ├── types.ts
│       └── index.ts
│
├── shared/                       # SHARED PRESENTATION LAYER
│   ├── components/
│   │   ├── layout/               # Reusable layout primitives
│   │   │   ├── shell-header.tsx
│   │   │   ├── sidebar-primary.tsx
│   │   │   ├── sidebar-secondary.tsx
│   │   │   └── index.ts
│   │   ├── feedback/             # User feedback components
│   │   │   ├── empty-state.tsx
│   │   │   ├── loading-skeleton.tsx
│   │   │   └── index.ts
│   │   ├── navigation/           # Navigation components
│   │   │   ├── breadcrumbs.tsx
│   │   │   ├── command-menu.tsx
│   │   │   └── index.ts
│   │   └── index.ts
│   └── hooks/                    # Shared hooks
│       ├── use-media-query.ts
│       ├── use-debounce.ts
│       ├── use-local-storage.ts
│       └── index.ts
│
├── design-system/                # DESIGN SYSTEM (isolated, versioned)
│   ├── primitives/               # Atomic UI components
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.styles.ts
│   │   │   ├── button.types.ts
│   │   │   └── index.ts
│   │   ├── input/
│   │   ├── select/
│   │   ├── dialog/
│   │   ├── tooltip/
│   │   └── index.ts
│   ├── composites/               # Compound components
│   │   ├── data-table/
│   │   ├── form-field/
│   │   ├── sidebar/
│   │   └── index.ts
│   ├── patterns/                 # UI patterns
│   │   ├── card-themed/
│   │   ├── glass-effect/
│   │   └── index.ts
│   ├── tokens/                   # Design tokens (JS)
│   │   ├── colors.ts
│   │   ├── typography.ts
│   │   ├── spacing.ts
│   │   ├── shadows.ts
│   │   ├── radius.ts
│   │   └── index.ts
│   └── index.ts
│
├── infrastructure/               # INFRASTRUCTURE LAYER
│   ├── api/                      # API client
│   │   ├── client.ts             # Base fetch client
│   │   ├── interceptors.ts       # Request/response interceptors
│   │   ├── errors.ts             # API error classes
│   │   └── index.ts
│   ├── query/                    # TanStack Query setup
│   │   ├── query-client.ts
│   │   ├── query-keys.ts
│   │   └── index.ts
│   ├── store/                    # Zustand stores
│   │   ├── theme-store.ts
│   │   ├── sidebar-store.ts
│   │   ├── ui-store.ts
│   │   └── index.ts
│   └── index.ts
│
├── providers/                    # PROVIDER COMPOSITION
│   ├── theme-provider.tsx
│   ├── query-provider.tsx
│   ├── sidebar-provider.tsx
│   ├── app-providers.tsx         # Composes all providers
│   └── index.ts
│
├── styles/                       # CSS ORGANIZATION (keep current structure)
│   ├── tokens/
│   ├── base/
│   ├── effects/
│   ├── animations/
│   ├── components/
│   └── index.css
│
├── types/                        # GLOBAL TYPES
│   ├── api.ts
│   ├── navigation.ts
│   ├── sidebar.ts
│   ├── user.ts
│   ├── chart.ts
│   └── index.ts
│
└── middleware.ts                 # Next.js middleware
```

### Layer Responsibility Matrix

| Layer | Responsibility | Can Import From | Cannot Import From |
|-------|----------------|-----------------|-------------------|
| `app/` | Routing, page composition | Everything below | Nothing above |
| `features/` | Domain logic, feature components | `core/`, `shared/`, `design-system/`, `infrastructure/`, `types/` | Other features (use events/stores) |
| `shared/` | Cross-feature presentation | `core/`, `design-system/`, `types/` | `features/`, `infrastructure/` |
| `design-system/` | UI primitives, tokens | `core/`, `types/` | `features/`, `shared/`, `infrastructure/` |
| `infrastructure/` | External integrations | `core/`, `types/` | `features/`, `shared/`, `design-system/` |
| `core/` | Pure business logic | `types/` | Everything else |
| `config/` | Static configuration | `types/` | Everything else |

---

## SECTION 4: Boilerplate Template Specification

### 4.1 Naming Conventions

```
Files:
├── Components:    kebab-case.tsx     (button.tsx, data-table.tsx)
├── Hooks:         use-kebab-case.ts  (use-debounce.ts)
├── Utilities:     kebab-case.ts      (format-number.ts)
├── Types:         kebab-case.ts      (navigation.ts)
├── Schemas:       kebab-case.ts      (user.ts)
├── Constants:     SCREAMING_SNAKE.ts (LAYOUT.ts) or kebab-case.ts for groups
├── Stores:        kebab-store.ts     (theme-store.ts)
├── API:           verb-resource.ts   (get-user.ts, update-theme.ts)
└── Tests:         same-name.test.ts  (button.test.tsx)

Directories:
├── Features:      kebab-case         (data-table/, user-profile/)
├── Components:    kebab-case         (button/, data-table/)
├── Utilities:     kebab-case         (format/, validation/)
└── Never:         plural nouns only  (buttons/ ❌ → button/ ✓)
```

### 4.2 Component File Composition

Every component directory must contain:

```
component-name/
├── component-name.tsx       # Main component (REQUIRED)
├── component-name.types.ts  # Type definitions (>3 props)
├── component-name.styles.ts # Extracted styles (>50 lines)
├── component-name.test.tsx  # Tests (REQUIRED for shared)
├── component-name.stories.tsx # Storybook (design-system only)
└── index.ts                 # Barrel export (REQUIRED)
```

**Main component template:**

```tsx
// component-name.tsx
import { forwardRef } from 'react'
import { cn } from '@/core/utils'
import type { ComponentNameProps } from './component-name.types'

export const ComponentName = forwardRef<HTMLDivElement, ComponentNameProps>(
  ({ className, variant = 'default', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', className)}
        data-slot="component-name"
        {...props}
      />
    )
  }
)

ComponentName.displayName = 'ComponentName'
```

### 4.3 Store Partitioning Rules

```
infrastructure/store/
├── ui-store.ts          # UI state (modals, toasts, sidebars)
├── theme-store.ts       # Theme preferences
├── user-preferences.ts  # User settings
└── [domain]-store.ts    # Per-domain client state
```

**Rules:**
1. Never store server state in Zustand (use TanStack Query)
2. Store must be typed with explicit interface
3. Actions must be pure functions
4. Persist only serializable data

### 4.4 API Service Rules

```
infrastructure/api/
├── client.ts            # Base client with interceptors
├── errors.ts            # ApiError, NetworkError, etc.
└── index.ts

features/[name]/api/
├── get-[resource].ts    # GET requests
├── create-[resource].ts # POST requests  
├── update-[resource].ts # PUT/PATCH requests
├── delete-[resource].ts # DELETE requests
└── index.ts
```

**API function template:**

```ts
// get-user.ts
import { apiClient } from '@/infrastructure/api/client'
import { ApiError } from '@/infrastructure/api/errors'
import type { User } from '@/types'

export async function getUser(id: string): Promise<User> {
  const response = await apiClient.get(`/api/users/${id}`)
  
  if (!response.ok) {
    throw ApiError.fromResponse(response)
  }
  
  return response.json()
}
```

### 4.5 Barrel Export Policy

**Allowed exports (public API):**
- Named exports of public functions/components
- Type exports for public interfaces

**Forbidden exports:**
- Internal utilities (prefix with `_` if must export)
- Test utilities
- Mock data

**Example barrel:**

```ts
// features/data-table/index.ts
export { DataTable } from './components/data-table'
export { useTableState } from './hooks/use-table-state'
export type { DataTableProps, TableColumn } from './types'

// Internal - do not export
// export { internalHelper } from './utils'
```

### 4.6 Type Isolation Policy

```
types/                    # Global shared types
├── api.ts               # ApiResponse<T>, PaginatedResponse<T>
├── primitives.ts        # ID, Timestamp, Email
└── index.ts

features/[name]/types.ts  # Feature-specific types
features/[name]/schemas.ts # Zod schemas (derive types from here)
```

**Rule:** Types used by 2+ features go to `types/`. Single-feature types stay local.

### 4.7 Testing Placement Rules

```
Unit tests:       Co-located     (button.test.tsx next to button.tsx)
Integration:      __tests__/     (features/data-table/__tests__/)
E2E:              e2e/           (project root, outside src/)

Test file naming:
├── button.test.tsx           # Unit test
├── use-debounce.test.ts      # Hook test
├── get-user.test.ts          # API test
└── data-table.integration.test.tsx
```

### 4.8 Import Path Conventions

```ts
// Absolute imports ONLY (enforced by ESLint)
import { Button } from '@/design-system/primitives/button'
import { useTheme } from '@/providers/theme-provider'
import { formatCurrency } from '@/core/format'
import { NAV_CONFIG } from '@/config/navigation'
import type { User } from '@/types'

// NEVER relative imports across directories
import { Button } from '../../design-system/button'  // ❌ FORBIDDEN
```

### 4.9 Absolute Path Aliasing

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/core/*": ["./src/core/*"],
      "@/config/*": ["./src/config/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/design-system/*": ["./src/design-system/*"],
      "@/infrastructure/*": ["./src/infrastructure/*"],
      "@/providers/*": ["./src/providers/*"],
      "@/types/*": ["./src/types/*"]
    }
  }
}
```

---

## SECTION 5: Migration Plan

### Phase 1: Foundation (Week 1-2)
**Risk Level: LOW**

1. **Create new directory structure** (empty folders)
2. **Move `themes/` to `src/config/theme/`**
   - Update all imports
   - Verify theme switching works
3. **Create `src/core/` modules**
   - Move `lib/format.ts` → `core/format/`
   - Move `lib/validation.ts` → `core/validation/`
   - Move `lib/storage.ts` → `core/storage/`
4. **Extract shared constants**
   - Create `config/constants/cookies.ts`
   - Create `config/constants/layout.ts`
   - Remove duplicates

**Validation:** `npm run build` passes, all pages render

---

### Phase 2: State Infrastructure (Week 2-3)
**Risk Level: MEDIUM**

1. **Install and configure Zustand**
   ```bash
   npm install zustand
   ```
2. **Install and configure TanStack Query**
   ```bash
   npm install @tanstack/react-query
   ```
3. **Create provider composition**
   - `providers/app-providers.tsx`
   - Integrate into root layout
4. **Create base API client**
   - `infrastructure/api/client.ts`
   - Add error handling
5. **Migrate theme API call to new client**

**Validation:** Theme switching persists, no regressions

---

### Phase 3: Feature Extraction (Week 3-5)
**Risk Level: HIGH**

1. **Extract `data-table` feature** (largest file first)
   - Create feature structure
   - Split `data-table.tsx` into components
   - Extract types and schemas
   - Add TanStack Query for data fetching
2. **Extract `console-drawer` feature**
3. **Extract `dashboard` feature**
4. **Extract `theme-customizer` feature**

**Validation:** All features work in isolation, no import cycles

---

### Phase 4: Design System Isolation (Week 5-6)
**Risk Level: MEDIUM**

1. **Create `design-system/` structure**
2. **Move UI primitives from `components/ui/`**
3. **Standardize component composition**
4. **Add component tests for primitives**
5. **Document design tokens**

**Validation:** Storybook builds, all components documented

---

### Phase 5: Testing Infrastructure (Week 6-7)
**Risk Level: LOW**

1. **Install testing framework**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom
   ```
2. **Configure Vitest**
3. **Add test utilities**
   - `src/test/utils.tsx` (render with providers)
   - `src/test/mocks/` (mock handlers)
4. **Add tests for critical paths**
   - Theme switching
   - Navigation
   - Form validation
5. **Configure CI test run**

**Validation:** 60%+ coverage on core modules

---

### Phase 6: Governance & Documentation (Week 7-8)
**Risk Level: LOW**

1. **Create `ARCHITECTURE.md`**
2. **Create `CONTRIBUTING.md`**
3. **Add ESLint boundary rules** (no restricted imports)
4. **Add PR template with checklist**
5. **Create onboarding guide**

---

### Migration Risk Mitigation

| Risk | Mitigation |
|------|------------|
| Import path breakage | Use TypeScript + ESLint to catch at compile time |
| Feature conflicts | One feature per PR, thorough review |
| Runtime errors | E2E tests before merge |
| Team confusion | Weekly architecture sync, documented decisions |
| Regression | Visual regression tests for UI changes |

---

## SECTION 6: Governance Rules

### 6.1 Dependency Direction Rules

```yaml
# .eslintrc.yml (enforced)
rules:
  import/no-restricted-paths:
    - error
    - zones:
        # Features cannot import from other features
        - target: ./src/features/**
          from: ./src/features/**
          except:
            - ./src/features/*/index.ts  # Only public API
        
        # Design system cannot import from features
        - target: ./src/design-system/**
          from: ./src/features/**
        
        # Core cannot import from infrastructure
        - target: ./src/core/**
          from: ./src/infrastructure/**
        
        # Core cannot import from design-system
        - target: ./src/core/**
          from: ./src/design-system/**
```

### 6.2 New Feature Structure Checklist

Every new feature MUST:

- [ ] Live in `src/features/[feature-name]/`
- [ ] Have `index.ts` barrel with public API only
- [ ] Have `types.ts` for type definitions
- [ ] Have `schemas.ts` for Zod schemas (if validation needed)
- [ ] Use TanStack Query for data fetching (no direct fetch)
- [ ] Use Zustand only for client-side UI state
- [ ] Import components from `@/design-system/` or `@/shared/`
- [ ] Have at least one integration test

### 6.3 PR Review Checklist (Architecture)

```markdown
## Architecture Review

- [ ] No new files in `src/lib/` (use feature/core)
- [ ] No new files in `src/components/` root (use feature/shared/design-system)
- [ ] No relative imports across module boundaries
- [ ] No direct fetch() calls (use API client)
- [ ] No localStorage/sessionStorage direct access (use storage abstraction)
- [ ] No hardcoded strings that should be constants
- [ ] New components have data-slot attribute
- [ ] Types exported from feature index.ts if public
- [ ] Store added to infrastructure/store/ if needed
```

### 6.4 Definition of Done (Structural)

A feature is structurally complete when:

1. **Imports** - All imports use absolute paths
2. **Types** - All types defined in feature types.ts or schemas.ts
3. **Barrel** - Public API exported from index.ts
4. **Tests** - Unit tests for hooks/utilities, integration for components
5. **Boundaries** - No cross-feature imports except through public API
6. **State** - Server state in TanStack Query, client state in Zustand
7. **Errors** - Errors handled with typed error classes
8. **Loading** - Loading states implemented with skeletons
9. **Docs** - Complex logic has inline documentation

### 6.5 Enforced File Size Limits

| Type | Max Lines | Action Required |
|------|-----------|-----------------|
| Component | 300 | Extract sub-components |
| Hook | 100 | Split into smaller hooks |
| Utility | 150 | Split by responsibility |
| API Function | 50 | Extract transformers |
| Store | 200 | Split by domain |
| Barrel (index.ts) | 50 | Review exports |

---

## Summary

This codebase has a solid foundation with a sophisticated theming system and well-designed UI components. However, it lacks the architectural boundaries necessary for enterprise-scale growth. The primary risks are:

1. **No state management architecture** - Will lead to inconsistent patterns
2. **No feature isolation** - Will cause merge conflicts and coupling
3. **No testing infrastructure** - Will cause regression nightmares
4. **Theme system split across locations** - Will cause maintenance burden

The proposed refactor addresses these issues through:
- **Feature-driven architecture** with clear ownership boundaries
- **Layered dependency flow** preventing circular dependencies  
- **State architecture** with TanStack Query + Zustand
- **Design system isolation** for consistent UI
- **Testing infrastructure** from day one

The migration is designed to be incremental, with each phase validated before proceeding, minimizing risk while maximizing structural improvement.
