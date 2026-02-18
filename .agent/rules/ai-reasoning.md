# AI Reasoning Rules

## Workflow Selection

Before ANY code change, consult the master workflow decision tree:

1. Open [master-workflow.md](../workflows/master-workflow.md)
2. Walk the decision tree based on the user's request
3. Open the matched workflow and follow its steps

Never skip the decision tree. It prevents wasted work and wrong file placement.

## Pre-Flight Checks

Before creating any file or component:

1. **Search first** — Does this already exist? Check `src/components/`, `src/features/`, `src/core/`
2. **Check the layer** — Where does this belong? Use [file-placement.md](../workflows/file-placement.md)
3. **Check imports** — Will this create a layer violation? See architecture.md
4. **Check theme** — Am I using tokens? See [theming.md](../workflows/theming.md)

## Common Mistakes to Avoid

| Mistake | Fix |
|---|---|
| Creating a utility in `src/lib/` | Use `src/core/` instead |
| Hardcoding colors | Use theme tokens from `src/config/theme/` |
| Putting theme files in `themes/` | Use `src/config/theme/` |
| Importing between features | Extract shared logic to `core/` or `components/` |
| Using relative imports across modules | Use `@/` alias |
| Creating files in `src/constants/` | Use `src/config/constants/` |
| Forgetting barrel exports | Every directory needs `index.ts` |
| Forgetting backwards-compat shim | When moving files, leave a re-export shim |

## Build Validation Discipline

After completing ANY change:
```bash
npm run build      # Must exit 0
npm run test:ci    # Must pass
```

If either fails, fix before moving on. Never leave the codebase in a broken state.

## Reasoning Out Loud

When facing ambiguity:
1. State the options
2. Reference the relevant workflow
3. Choose the option that respects layer boundaries
4. Document the decision in a code comment if non-obvious

## Cross-References

| Rule File | Scope |
|---|---|
| [architecture.md](./architecture.md) | Layer boundaries, import rules |
| [code-quality.md](./code-quality.md) | Naming, types, file sizes, styling |
| This file | AI decision-making process |

| Workflow | Scope |
|---|---|
| [master-workflow.md](../workflows/master-workflow.md) | Decision tree, critical rules, checklist |
| [project-overview.md](../workflows/project-overview.md) | Architecture map, tech stack |
| [file-placement.md](../workflows/file-placement.md) | Where to put files |
| [feature-creation.md](../workflows/feature-creation.md) | Feature modules |
| [shared-components.md](../workflows/shared-components.md) | Components and design system |
| [input-components.md](../workflows/input-components.md) | Input patterns |
| [theming.md](../workflows/theming.md) | Theme tokens |
| [testing.md](../workflows/testing.md) | Vitest patterns |
| [state-management.md](../workflows/state-management.md) | Zustand, TanStack Query |
