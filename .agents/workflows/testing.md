# Testing Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User asks to add/modify tests
- You just created a new module and need to add tests
- A test is failing and needs debugging

## Test Infrastructure

| File | Purpose |
|---|---|
| `vitest.config.ts` | Vitest config with jsdom, path aliases, setup |
| `src/test/setup.ts` | Imports `@testing-library/jest-dom` matchers |
| `src/test/utils.tsx` | Custom `render` wrapper with all providers |

## Commands

```bash
npm test           # Watch mode
npm run test:ci    # Single run (CI)
```

## Test File Placement

Tests are **co-located** next to their source files:

```
src/core/format/
├── index.ts        # Source
└── format.test.ts  # Tests

src/features/students/
├── students.tsx       # Source
└── students.test.tsx  # Tests
```

Naming: `[name].test.ts` (or `.test.tsx` for components).

## Writing Unit Tests

```ts
// src/core/validation/validation.test.ts
import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidUrl } from './index'

describe('isValidEmail', () => {
  it('accepts valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
  })

  it('rejects invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false)
  })
})
```

## Writing Component Tests

Use the custom `render` from `@/test/utils` — it wraps components in all required providers:

```tsx
// src/features/students/students.test.tsx
import { describe, it, expect } from 'vitest'
import { render, screen } from '@/test/utils'
import { Students } from './students'

describe('Students', () => {
  it('renders the student list', () => {
    render(<Students />)
    expect(screen.getByRole('table')).toBeInTheDocument()
  })
})
```

## Test Patterns

### Floating-Point Assertions
```ts
// Use toBeCloseTo for floating-point comparisons
expect(formatPercent(0.1234)).toBe('12.34%')  // string comparison is fine
```

### Date/Timezone Safety
```ts
// Use UTC dates to avoid timezone failures in CI
const date = new Date('2024-01-15T12:00:00Z')
```

### localStorage Mocking
```ts
// localStorage is auto-available in jsdom
// The storage module handles SSR checks internally
```

## What to Test

| Module Type | Test Focus |
|---|---|
| `core/` utilities | Pure function input/output |
| `core/` validation | Valid/invalid input cases |
| Components | Renders, interactions, a11y |
| Stores | State transitions |
| Features | Integration with providers |

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Build validation checklist
- [feature-creation.md](./feature-creation.md) — Adding tests to features
