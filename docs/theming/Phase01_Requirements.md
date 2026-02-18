# Phase 01: Theming System Requirements

## Overview
The goal is to move from a CSS-centric theming model to a TypeScript-first model where all design tokens are defined in code. This allows for better type safety, easier maintenance, and dynamic runtime switching without relying on complex CSS selectors for every variation.

## Core Requirements
1.  **Centralized Tokens**: Define all shadcn-compatible tokens (background, primary, border-radius, font-family) in a TS config.
2.  **Theme Presets**: Support 12 distinct color presets.
3.  **Light/Dark Support**: Each preset must define HSL values for both light and dark modes within the TS config.
4.  **Runtime Injection**: Use a React provider to inject these tokens as CSS variables into `:root`.
5.  **Clean CSS**: `globals.css` should be reduced to a bare-bones skeleton.
6.  **Persistence**: Theme selection (both mode and color) must persist across sessions.

## Acceptance Criteria
- [ ] No hardcoded color values in `globals.css` `:root` or `.dark`.
- [ ] 12 distinct color themes available in the `ThemeCustomizer`.
- [ ] Changing a theme updates the `primary`, `border`, `radius`, and `background` accordingly.
- [ ] Type-safe theme configuration (TypeScript).
- [ ] Zero layout shift on theme change (using `scrollbar-gutter`).
