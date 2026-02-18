# CSS Modularization & Theming Unification Plan

## Executive Summary

This document outlines a comprehensive migration plan to modularize the monolithic `globals.css` (~1074 lines) into a maintainable, modular CSS architecture while unifying the theming system to eliminate token duplication.

## Current State Analysis

### File Locations

| Component | Location | Lines | Purpose |
|-----------|----------|-------|---------|
| Global CSS | `src/app/globals.css` | ~1074 | All styles in one file |
| Theme Definitions | `themes/corecolors/*.ts` | ~2000 | 17 color theme presets |
| Theme Types | `themes/types.ts` | 119 | TypeScript interfaces |
| Theme Server | `src/lib/theme-server.ts` | 129 | Server-side theme CSS generation |
| Theme Init Script | `src/lib/theme-init-script.ts` | ? | Client-side theme injection |

### Current Problems

1. **Monolithic CSS**: Single 1074-line file with 8+ distinct concerns
2. **Token Duplication**: Same HSL values in 3 places (themes/*.ts, globals.css, theme-server.ts)
3. **Inconsistent Patterns**: Some tokens are CSS variables (`--sidebar-border`), others are JS objects
4. **Maintenance Burden**: Adding a new token requires updates in 3+ locations
5. **No CSS Design Tokens**: `themes/shadows.ts`, `themes/radius.ts` exist but aren't CSS variables

### Current globals.css Structure

```
Lines 1-114:     Header comments
Lines 115-180:   Scrollbar system (65 lines)
Lines 182-235:   @theme inline (Tailwind v4 tokens)
Lines 237-453:   :root and .dark defaults (216 lines) - DUPLICATES
Lines 455-461:   Global border removal
Lines 463-483:   Glow effect system
Lines 485-549:   Glass effects, gradual blur
Lines 551-598:   Sidebar base transparency
Lines 599-656:   Animated gradient background
Lines 658-875:   Transparency enforcement ("nuclear option")
Lines 876-1074:  More sidebar rules, responsive, utilities
```

---

## Target Architecture

### New File Structure

```
src/
├── app/
│   └── globals.css              # Main import file (~50 lines)
│
├── styles/
│   ├── index.css                # Re-exports all modules
│   │
│   ├── tokens/
│   │   ├── _index.css           # Token imports
│   │   ├── _colors.css          # Color CSS custom properties
│   │   ├── _typography.css      # Font tokens
│   │   ├── _spacing.css         # Spacing/sizing tokens
│   │   ├── _effects.css         # Shadow, blur, glow tokens
│   │   └── _radius.css          # Border radius tokens
│   │
│   ├── base/
│   │   ├── _index.css           # Base imports
│   │   ├── _reset.css           # CSS reset/normalize
│   │   ├── _html-body.css       # HTML/body styles
│   │   └── _scrollbar.css       # Scrollbar system
│   │
│   ├── components/
│   │   ├── _index.css           # Component imports
│   │   ├── _sidebar.css         # Sidebar transparency rules
│   │   ├── _shell.css           # Shell glass effects
│   │   └── _divider.css         # Sidebar divider styles
│   │
│   ├── effects/
│   │   ├── _index.css           # Effects imports
│   │   ├── _glow.css            # Glow effect system
│   │   ├── _glass.css           # Glassmorphism utilities
│   │   └── _blur.css            # Gradual blur effects
│   │
│   └── animations/
│       ├── _index.css           # Animation imports
│       ├── _gradients.css       # Animated gradient backgrounds
│       └── _keyframes.css       # @keyframes definitions
│
themes/
├── tokens/
│   ├── index.ts                 # Re-export all tokens
│   ├── colors.ts                # -> MOVED from corecolors/
│   ├── shadows.ts               # Already exists
│   ├── radius.ts                # Already exists
│   ├── spacing.ts               # NEW
│   ├── typography.ts            # Already exists (enhance)
│   └── effects.ts               # NEW: glow, blur tokens
│
└── css-generator.ts             # NEW: Single source for CSS generation
```

---

## Migration Phases

### Phase 1: Preparation (No Breaking Changes)

**Goal**: Set up infrastructure without touching existing code

#### Tasks

1. **Create `src/styles/` directory structure**
   ```bash
   mkdir -p src/styles/{tokens,base,components,effects,animations}
   ```

2. **Create `themes/tokens/` directory**
   ```bash
   mkdir -p themes/tokens
   ```

3. **Create index files for each module**
   - Each `_index.css` should import its siblings
   - Use CSS `@import` or `@use` (Tailwind v4 compatible)

4. **Create `themes/css-generator.ts`**
   - Single source of truth for CSS variable generation
   - Used by both `theme-server.ts` and `theme-init-script.ts`

#### Files to Create

- [ ] `src/styles/index.css`
- [ ] `src/styles/tokens/_index.css`
- [ ] `src/styles/base/_index.css`
- [ ] `src/styles/components/_index.css`
- [ ] `src/styles/effects/_index.css`
- [ ] `src/styles/animations/_index.css`
- [ ] `themes/tokens/index.ts`
- [ ] `themes/css-generator.ts`

---

### Phase 2: Extract Base Styles

**Goal**: Move non-theme-dependent styles to modular files

#### 2.1 Scrollbar System

**Source**: `globals.css` lines 115-180

**Target**: `src/styles/base/_scrollbar.css`

```css
/* src/styles/base/_scrollbar.css */

/**
 * Scrollbar System
 * Hides scrollbars while maintaining scroll functionality
 * 
 * WHY HIDE: Clean visual appearance for floating shell design
 * DO NOT: Re-enable visible scrollbars
 */

html::-webkit-scrollbar-track,
body::-webkit-scrollbar-track {
  background: transparent !important;
}

*::-webkit-scrollbar {
  width: 0 !important;
  height: 0 !important;
  opacity: 0 !important;
  background: transparent !important;
}

*::-webkit-scrollbar-button,
*::-webkit-scrollbar-button:vertical:start:decrement,
*::-webkit-scrollbar-button:vertical:end:increment,
*::-webkit-scrollbar-button:horizontal:start:decrement,
*::-webkit-scrollbar-button:horizontal:end:increment {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
  opacity: 0 !important;
  background: transparent !important;
}

*::-webkit-scrollbar-track {
  background: var(--scrollbar-track, transparent);
}

*::-webkit-scrollbar-thumb {
  background-color: hsl(var(--primary) / 0.5) !important;
  border-radius: var(--scrollbar-radius, 4px);
  box-shadow: 0 0 8px hsl(var(--primary) / 0.3) !important;
}

*::-webkit-scrollbar-thumb:hover {
  background-color: hsl(var(--primary) / 0.8) !important;
  box-shadow: 0 0 12px hsl(var(--primary) / 0.5) !important;
}

*::-webkit-scrollbar-thumb:active {
  background-color: hsl(var(--primary)) !important;
}

*::-webkit-scrollbar-corner {
  background: transparent;
}

.scrollable-container::-webkit-scrollbar {
  display: none !important;
  width: 0 !important;
  height: 0 !important;
}

.scrollable-container {
  -ms-overflow-style: none !important;
  scrollbar-width: none !important;
  overflow-y: auto !important;
}
```

#### 2.2 HTML/Body Base

**Source**: `globals.css` lines 678-687 + border reset

**Target**: `src/styles/base/_html-body.css`

```css
/* src/styles/base/_html-body.css */

/**
 * HTML/Body Base Styles
 */

html {
  scrollbar-gutter: stable;
  background-color: hsl(var(--background));
}

body {
  background: transparent;
  overflow: hidden !important;
  height: 100vh !important;
  color: hsl(var(--foreground));
}

/* Global border removal - prevents unwanted lines */
* {
  border: none !important;
}
```

#### 2.3 CSS Reset

**Target**: `src/styles/base/_reset.css`

```css
/* src/styles/base/_reset.css */

/**
 * Minimal CSS Reset
 * Only includes what's not covered by Tailwind
 */

/* Prevent focus outline removal for accessibility */
:focus-visible {
  outline: 2px solid hsl(var(--ring));
  outline-offset: 2px;
}

/* Remove default margins */
body,
h1,
h2,
h3,
h4,
h5,
h6,
p,
ul,
ol,
figure {
  margin: 0;
}

/* Box sizing */
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

#### Files to Create

- [ ] `src/styles/base/_scrollbar.css`
- [ ] `src/styles/base/_html-body.css`
- [ ] `src/styles/base/_reset.css`
- [ ] Update `src/styles/base/_index.css` to import all

---

### Phase 3: Extract Effect Styles

**Goal**: Move effect-related styles to dedicated modules

#### 3.1 Glow Effects

**Source**: `globals.css` lines 463-483

**Target**: `src/styles/effects/_glow.css`

```css
/* src/styles/effects/_glow.css */

/**
 * Glow Effect System
 * Mouse-following edge glow for the floating shell
 */

.glow-enabled {
  box-shadow: 0 0 15px 0px hsl(var(--primary) / 0.05) !important;
  transition: box-shadow 0.3s ease;
}

.glow-enabled:hover {
  box-shadow: 0 0 25px 0px hsl(var(--primary) / 0.1) !important;
}

@media (prefers-reduced-motion: reduce) {
  .glow-enabled {
    transition: none;
  }
}
```

#### 3.2 Glass Effects

**Source**: `globals.css` lines 485-549

**Target**: `src/styles/effects/_glass.css`

```css
/* src/styles/effects/_glass.css */

/**
 * Glass Effect Utilities
 */

.shell-glass {
  background-color: hsl(var(--background) / 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 -1px 0 0 hsl(var(--border) / 0.4);
}

.dark .shell-glass {
  background-color: hsl(var(--background) / 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: inset 0 -1px 0 0 hsl(var(--border) / 0.1);
}

.glass-extreme {
  backdrop-filter: blur(24px) saturate(200%) contrast(125%);
  -webkit-backdrop-filter: blur(24px) saturate(200%) contrast(125%);
}

.gradual-blur {
  isolation: isolate;
}

.gradual-blur-inner {
  position: relative;
  width: 100%;
  height: 100%;
}

.gradual-blur-inner > div {
  -webkit-backdrop-filter: inherit;
  backdrop-filter: inherit;
}

@supports not (backdrop-filter: blur(1px)) {
  .gradual-blur-inner > div {
    background: hsl(var(--background) / 0.5);
  }
}
```

#### Files to Create

- [ ] `src/styles/effects/_glow.css`
- [ ] `src/styles/effects/_glass.css`
- [ ] `src/styles/effects/_blur.css`
- [ ] Update `src/styles/effects/_index.css`

---

### Phase 4: Extract Animation Styles

**Goal**: Move animations and gradients to dedicated modules

#### 4.1 Animated Gradients

**Source**: `globals.css` lines 599-656

**Target**: `src/styles/animations/_gradients.css`

```css
/* src/styles/animations/_gradients.css */

/**
 * Animated Gradient Background
 * Used by AnimatedBackground component
 */

.animated-gradient-bg {
  background: linear-gradient(
    135deg,
    hsl(var(--gradient-bg-1) / 0.4) 0%,
    hsl(var(--background)) 20%,
    hsl(var(--gradient-bg-2) / 0.5) 40%,
    hsl(var(--background)) 60%,
    hsl(var(--gradient-bg-3) / 0.4) 80%,
    hsl(var(--background)) 100%
  );
  background-size: 400% 400%;
}

.dark .animated-gradient-bg {
  background: linear-gradient(
    135deg,
    hsl(var(--gradient-bg-1) / 0.2) 0%,
    hsl(var(--background)) 20%,
    hsl(var(--gradient-bg-2) / 0.3) 40%,
    hsl(var(--background)) 60%,
    hsl(var(--gradient-bg-3) / 0.2) 80%,
    hsl(var(--background)) 100%
  );
  background-size: 300% 300%;
}
```

#### 4.2 Keyframes

**Source**: `globals.css` lines 626-646

**Target**: `src/styles/animations/_keyframes.css`

```css
/* src/styles/animations/_keyframes.css */

/**
 * Animation Keyframes
 */

@keyframes gradient-shift {
  0% {
    background-position: 0% 100%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 0%;
  }
  75% {
    background-position: 100% 100%;
  }
  100% {
    background-position: 0% 100%;
  }
}

.animate-gradient-shift {
  animation: gradient-shift 30s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .animate-gradient-shift {
    animation: none;
  }
}
```

#### Files to Create

- [ ] `src/styles/animations/_gradients.css`
- [ ] `src/styles/animations/_keyframes.css`
- [ ] Update `src/styles/animations/_index.css`

---

### Phase 5: Extract Component Styles

**Goal**: Move component-specific styles

#### 5.1 Sidebar Styles

**Source**: `globals.css` lines 551-598, 658-875

**Target**: `src/styles/components/_sidebar.css`

```css
/* src/styles/components/_sidebar.css */

/**
 * Sidebar Transparency System
 * 
 * WHY: The animated gradient background must be visible through sidebars
 * 
 * CRITICAL DESIGN DECISIONS:
 * - All backgrounds forced transparent via !important
 * - Separators excluded to allow gradient dividers
 * - Mobile sheets also transparent
 */

/* ============================================================================
   LEFT SIDEBAR
   ============================================================================ */

[data-sidebar="sidebar"],
[data-slot="sidebar-inner"] {
  background: transparent !important;
  border: none !important;
}

/* ============================================================================
   RIGHT SIDEBAR
   ============================================================================ */

[data-sidebar="sidebar"],
[data-right-sidebar="sidebar"],
[data-right-sidebar="container"],
[data-right-sidebar="sidebar"] [data-slot="sidebar-inner"],
.bg-right-sidebar,
div[class*="right-sidebar"] {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* ============================================================================
   SIDEBAR BACKGROUND CLASS OVERRIDES
   ============================================================================ */

.bg-sidebar,
.bg-sidebar-accent,
.bg-sidebar-foreground,
.bg-sidebar-border,
.bg-sidebar-primary,
.bg-sidebar-primary-foreground,
.bg-sidebar-accent-foreground,
[data-sidebar] [class*="bg-sidebar"] {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Right sidebar background overrides */
.bg-right-sidebar,
[data-right-sidebar] [class*="bg-"],
[data-right-sidebar="sidebar"] [class*="bg-"],
[data-right-sidebar*="sidebar"] [class*="bg-"] {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* CSS variable overrides */
[data-sidebar*="sidebar"],
[data-right-sidebar*="sidebar"] {
  --sidebar-background: transparent !important;
  --right-sidebar-background: transparent !important;
  --sidebar-accent: transparent !important;
  --right-sidebar-accent: transparent !important;
}

/* ============================================================================
   SIDEBAR CHILDREN TRANSPARENCY
   ============================================================================ */

/* Direct children */
[data-sidebar="sidebar"] > *,
[data-right-sidebar="sidebar"] > * {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* Nested content */
[data-slot="sidebar-inner"] > *,
[data-right-sidebar="sidebar"] [data-slot="sidebar-inner"] > *,
[data-sidebar="sidebar"] > * > *,
[data-right-sidebar="sidebar"] > * > *,
[data-sidebar*="sidebar"] * [class*="shadow-"],
[data-right-sidebar*="sidebar"] * [class*="shadow-"] {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  text-shadow: none !important;
}

/* Force border removal - EXCLUDE SEPARATORS */
[data-sidebar="sidebar"],
[data-right-sidebar="sidebar"],
[data-sidebar="sidebar"] *:not([data-sidebar="separator"]),
[data-right-sidebar="sidebar"] *:not([data-sidebar="separator"]) {
  border-color: transparent !important;
  border-right: none !important;
  border-left: none !important;
  background-color: transparent !important;
}

/* All sidebar children - EXCLUDE SEPARATORS */
[data-sidebar="sidebar"] *:not([data-sidebar="separator"]),
[data-right-sidebar="sidebar"] *:not([data-sidebar="separator"]) {
  border-color: transparent !important;
  background-color: transparent !important;
  box-shadow: none !important;
}

/* ============================================================================
   SIDEBAR WRAPPER & CONTAINER
   ============================================================================ */

[data-slot="sidebar-wrapper"],
[data-slot="sidebar-container"] {
  background: transparent !important;
  background-color: transparent !important;
  background-image: none !important;
  border: none !important;
  box-shadow: none !important;
}

/* ============================================================================
   SHEET (MOBILE SIDEBAR)
   ============================================================================ */

[data-slot="sheet-content"],
[data-slot="sheet-overlay"],
[data-radix-slot="sheet-content"] {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* ============================================================================
   MAIN CONTENT AREA
   ============================================================================ */

[data-slot="main-content-area"] {
  background: transparent !important;
}

.flex.flex-1.flex-col {
  background: transparent !important;
}

/* Flex containers */
.flex.min-h-svh,
main {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
```

#### 5.2 Divider Styles

**Target**: `src/styles/components/_divider.css`

```css
/* src/styles/components/_divider.css */

/**
 * Sidebar Divider Styles
 * 
 * Separators use gradient effects and must be excluded
 * from transparency rules
 */

[data-sidebar="separator"] {
  background: transparent !important;
}

[data-sidebar="separator"] * {
  background-color: unset !important;
  box-shadow: unset !important;
}
```

#### Files to Create

- [ ] `src/styles/components/_sidebar.css`
- [ ] `src/styles/components/_divider.css`
- [ ] Update `src/styles/components/_index.css`

---

### Phase 6: Token CSS Generation

**Goal**: Single source of truth for CSS tokens

#### 6.1 Create CSS Generator

**Target**: `themes/css-generator.ts`

```typescript
// themes/css-generator.ts

import { Theme, ThemeColors } from './types'

/**
 * Generates CSS custom properties from theme colors
 * 
 * This is the SINGLE SOURCE OF TRUTH for CSS variable generation.
 * Used by:
 * - theme-server.ts (server-side)
 * - theme-init-script.ts (client-side)
 */
export function generateCSSFromColors(colors: ThemeColors): string {
  const tokens: Record<keyof ThemeColors, string> = {
    background: `--background: ${colors.background};`,
    foreground: `--foreground: ${colors.foreground};`,
    card: `--card: ${colors.card};`,
    cardForeground: `--card-foreground: ${colors.cardForeground};`,
    popover: `--popover: ${colors.popover};`,
    popoverForeground: `--popover-foreground: ${colors.popoverForeground};`,
    primary: `--primary: ${colors.primary};`,
    primaryForeground: `--primary-foreground: ${colors.primaryForeground};`,
    secondary: `--secondary: ${colors.secondary};`,
    secondaryForeground: `--secondary-foreground: ${colors.secondaryForeground};`,
    muted: `--muted: ${colors.muted};`,
    mutedForeground: `--muted-foreground: ${colors.mutedForeground};`,
    accent: `--accent: ${colors.accent};`,
    accentForeground: `--accent-foreground: ${colors.accentForeground};`,
    destructive: `--destructive: ${colors.destructive};`,
    destructiveForeground: `--destructive-foreground: ${colors.destructiveForeground};`,
    border: `--border: ${colors.border};`,
    input: `--input: ${colors.input};`,
    ring: `--ring: ${colors.ring};`,
    gradientFrom: `--gradient-from: ${colors.gradientFrom};`,
    gradientTo: `--gradient-to: ${colors.gradientTo};`,
    chart1: `--chart-1: ${colors.chart1};`,
    chart2: `--chart-2: ${colors.chart2};`,
    chart3: `--chart-3: ${colors.chart3};`,
    chart4: `--chart-4: ${colors.chart4};`,
    chart5: `--chart-5: ${colors.chart5};`,
    chart6: `--chart-6: ${colors.chart6};`,
    chart7: `--chart-7: ${colors.chart7};`,
    chart8: `--chart-8: ${colors.chart8};`,
    chart9: `--chart-9: ${colors.chart9};`,
    chart10: `--chart-10: ${colors.chart10};`,
    chart11: `--chart-11: ${colors.chart11};`,
    chart12: `--chart-12: ${colors.chart12};`,
    sidebar: `--sidebar: ${colors.sidebar};`,
    sidebarForeground: `--sidebar-foreground: ${colors.sidebarForeground};`,
    sidebarPrimary: `--sidebar-primary: ${colors.sidebarPrimary};`,
    sidebarPrimaryForeground: `--sidebar-primary-foreground: ${colors.sidebarPrimaryForeground};`,
    sidebarAccent: `--sidebar-accent: ${colors.sidebarAccent};`,
    sidebarAccentForeground: `--sidebar-accent-foreground: ${colors.sidebarAccentForeground};`,
    sidebarBorder: `--sidebar-border: ${colors.sidebarBorder};`,
    sidebarRing: `--sidebar-ring: ${colors.sidebarRing};`,
    radius: `--radius: ${colors.radius};`,
    scrollbarThumb: `--scrollbar-thumb: ${colors.scrollbarThumb};`,
    scrollbarTrack: `--scrollbar-track: ${colors.scrollbarTrack};`,
    scrollbarThumbHover: `--scrollbar-thumb-hover: ${colors.scrollbarThumbHover};`,
    scrollbarThumbActive: `--scrollbar-thumb-active: ${colors.scrollbarThumbActive};`,
    gradientBg1: `--gradient-bg-1: ${colors.gradientBg1};`,
    gradientBg2: `--gradient-bg-2: ${colors.gradientBg2};`,
    gradientBg3: `--gradient-bg-3: ${colors.gradientBg3};`,
    gradientBg4: `--gradient-bg-4: ${colors.gradientBg4};`,
    chartInst1: `--chart-inst-1: ${colors.chartInst1};`,
    chartInst2: `--chart-inst-2: ${colors.chartInst2};`,
    chartInst3: `--chart-inst-3: ${colors.chartInst3};`,
    chartInst4: `--chart-inst-4: ${colors.chartInst4};`,
    chartInst5: `--chart-inst-5: ${colors.chartInst5};`,
    chartInst6: `--chart-inst-6: ${colors.chartInst6};`,
    chartInst7: `--chart-inst-7: ${colors.chartInst7};`,
    chartInst8: `--chart-inst-8: ${colors.chartInst8};`,
    chartInst9: `--chart-inst-9: ${colors.chartInst9};`,
    chartInst10: `--chart-inst-10: ${colors.chartInst10};`,
    chartInst11: `--chart-inst-11: ${colors.chartInst11};`,
    chartInst12: `--chart-inst-12: ${colors.chartInst12};`,
    chartInst13: `--chart-inst-13: ${colors.chartInst13};`,
    chartInst14: `--chart-inst-14: ${colors.chartInst14};`,
    chartInst15: `--chart-inst-15: ${colors.chartInst15};`,
    chartInst16: `--chart-inst-16: ${colors.chartInst16};`,
    section: `--section: ${colors.section};`,
    sectionBorder: `--section-border: ${colors.sectionBorder};`,
    textPrimary: `--text-primary: ${colors.textPrimary};`,
    textSecondary: `--text-secondary: ${colors.textSecondary};`,
    textMuted: `--text-muted: ${colors.textMuted};`,
    textDisabled: `--text-disabled: ${colors.textDisabled};`,
    textInverse: `--text-inverse: ${colors.textInverse};`,
    bgPrimary: `--bg-primary: ${colors.bgPrimary};`,
    bgSecondary: `--bg-secondary: ${colors.bgSecondary};`,
    bgTertiary: `--bg-tertiary: ${colors.bgTertiary};`,
    bgElevated: `--bg-elevated: ${colors.bgElevated};`,
    borderHover: `--border-hover: ${colors.borderHover};`,
    borderFocus: `--border-focus: ${colors.borderFocus};`,
    colorSuccess: `--color-success: ${colors.colorSuccess};`,
    colorWarning: `--color-warning: ${colors.colorWarning};`,
    colorError: `--color-error: ${colors.colorError};`,
    colorInfo: `--color-info: ${colors.colorInfo};`,
    consoleButtonSize: `--console-button-size: ${colors.consoleButtonSize};`,
    consoleIconSize: `--console-icon-size: ${colors.consoleIconSize};`,
    consoleSpreadRadius: `--console-spread-radius: ${colors.consoleSpreadRadius};`,
  }

  return Object.values(tokens).join('\n    ')
}

/**
 * Generate full CSS block for a theme mode
 */
export function generateThemeCSS(theme: Theme, isDark: boolean): string {
  const colors = isDark ? theme.dark : theme.light
  const selector = isDark ? '.dark' : ':root'
  const colorScheme = isDark ? 'dark' : 'light'

  return `
${selector} {
  --header-height: 4rem;
  ${generateCSSFromColors(colors)}
  /* FX tech colors - dynamically reference primary */
  --fx-tech-glow: var(--primary);
  --fx-tech-line: var(--primary);
  --fx-tech-border: var(--primary);
  color-scheme: ${colorScheme};
}
`
}
```

#### 6.2 Update theme-server.ts

Refactor to use the new generator:

```typescript
// src/lib/theme-server.ts

import { cookies } from 'next/headers'
import { themes, defaultTheme } from '../../themes/themes'
import { generateCSSFromColors } from '../../themes/css-generator'

export const THEME_COOKIE = 'color-scheme'
export const DARK_MODE_COOKIE = 'theme'

// ... rest of the file

export function generateThemeCSS(colors: Record<string, string>): string {
  return generateCSSFromColors(colors as ThemeColors)
}
```

#### Files to Create/Modify

- [ ] `themes/css-generator.ts` (NEW)
- [ ] `src/lib/theme-server.ts` (MODIFY to use generator)
- [ ] `src/lib/theme-init-script.ts` (MODIFY to use generator)

---

### Phase 7: Create New globals.css

**Goal**: Replace monolithic file with clean imports

**Target**: `src/app/globals.css`

```css
/**
 * @fileoverview Global Styles Entry Point
 * 
 * This file imports all modular CSS files.
 * DO NOT add styles directly here - use the appropriate module.
 * 
 * @see docs/theming/CSS-Modularization-Migration-Plan.md
 */

@import "tailwindcss";

/* Design Tokens - Tailwind v4 integration */
@import "../styles/tokens";

/* Base Styles */
@import "../styles/base";

/* Effects */
@import "../styles/effects";

/* Animations */
@import "../styles/animations";

/* Component Styles */
@import "../styles/components";

/* ============================================================================
   TAILWIND V4 THEME CONFIGURATION
   Maps CSS variables to Tailwind utility classes
   ============================================================================ */

@custom-variant dark (&:is(.dark *));

@theme inline {
  /* Colors */
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-card: hsl(var(--card));
  --color-card-foreground: hsl(var(--card-foreground));
  --color-popover: hsl(var(--popover));
  --color-popover-foreground: hsl(var(--popover-foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
  --color-secondary: hsl(var(--secondary));
  --color-secondary-foreground: hsl(var(--secondary-foreground));
  --color-muted: hsl(var(--muted));
  --color-muted-foreground: hsl(var(--muted-foreground));
  --color-accent: hsl(var(--accent));
  --color-accent-foreground: hsl(var(--accent-foreground));
  --color-destructive: hsl(var(--destructive));
  --color-destructive-foreground: hsl(var(--destructive-foreground));
  --color-border: hsl(var(--border));
  --color-input: hsl(var(--input));
  --color-ring: hsl(var(--ring));
  
  /* Sidebar Colors */
  --color-sidebar: hsl(var(--sidebar));
  --color-sidebar-foreground: hsl(var(--sidebar-foreground));
  --color-sidebar-primary: hsl(var(--sidebar-primary));
  --color-sidebar-primary-foreground: hsl(var(--sidebar-primary-foreground));
  --color-sidebar-accent: hsl(var(--sidebar-accent));
  --color-sidebar-accent-foreground: hsl(var(--sidebar-accent-foreground));
  --color-sidebar-border: hsl(var(--sidebar-border));
  --color-sidebar-ring: hsl(var(--sidebar-ring));
  
  /* Chart Colors */
  --color-chart-1: hsl(var(--chart-1));
  --color-chart-2: hsl(var(--chart-2));
  --color-chart-3: hsl(var(--chart-3));
  --color-chart-4: hsl(var(--chart-4));
  --color-chart-5: hsl(var(--chart-5));
  --color-chart-6: hsl(var(--chart-6));
  --color-chart-7: hsl(var(--chart-7));
  --color-chart-8: hsl(var(--chart-8));
  --color-chart-9: hsl(var(--chart-9));
  --color-chart-10: hsl(var(--chart-10));
  --color-chart-11: hsl(var(--chart-11));
  --color-chart-12: hsl(var(--chart-12));
  
  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --radius-2xl: calc(var(--radius) + 8px);
  --radius-3xl: calc(var(--radius) + 12px);
  --radius-4xl: calc(var(--radius) + 16px);
  
  /* Fonts */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
}

/* ============================================================================
   THEME DEFAULTS (FALLBACKS)
   
   These are CRITICAL fallbacks that prevent white flash before JavaScript.
   Theme colors are INJECTED via blocking script - see layout.tsx.
   
   DO NOT add additional colors here - use themes/*.ts
   ============================================================================ */

/*
 * MINIMAL FALLBACKS ONLY
 * Full theme colors come from themes/corecolors/*.ts via theme-init-script
 * These are just to prevent flash of unstyled content
 */
:root {
  --header-height: 4rem;
  color-scheme: light;
}

.dark {
  color-scheme: dark;
}
```

---

### Phase 8: Create Index Files

#### `src/styles/index.css`

```css
/* src/styles/index.css */
@import './tokens';
@import './base';
@import './effects';
@import './animations';
@import './components';
```

#### `src/styles/tokens/_index.css`

```css
/* src/styles/tokens/_index.css */
/* Token modules - currently empty as tokens come from theme system */
/* Future: Add static design tokens here (spacing, sizing, etc.) */
```

#### `src/styles/base/_index.css`

```css
/* src/styles/base/_index.css */
@import './reset';
@import './html-body';
@import './scrollbar';
```

#### `src/styles/effects/_index.css`

```css
/* src/styles/effects/_index.css */
@import './glow';
@import './glass';
@import './blur';
```

#### `src/styles/animations/_index.css`

```css
/* src/styles/animations/_index.css */
@import './keyframes';
@import './gradients';
```

#### `src/styles/components/_index.css`

```css
/* src/styles/components/_index.css */
@import './sidebar';
@import './divider';
```

---

### Phase 9: Verification & Testing

#### Test Checklist

1. **Visual Regression**
   - [ ] All themes render correctly (17 themes)
   - [ ] Light/dark mode toggle works
   - [ ] No white flash on page load
   - [ ] Sidebar transparency maintained
   - [ ] Glow effects work
   - [ ] Animated background plays

2. **Performance**
   - [ ] No increase in CSS bundle size
   - [ ] CSS parsing time not increased
   - [ ] No layout shift

3. **Functionality**
   - [ ] Scrollbars hidden (but scroll works)
   - [ ] Dividers visible with gradient
   - [ ] Mobile sheet transparency
   - [ ] Glass effects render

4. **Build**
   - [ ] `npm run build` succeeds
   - [ ] `npm run lint` passes
   - [ ] No TypeScript errors

---

## Migration Commands

### Phase 1: Create Structure

```bash
# Create directory structure
mkdir -p src/styles/{tokens,base,components,effects,animations}
mkdir -p themes/tokens

# Create index files
touch src/styles/index.css
touch src/styles/tokens/_index.css
touch src/styles/base/_index.css
touch src/styles/components/_index.css
touch src/styles/effects/_index.css
touch src/styles/animations/_index.css
touch themes/tokens/index.ts
touch themes/css-generator.ts
```

### Phase 2-5: Create Module Files

```bash
# Base styles
touch src/styles/base/_reset.css
touch src/styles/base/_html-body.css
touch src/styles/base/_scrollbar.css

# Effects
touch src/styles/effects/_glow.css
touch src/styles/effects/_glass.css
touch src/styles/effects/_blur.css

# Animations
touch src/styles/animations/_gradients.css
touch src/styles/animations/_keyframes.css

# Components
touch src/styles/components/_sidebar.css
touch src/styles/components/_divider.css
```

### Phase 7: Backup & Replace

```bash
# Backup original
cp src/app/globals.css src/app/globals.css.backup

# Replace with new version (after creating modules)
# Then manually update globals.css
```

---

## File Size Estimates

| File | Lines | Purpose |
|------|-------|---------|
| `globals.css` (new) | ~80 | Imports only |
| `_scrollbar.css` | ~65 | Scrollbar system |
| `_html-body.css` | ~20 | Base styles |
| `_reset.css` | ~25 | CSS reset |
| `_glow.css` | ~20 | Glow effects |
| `_glass.css` | ~50 | Glass effects |
| `_keyframes.css` | ~40 | Animations |
| `_gradients.css` | ~40 | Gradient backgrounds |
| `_sidebar.css` | ~200 | Sidebar transparency |
| `_divider.css` | ~20 | Divider styles |
| **Total** | ~560 | Modular (vs 1074 monolithic) |

---

## Benefits of This Architecture

1. **Single Source of Truth**: Theme tokens defined once in `themes/`
2. **Easier Maintenance**: Each concern in its own file
3. **Better Debugging**: Know exactly where to look for styles
4. **Scalability**: Easy to add new effects/components
5. **Reduced Duplication**: CSS generator eliminates copy-paste
6. **Type Safety**: TypeScript ensures token consistency
7. **Performance**: Same bundle size, better caching potential

---

## Rollback Plan

If issues arise:

1. Restore `src/app/globals.css` from `globals.css.backup`
2. Delete `src/styles/` directory
3. Restart dev server

---

## Timeline Estimate

| Phase | Duration | Complexity |
|-------|----------|------------|
| Phase 1 | 30 min | Low |
| Phase 2 | 1 hour | Low |
| Phase 3 | 1 hour | Low |
| Phase 4 | 1 hour | Low |
| Phase 5 | 2 hours | Medium |
| Phase 6 | 2 hours | Medium |
| Phase 7 | 1 hour | Low |
| Phase 8 | 30 min | Low |
| Phase 9 | 2 hours | Medium |
| **Total** | ~11 hours | |

---

## Notes for Implementer

1. **Work incrementally**: Complete one phase at a time, test, then proceed
2. **Keep the app running**: Use `npm run dev` to test changes live
3. **Don't modify theme files**: `themes/corecolors/*.ts` are correct as-is
4. **Preserve all !important flags**: They're necessary for override behavior
5. **Test all 17 themes**: Each has unique colors that must work
6. **Test both modes**: Light and dark mode must both function

---

*Last Updated: 2026-02-14*
*Author: Claude (Opencode)*
