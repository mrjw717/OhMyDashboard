# Architecture Rules

## Layer Structure

The codebase follows strict layered architecture. Each layer can only import from layers below it.

```
app/           ← Top: pages, layouts, route handlers
providers/     ← Provider composition
features/      ← Self-contained feature modules
infrastructure/← External integrations (API, stores, queries)
design-system/ ← UI component library (re-exports from components/ui/)
config/        ← Configuration, theme, constants
core/          ← Pure utilities (no framework deps)
```

## Import Boundary Rules

| Layer | ✅ Can Import | ❌ Cannot Import |
|---|---|---|
| `core/` | External packages only | Any `src/` module |
| `config/` | `core/` | `components/`, `features/`, `app/` |
| `design-system/` | `components/ui/`, `core/` | `features/`, `app/` |
| `infrastructure/` | `core/`, `config/` | `features/`, `app/` |
| `features/` | `core/`, `config/`, `design-system/`, `infrastructure/` | Other `features/`, `app/` |
| `providers/` | `infrastructure/`, `config/` | `features/`, `app/` |
| `app/` | Everything | — |

### Feature Isolation
Features NEVER import from each other. If two features need shared logic, extract it to `core/`, `config/`, or `components/`.

## File Conventions

- Absolute imports only: `@/core/utils`, never `../../core/utils`
- Barrel exports: every directory has `index.ts`
- Named exports only (except Next.js pages which use `default`)
- `import type` for type-only imports

## Component Architecture

```
components/ui/     ← Canonical source (ShadCN primitives)
design-system/     ← Re-export barrels (new consumer path)
components/*.tsx   ← Backwards-compat shims → features/
features/          ← Extracted feature modules
```

## Build Gate

Every structural change MUST pass:
```bash
npm run build     # Exit 0
npm run test:ci   # All tests pass
```
