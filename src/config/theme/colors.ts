/**
 * Color Tokens - Global Design System Colors
 * 
 * This module provides consistent color tokens for the entire application.
 * All text, backgrounds, and UI elements should use these tokens.
 * 
 * Design Principles:
 * - Light mode: Never pure black text (use dark gray)
 * - Dark mode: Never pure white text (use silver/gray tones)
 * - Primary color used sparingly for emphasis
 * - Muted colors for secondary content
 * 
 * RELATIONSHIP TO OTHER COLOR FILES:
 * 
 * - THIS FILE (colors.ts):
 *   - Uses `hsl(x, y%, z%)` format (CSS comma-separated)
 *   - Exports Tailwind utility classes (text-[hsl(...)], bg-[hsl(...)])
 *   - Used for inline styles and Tailwind arbitrary values
 *   - NOT used for CSS custom properties
 * 
 * - common-text-colors.ts:
 *   - Uses `x y% z%` format (HSL components without hsl() wrapper)
 *   - Spread into theme objects in themes/corecolors/*.ts
 *   - Converted to CSS custom properties (--text-primary, etc.)
 *   - Used by theme system for dynamic theming
 * 
 * - globals.css:
 *   - Defines fallback CSS custom properties
 *   - Values match common-text-colors.ts format
 *   - Ensures no flash before JavaScript loads
 */

export const colors = {
  light: {
    text: {
      primary: 'hsl(222.2, 47.4%, 11.2%)',
      secondary: 'hsl(215.4, 16.3%, 46.9%)',
      muted: 'hsl(215.4, 16.3%, 66.9%)',
      disabled: 'hsl(215.4, 16.3%, 76.9%)',
      inverse: 'hsl(210, 40%, 98%)',
    },
    background: {
      primary: 'hsl(0, 0%, 100%)',
      secondary: 'hsl(210, 40%, 96.1%)',
      tertiary: 'hsl(210, 40%, 92.1%)',
      elevated: 'hsl(0, 0%, 100%)',
    },
    border: {
      default: 'hsl(214.3, 31.8%, 91.4%)',
      hover: 'hsl(214.3, 31.8%, 81.4%)',
      focus: 'hsl(262.1, 83.3%, 57.8%)',
    },
    feedback: {
      success: 'hsl(142.1, 76.2%, 36.3%)',
      warning: 'hsl(38, 92%, 50%)',
      error: 'hsl(0, 84.2%, 60.2%)',
      info: 'hsl(199, 89%, 48%)',
    },
  },
  dark: {
    text: {
      primary: 'hsl(210, 20%, 90%)',
      secondary: 'hsl(215, 20%, 70%)',
      muted: 'hsl(215, 15%, 50%)',
      disabled: 'hsl(215, 10%, 35%)',
      inverse: 'hsl(222.2, 84%, 4.9%)',
    },
    background: {
      primary: 'hsl(222.2, 84%, 4.9%)',
      secondary: 'hsl(217.2, 32.6%, 12.5%)',
      tertiary: 'hsl(217.2, 32.6%, 17.5%)',
      elevated: 'hsl(222.2, 84%, 8%)',
    },
    border: {
      default: 'hsl(217.2, 32.6%, 20%)',
      hover: 'hsl(217.2, 32.6%, 30%)',
      focus: 'hsl(263.4, 70%, 50.4%)',
    },
    feedback: {
      success: 'hsl(142.1, 70%, 45%)',
      warning: 'hsl(38, 92%, 50%)',
      error: 'hsl(0, 72%, 51%)',
      info: 'hsl(199, 89%, 48%)',
    },
  },
}

export const textColors = {
  heading: {
    light: 'text-[hsl(222.2,47.4%,11.2%)]',
    dark: 'text-[hsl(210,20%,90%)]',
  },
  body: {
    light: 'text-[hsl(222.2,47.4%,20%)]',
    dark: 'text-[hsl(210,15%,85%)]',
  },
  secondary: {
    light: 'text-[hsl(215.4,16.3%,46.9%)]',
    dark: 'text-[hsl(215,20%,70%)]',
  },
  muted: {
    light: 'text-[hsl(215.4,16.3%,66.9%)]',
    dark: 'text-[hsl(215,15%,50%)]',
  },
  label: {
    light: 'text-[hsl(222.2,47.4%,25%)]',
    dark: 'text-[hsl(210,18%,80%)]',
  },
}

export const cssVariables = `
:root {
  --text-primary: ${colors.light.text.primary};
  --text-secondary: ${colors.light.text.secondary};
  --text-muted: ${colors.light.text.muted};
  --text-disabled: ${colors.light.text.disabled};
  --text-inverse: ${colors.light.text.inverse};
  
  --bg-primary: ${colors.light.background.primary};
  --bg-secondary: ${colors.light.background.secondary};
  --bg-tertiary: ${colors.light.background.tertiary};
  --bg-elevated: ${colors.light.background.elevated};
  
  --border-default: ${colors.light.border.default};
  --border-hover: ${colors.light.border.hover};
  --border-focus: ${colors.light.border.focus};
  
  --color-success: ${colors.light.feedback.success};
  --color-warning: ${colors.light.feedback.warning};
  --color-error: ${colors.light.feedback.error};
  --color-info: ${colors.light.feedback.info};
}

.dark {
  --text-primary: ${colors.dark.text.primary};
  --text-secondary: ${colors.dark.text.secondary};
  --text-muted: ${colors.dark.text.muted};
  --text-disabled: ${colors.dark.text.disabled};
  --text-inverse: ${colors.dark.text.inverse};
  
  --bg-primary: ${colors.dark.background.primary};
  --bg-secondary: ${colors.dark.background.secondary};
  --bg-tertiary: ${colors.dark.background.tertiary};
  --bg-elevated: ${colors.dark.background.elevated};
  
  --border-default: ${colors.dark.border.default};
  --border-hover: ${colors.dark.border.hover};
  --border-focus: ${colors.dark.border.focus};
  
  --color-success: ${colors.dark.feedback.success};
  --color-warning: ${colors.dark.feedback.warning};
  --color-error: ${colors.dark.feedback.error};
  --color-info: ${colors.dark.feedback.info};
}
`

export const textClasses = {
  h1: 'text-3xl font-bold tracking-tight text-[hsl(var(--text-primary))]',
  h2: 'text-2xl font-bold tracking-tight text-[hsl(var(--text-primary))]',
  h3: 'text-xl font-semibold text-[hsl(var(--text-primary))]',
  h4: 'text-lg font-semibold text-[hsl(var(--text-primary))]',
  h5: 'text-base font-semibold text-[hsl(var(--text-primary))]',
  h6: 'text-sm font-semibold text-[hsl(var(--text-primary))]',
  
  body: 'text-base text-[hsl(var(--text-primary))]',
  bodySecondary: 'text-base text-[hsl(var(--text-secondary))]',
  bodyMuted: 'text-sm text-[hsl(var(--text-muted))]',
  
  label: 'text-sm font-medium text-[hsl(var(--text-primary))]',
  labelSecondary: 'text-sm font-medium text-[hsl(var(--text-secondary))]',
  labelMuted: 'text-xs font-medium text-[hsl(var(--text-muted))]',
  
  caption: 'text-xs text-[hsl(var(--text-muted))]',
  captionSecondary: 'text-xs text-[hsl(var(--text-secondary))]',
  
  error: 'text-sm text-[hsl(var(--color-error))]',
  success: 'text-sm text-[hsl(var(--color-success))]',
  warning: 'text-sm text-[hsl(var(--color-warning))]',
  info: 'text-sm text-[hsl(var(--color-info))]',
}

export default colors
