import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Emerald color theme.
 */
export const emeraldTheme: Theme = {
  name: 'emerald',
  displayName: 'Emerald',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '160.1 84.1% 39.4%',
    primaryForeground: '0 0% 98%',
    secondary: '0 0% 96.1%',
    secondaryForeground: '0 0% 9%',
    muted: '0 0% 96.1%',
    mutedForeground: '0 0% 45.1%',
    accent: '0 0% 96.1%',
    accentForeground: '0 0% 9%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '0 0% 89.8%',
    input: '0 0% 89.8%',
    ring: '160.1 84.1% 39.4%',
    gradientFrom: '160.1 84.1% 39.4%',
    gradientTo: '160.1 84.1% 39.4%',
    chart1: '160.1 84.1% 39.4%', // Primary Emerald
    chart2: '173 80% 40%',    // Teal
    chart3: '189 94% 43%',    // Cyan
    chart4: '142 76% 36%',    // Green
    chart5: '84 81% 44%',     // Lime
    chart6: '160 95% 25%',    // Deep Emerald
    chart7: '150 70% 65%',    // Mint
    chart8: '200 90% 60%',    // Sky Blue
    chart9: '120 75% 55%',    // Spring Green
    chart10: '160 30% 45%',   // Muted Emerald
    chart11: '155 100% 50%',  // Electric Emerald
    chart12: '160 50% 70%',   // Seafoam
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '160.1 84.1% 39.4%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '160.1 84.1% 39.4%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Emerald + Green + Teal + Lime
    gradientBg1: '160 84% 39%',  // Emerald
    gradientBg2: '142 76% 36%',  // Green
    gradientBg3: '173 80% 40%',  // Teal
    gradientBg4: '84 81% 44%',   // Lime
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '160.1 84.1% 39.4%',
    fxTechLine: '160.1 84.1% 39.4%',
    fxTechBorder: '160.1 84.1% 39.4%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
  dark: {
    background: '0 0% 3.9%',
    foreground: '0 0% 98%',
    card: '0 0% 3.9%',
    cardForeground: '0 0% 98%',
    popover: '0 0% 3.9%',
    popoverForeground: '0 0% 98%',
    primary: '160.1 84.1% 39.4%',
    primaryForeground: '0 0% 98%',
    secondary: '0 0% 14.9%',
    secondaryForeground: '0 0% 98%',
    muted: '0 0% 14.9%',
    mutedForeground: '0 0% 63.9%',
    accent: '0 0% 14.9%',
    accentForeground: '0 0% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '0 0% 98%',
    border: '0 0% 14.9%',
    input: '0 0% 14.9%',
    ring: '160.1 84.1% 39.4%',
    gradientFrom: '160.1 84.1% 39.4%',
    gradientTo: '160.1 84.1% 39.4%',
    chart1: '160.1 84.1% 39.4%',
    chart2: '173 90% 45%',
    chart3: '189 100% 45%',
    chart4: '142 90% 45%',
    chart5: '84 90% 50%',
    chart6: '160 100% 30%',
    chart7: '150 80% 70%',
    chart8: '200 100% 65%',
    chart9: '120 85% 65%',
    chart10: '160 35% 50%',
    chart11: '155 100% 60%',
    chart12: '160 60% 75%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '160.1 84.1% 39.4%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '160.1 84.1% 39.4%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Emerald + Green + Teal + Lime
    gradientBg1: '160 84% 39%',  // Emerald
    gradientBg2: '142 76% 36%',  // Green
    gradientBg3: '173 80% 40%',  // Teal
    gradientBg4: '84 81% 44%',   // Lime
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '160.1 84.1% 39.4%',
    fxTechLine: '160.1 84.1% 39.4%',
    fxTechBorder: '160.1 84.1% 39.4%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
