# Input Component Workflow

## AI Reasoning: When to Use This Workflow

Use this workflow when:
- User asks to create a new input/form field
- User wants to add validation to an input
- User needs a specialized input (masked, formatted, etc.)

Do NOT use when:
- Creating non-input components → use [shared-components.md](./shared-components.md)
- Adding a new feature page → use [feature-creation.md](./feature-creation.md)

## Before Creating Any Input

**ALWAYS check existing inputs first:**

| Component | Location | Purpose |
|---|---|---|
| `Input` | `src/components/ui/input.tsx` | Basic text input |
| `SmartInput` | `src/components/ui/smart-input.tsx` | Validated input with live feedback |
| `SmartInputField` | `src/components/ui/smart-input-field.tsx` | Form field wrapper for RHF |
| `SecureSSNInput` | `src/components/ui/secure-ssn-input.tsx` | SSN with masking |
| `Select` | `src/components/ui/select.tsx` | Dropdown select |
| `Checkbox` | `src/components/ui/checkbox.tsx` | Checkbox |

## Creating a New Input

### Step 1: Check Existing Validators

Look in `src/core/validation/`:
```ts
import { emailSchema, passwordSchema, phoneSchema, urlSchema } from '@/core/validation'
```

### Step 2: Check Existing Formatters

Look in `src/config/theme/input-formatters.ts`:
```ts
import { formatters } from '@/config/theme/input-formatters'

formatters.phone('5551234567')
formatters.currency('1234.56')
formatters.ssn('123456789')
```

### Step 3: Create the Input Component

```tsx
// src/components/ui/[name]-input.tsx
'use client'

import * as React from 'react'
import { cn } from '@/core/utils'
import { Input } from './input'

export interface [Name]InputProps extends React.ComponentProps<typeof Input> {
  // Additional props
}

export function [Name]Input({ className, ...props }: [Name]InputProps) {
  return (
    <Input
      className={cn(/* input-specific styles */, className)}
      {...props}
    />
  )
}
```

### Step 4: Add Validator (if needed)

```ts
// src/core/validation/index.ts
export const [name]Schema = z.string()
  .[rule]('[error message]')
```

### Step 5: Add Formatter (if needed)

```ts
// src/config/theme/input-formatters.ts
export const format[Name] = (value: string): string => {
  // Formatting logic
}
```

### Step 6: Add to Design System

Add re-export to `src/design-system/primitives/index.ts` (or `composites/smart-input/index.ts`):
```ts
export * from '@/components/ui/[name]-input'
```

### Step 7: Add to Input Showcase

Update `src/app/(dashboard)/inputs/page.tsx` to demonstrate the new input.

## Using SmartInput (Recommended)

For validated inputs, use `SmartInput`:
```tsx
import { SmartInput } from '@/components/ui/smart-input'
import { emailSchema } from '@/core/validation'

<SmartInput
  label="Email Address"
  schema={emailSchema}
  placeholder="Enter your email"
  onValueChange={(value, isValid) => {
    if (isValid) { /* handle */ }
  }}
/>
```

## Styling Rules

```tsx
// GOOD — theme tokens
<input className="bg-background border-border text-foreground focus:ring-ring" />

// BAD — hardcoded colors
<input className="bg-white border-gray-300 text-black focus:ring-blue-500" />
```

Use style tokens from `src/config/theme/input-styles.ts`:
```ts
import { inputVariants, inputStyles } from '@/config/theme/input-styles'
```

## Checklist

- [ ] Check existing inputs — don't duplicate
- [ ] Check existing Zod schemas in `src/core/validation/`
- [ ] Create component in `src/components/ui/`
- [ ] Add validator to `src/core/validation/` if needed
- [ ] Add formatter to `src/config/theme/input-formatters.ts` if needed
- [ ] Add re-export to design-system barrel
- [ ] Add to inputs showcase page
- [ ] Uses theme tokens exclusively

## Related Workflows

- [master-workflow.md](./master-workflow.md) — Decision tree
- [shared-components.md](./shared-components.md) — Component patterns
- [theming.md](./theming.md) — Styling with tokens
