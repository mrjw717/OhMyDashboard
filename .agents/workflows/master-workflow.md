# Master Workflow — OhMyDashboard! Enterprise Dashboard

## AI Reasoning: When to Use Which Workflow

Before doing ANY work, use this decision tree to select the right workflow:

```
START: What is the user asking?
│
├─ "Create a new feature/page/module"
│   └─ → feature-creation.md
│
├─ "Add/modify a component"
│   ├─ Is it an input/form field?
│   │   └─ → input-components.md
│   ├─ Is it a UI primitive (button, badge, dialog)?
│   │   └─ → shared-components.md (primitives section)
│   └─ Is it a shared/reusable component?
│       └─ → shared-components.md
│
├─ "Where should I put this file?"
│   └─ → file-placement.md
│
├─ "Change colors/theme/styling"
│   └─ → theming.md
│
├─ "Add/modify tests"
│   └─ → testing.md
│
├─ "Add/modify state management or data fetching"
│   └─ → state-management.md
│
├─ "What does this project look like?"
│   └─ → project-overview.md
│
└─ Unsure?
    └─ Read project-overview.md first, then this file
```

## Critical Rules (NEVER BREAK)

### 1. Layer Boundaries
| Layer | May Import From | NEVER Import From |
|---|---|---|
| `core/` | External packages only | Any `src/` module |
| `config/` | `core/` | `components/`, `features/`, `app/` |
| `design-system/` | `components/ui/`, `core/` | `features/`, `app/` |
| `infrastructure/` | `core/`, `config/` | `features/`, `app/` |
| `features/` | `core/`, `config/`, `design-system/`, `infrastructure/` | Other `features/`, `app/` |
| `providers/` | `infrastructure/`, `config/` | `features/`, `app/` |
| `app/` | Everything | — |

### 2. Import Rules
- Always use `@/` alias — never relative paths across modules
- Import from barrel files (`index.ts`) — never deep-import internals
- Use `import type` for type-only imports

### 3. Theme System
- ALL colors via CSS variables — no hardcoded hex/rgb/hsl
- Use Tailwind semantic classes (`bg-primary`, `text-muted-foreground`)
- Theme tokens defined in `src/config/theme/`

### 4. Naming
- kebab-case for files (`smart-input-field.tsx`)
- PascalCase for components (`SmartInputField`)
- Feature components prefixed with feature name (`students-data-table.tsx`)
- Barrel files are always `index.ts`

### 5. Testing
- Tests co-located next to source: `module.test.ts`
- Use custom `render` from `@/test/utils` for component tests
- `npm test` (watch) / `npm run test:ci` (single run)

## Build Validation

After ANY structural change:
```bash
npm run build        # Must exit 0
npm run test:ci      # Must pass all tests
```

## Checklist Before Committing

- [ ] All colors use theme tokens
- [ ] Components in correct location per file-placement.md
- [ ] Layer boundaries respected
- [ ] Barrel exports updated
- [ ] Using `@/` imports exclusively
- [ ] TypeScript errors resolved
- [ ] `npm run build` succeeds
- [ ] `npm run test:ci` passes

## Related Workflows

| Workflow | Purpose |
|---|---|
| [project-overview.md](./project-overview.md) | Architecture map, tech stack, directory structure |
| [feature-creation.md](./feature-creation.md) | Creating self-contained feature modules |
| [file-placement.md](./file-placement.md) | Where to put every file type |
| [input-components.md](./input-components.md) | Input creation and validation patterns |
| [shared-components.md](./shared-components.md) | Design system and shared component patterns |
| [theming.md](./theming.md) | Theme tokens, CSS variables, styling |
| [testing.md](./testing.md) | Vitest setup, test patterns, custom render |
| [state-management.md](./state-management.md) | Zustand stores, TanStack Query, API client |
