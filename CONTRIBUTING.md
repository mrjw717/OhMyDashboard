# Contributing

## Quick Start

```bash
npm install
npm run dev          # dev server on 0.0.0.0
npm run build        # production build
npm test             # watch mode tests
npm run test:ci      # single run tests
```

## Code Organization

See [ARCHITECTURE.md](./ARCHITECTURE.md) for the full directory structure and layer rules.

### Adding a New Feature

1. Create a directory under `src/features/<feature-name>/`
2. Add an `index.ts` barrel exporting the public API
3. Only import from allowed layers (`core/`, `config/`, `design-system/`, `infrastructure/`)
4. Never import from other features or from `app/`

### Adding a New UI Component

1. Create the component in `src/components/ui/` (ShadCN convention)
2. Add a re-export in `src/design-system/primitives/index.ts` (or `composites/`)

### Adding Tests

1. Place tests next to the module: `module-name.test.ts`
2. Use the custom `render` from `@/test/utils` for component tests (includes providers)
3. Run `npm test` to verify

## Conventions

- **Absolute imports**: Always use `@/` prefix
- **Barrel exports**: Every module directory has an `index.ts`
- **Component files**: PascalCase for components, kebab-case for filenames
- **No cross-feature imports**: Features are isolated silos

## Commits

Use [Conventional Commits](https://www.conventionalcommits.org/):

```
feat(data-table): add column resize support
fix(theme): correct HSL parsing in dark mode
refactor(core): extract validation schemas
```

Husky pre-commit hooks run ESLint and Prettier via `lint-staged`.
