# Theming Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User asks to change colors, add tokens, or modify styling
- User creates a component and needs to know which tokens to use
- User reports hardcoded colors or theme inconsistencies

Do NOT use when:
- Creating a component (use [shared-components.md](./shared-components.md), then reference this)
- Adding a feature page → use [feature-creation.md](./feature-creation.md)

## Theme System Architecture

Theme files live in `src/config/theme/`:
```
src/config/theme/
├── index.ts               # Master barrel
├── types.ts               # ThemeColors, Theme interfaces
├── themes.ts              # Theme definitions (blue, slate, etc.)
├── colors.ts              # Color utilities
├── common-text-colors.ts  # Text color tokens
├── input-formatters.ts    # Input formatting functions
├── input-styles.ts        # Input style tokens
├── input-validators.ts    # Validation patterns
├── shadows.ts             # Shadow tokens
├── surfaces.ts            # Surface/background tokens
├── radius.ts              # Border radius tokens
├── scrollbar.ts           # Scrollbar styling
├── typography.ts          # Typography tokens
└── corecolors/            # Individual color definitions
    ├── blue.ts
    ├── slate.ts
    └── ...
```

## Using Theme Tokens

### In Tailwind Classes (Preferred)

```tsx
// GOOD — semantic classes
<div className="bg-background text-foreground border-border">
<button className="bg-primary text-primary-foreground">
<span className="text-muted-foreground">

// BAD — hardcoded
<div className="bg-white text-black border-gray-200">
```

### Available CSS Variables

```css
/* Core */
--background, --foreground
--card, --card-foreground
--primary, --primary-foreground
--secondary, --secondary-foreground
--muted, --muted-foreground
--accent, --accent-foreground
--destructive, --destructive-foreground
--border, --input, --ring

/* Sidebar */
--sidebar, --sidebar-foreground
--sidebar-primary, --sidebar-primary-foreground
--sidebar-accent, --sidebar-border, --sidebar-ring

/* Gradient */
--gradient-bg-1 through --gradient-bg-4

/* Text */
--text-primary, --text-secondary, --text-muted, --text-disabled

/* Surface */
--bg-primary, --bg-secondary, --bg-tertiary, --bg-elevated

/* Feedback */
--color-success, --color-warning, --color-error, --color-info

/* FX */
--fx-tech-glow, --fx-tech-border, --fx-neon-glow
```

### In JS/TS Code

```tsx
import { theme } from '@/config/theme'

// Typography tokens
const { heading, body } = theme.typography

// Shadow tokens
const { sm, md, lg } = theme.shadows
```

## Adding New Theme Tokens

### 1. Add to ThemeColors Interface
```ts
// src/config/theme/types.ts
export interface ThemeColors {
  // ... existing
  newToken: string
  newTokenForeground: string
}
```

### 2. Add to All Theme Definitions
```ts
// src/config/theme/themes.ts
const blueTheme: Theme = {
  light: {
    newToken: 'hsl(220, 100%, 50%)',
    newTokenForeground: 'hsl(0, 0%, 100%)',
  },
  dark: {
    newToken: 'hsl(220, 100%, 60%)',
    newTokenForeground: 'hsl(0, 0%, 100%)',
  },
}
```

### 3. Apply as CSS Variable
Variables are applied via the theme provider. No manual CSS needed.

## Design Token Access Paths

| Import From | Use Case |
|---|---|
| `@/config/theme` | Direct theme config access |
| `@/design-system/tokens` | Via design-system barrel |
| Tailwind classes | Component styling (preferred) |

## Checklist

- [ ] No hardcoded hex/rgb/hsl colors
- [ ] Using CSS variables via `hsl(var(--token))` or Tailwind classes
- [ ] New tokens added to `types.ts` AND all theme definitions in `themes.ts`
- [ ] Checking `config/theme/types.ts` for available tokens before creating new ones

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Rules and decision tree
- [shared-components.md](./shared-components.md) — Component patterns
- [input-components.md](./input-components.md) — Input styling
