/**
 * CSS Variable Generator - Single Source of Truth
 *
 * This module provides a type-safe mapping from ThemeColors property keys
 * to CSS variable names. It is used by:
 * - theme-server.ts (server-side CSS generation)
 * - theme-init-script.ts (client-side blocking script)
 *
 * Adding a new token? Just add the mapping here and it propagates everywhere.
 */

import { ThemeColors } from './types'

/**
 * Maps ThemeColors property keys to CSS custom property names.
 * Order matches the original globals.css :root block for consistency.
 */
export const TOKEN_MAP: ReadonlyArray<[keyof ThemeColors, string]> = [
    // Core
    ['background', '--background'],
    ['foreground', '--foreground'],
    ['card', '--card'],
    ['cardForeground', '--card-foreground'],
    ['popover', '--popover'],
    ['popoverForeground', '--popover-foreground'],
    ['primary', '--primary'],
    ['primaryForeground', '--primary-foreground'],
    ['secondary', '--secondary'],
    ['secondaryForeground', '--secondary-foreground'],
    ['muted', '--muted'],
    ['mutedForeground', '--muted-foreground'],
    ['accent', '--accent'],
    ['accentForeground', '--accent-foreground'],
    ['destructive', '--destructive'],
    ['destructiveForeground', '--destructive-foreground'],
    ['border', '--border'],
    ['input', '--input'],
    ['ring', '--ring'],

    // Gradients
    ['gradientFrom', '--gradient-from'],
    ['gradientTo', '--gradient-to'],

    // Standard chart colors (1-12)
    ['chart1', '--chart-1'],
    ['chart2', '--chart-2'],
    ['chart3', '--chart-3'],
    ['chart4', '--chart-4'],
    ['chart5', '--chart-5'],
    ['chart6', '--chart-6'],
    ['chart7', '--chart-7'],
    ['chart8', '--chart-8'],
    ['chart9', '--chart-9'],
    ['chart10', '--chart-10'],
    ['chart11', '--chart-11'],
    ['chart12', '--chart-12'],

    // Sidebar
    ['sidebar', '--sidebar'],
    ['sidebarForeground', '--sidebar-foreground'],
    ['sidebarPrimary', '--sidebar-primary'],
    ['sidebarPrimaryForeground', '--sidebar-primary-foreground'],
    ['sidebarAccent', '--sidebar-accent'],
    ['sidebarAccentForeground', '--sidebar-accent-foreground'],
    ['sidebarBorder', '--sidebar-border'],
    ['sidebarRing', '--sidebar-ring'],
    ['radius', '--radius'],

    // Scrollbar
    ['scrollbarThumb', '--scrollbar-thumb'],
    ['scrollbarTrack', '--scrollbar-track'],
    ['scrollbarThumbHover', '--scrollbar-thumb-hover'],
    ['scrollbarThumbActive', '--scrollbar-thumb-active'],

    // Animated gradient background (4 layers)
    ['gradientBg1', '--gradient-bg-1'],
    ['gradientBg2', '--gradient-bg-2'],
    ['gradientBg3', '--gradient-bg-3'],
    ['gradientBg4', '--gradient-bg-4'],

    // Extended instructor chart colors (1-16)
    ['chartInst1', '--chart-inst-1'],
    ['chartInst2', '--chart-inst-2'],
    ['chartInst3', '--chart-inst-3'],
    ['chartInst4', '--chart-inst-4'],
    ['chartInst5', '--chart-inst-5'],
    ['chartInst6', '--chart-inst-6'],
    ['chartInst7', '--chart-inst-7'],
    ['chartInst8', '--chart-inst-8'],
    ['chartInst9', '--chart-inst-9'],
    ['chartInst10', '--chart-inst-10'],
    ['chartInst11', '--chart-inst-11'],
    ['chartInst12', '--chart-inst-12'],
    ['chartInst13', '--chart-inst-13'],
    ['chartInst14', '--chart-inst-14'],
    ['chartInst15', '--chart-inst-15'],
    ['chartInst16', '--chart-inst-16'],

    // Section/Surface
    ['section', '--section'],
    ['sectionBorder', '--section-border'],

    // Text colors
    ['textPrimary', '--text-primary'],
    ['textSecondary', '--text-secondary'],
    ['textMuted', '--text-muted'],
    ['textDisabled', '--text-disabled'],
    ['textInverse', '--text-inverse'],

    // Background tokens
    ['bgPrimary', '--bg-primary'],
    ['bgSecondary', '--bg-secondary'],
    ['bgTertiary', '--bg-tertiary'],
    ['bgElevated', '--bg-elevated'],

    // Border tokens
    ['borderHover', '--border-hover'],
    ['borderFocus', '--border-focus'],

    // Feedback colors
    ['colorSuccess', '--color-success'],
    ['colorWarning', '--color-warning'],
    ['colorError', '--color-error'],
    ['colorInfo', '--color-info'],

    // Console sizing
    ['consoleButtonSize', '--console-button-size'],
    ['consoleIconSize', '--console-icon-size'],
    ['consoleSpreadRadius', '--console-spread-radius'],

    // FX tech tokens
    ['fxTechGlow', '--fx-tech-glow'],
    ['fxTechLine', '--fx-tech-line'],
    ['fxTechBorder', '--fx-tech-border'],
]

/**
 * Pre-computed CSS variable names array (for theme-init-script)
 */
export const CSS_VARIABLE_NAMES: readonly string[] = TOKEN_MAP.map(([, cssName]) => cssName.slice(2))

/**
 * Generate CSS custom property declarations from a ThemeColors object.
 * Returns a string of `--prop: value;` lines (no selector wrapping).
 */
export function generateCSSVariables(colors: Record<string, string>): string {
    return TOKEN_MAP
        .map(([key, cssName]) => {
            const value = colors[key as string]
            return value !== undefined ? `${cssName}: ${value};` : null
        })
        .filter(Boolean)
        .join('\n    ')
}
