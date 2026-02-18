import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Lime color theme.
 */
export const limeTheme: Theme = {
  name: 'lime',
  displayName: 'Lime',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '83.7 80.5% 44.3%',
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
    ring: '83.7 80.5% 44.3%',
    gradientFrom: '83.7 80.5% 44.3%',
    gradientTo: '83.7 80.5% 44.3%',
    chart1: '83.7 80.5% 44.3%', // Primary Lime
    chart2: '142 76% 36%',    // Green
    chart3: '48 96% 53%',     // Yellow
    chart4: '160 84% 39%',    // Emerald
    chart5: '173 80% 40%',    // Teal
    chart6: '84 95% 25%',     // Deep Lime
    chart7: '120 75% 55%',    // Spring Green
    chart8: '25 95% 53%',     // Orange
    chart9: '150 70% 65%',    // Mint
    chart10: '84 30% 45%',    // Muted Lime
    chart11: '75 100% 50%',   // Electric Lime
    chart12: '70 50% 35%',    // Olive
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '83.7 80.5% 44.3%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '83.7 80.5% 44.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Lime + Green + Yellow + Emerald
    gradientBg1: '84 81% 44%',   // Lime
    gradientBg2: '142 76% 36%',  // Green
    gradientBg3: '48 96% 53%',   // Yellow
    gradientBg4: '160 84% 39%',  // Emerald
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '83.7 80.5% 44.3%',
    fxTechLine: '83.7 80.5% 44.3%',
    fxTechBorder: '83.7 80.5% 44.3%',
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
    primary: '83.7 80.5% 44.3%',
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
    ring: '83.7 80.5% 44.3%',
    gradientFrom: '83.7 80.5% 44.3%',
    gradientTo: '83.7 80.5% 44.3%',
    chart1: '83.7 80.5% 44.3%',
    chart2: '142 90% 45%',
    chart3: '48 100% 60%',
    chart4: '160 95% 45%',
    chart5: '173 90% 45%',
    chart6: '84 100% 30%',
    chart7: '120 85% 65%',
    chart8: '25 100% 60%',
    chart9: '150 80% 70%',
    chart10: '84 35% 50%',
    chart11: '75 100% 60%',
    chart12: '70 60% 45%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '83.7 80.5% 44.3%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '83.7 80.5% 44.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Lime + Green + Yellow + Emerald
    gradientBg1: '84 81% 44%',   // Lime
    gradientBg2: '142 76% 36%',  // Green
    gradientBg3: '48 96% 53%',   // Yellow
    gradientBg4: '160 84% 39%',  // Emerald
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '83.7 80.5% 44.3%',
    fxTechLine: '83.7 80.5% 44.3%',
    fxTechBorder: '83.7 80.5% 44.3%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
