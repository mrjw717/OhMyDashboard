import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Cyan color theme.
 */
export const cyanTheme: Theme = {
  name: 'cyan',
  displayName: 'Cyan',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '188.7 94.5% 42.7%',
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
    ring: '188.7 94.5% 42.7%',
    gradientFrom: '188.7 94.5% 42.7%',
    gradientTo: '188.7 94.5% 42.7%',
    chart1: '188.7 94.5% 42.7%', // Primary Cyan
    chart2: '160 84% 39%',    // Emerald
    chart3: '173 80% 40%',    // Teal
    chart4: '200 90% 60%',    // Sky Blue
    chart5: '217 91% 60%',    // Blue
    chart6: '150 70% 65%',    // Mint
    chart7: '190 95% 30%',    // Deep Cyan
    chart8: '240 80% 65%',    // Indigo
    chart9: '200 100% 75%',   // Light Sky
    chart10: '188 30% 50%',   // Muted Cyan
    chart11: '180 100% 50%',  // Electric Cyan
    chart12: '173 50% 75%',   // Soft Teal
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '188.7 94.5% 42.7%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '188.7 94.5% 42.7%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Cyan + Teal + Blue + Emerald
    gradientBg1: '189 94% 43%',  // Cyan
    gradientBg2: '173 80% 40%',  // Teal
    gradientBg3: '217 91% 60%',  // Blue
    gradientBg4: '160 84% 39%',  // Emerald
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '188.7 94.5% 42.7%',
    fxTechLine: '188.7 94.5% 42.7%',
    fxTechBorder: '188.7 94.5% 42.7%',
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
    primary: '188.7 94.5% 42.7%',
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
    ring: '188.7 94.5% 42.7%',
    gradientFrom: '188.7 94.5% 42.7%',
    gradientTo: '188.7 94.5% 42.7%',
    chart1: '188.7 94.5% 42.7%',
    chart2: '160 90% 45%',
    chart3: '173 90% 45%',
    chart4: '200 100% 65%',
    chart5: '217 100% 65%',
    chart6: '150 80% 70%',
    chart7: '190 100% 35%',
    chart8: '240 90% 70%',
    chart9: '200 100% 80%',
    chart10: '188 35% 55%',
    chart11: '180 100% 60%',
    chart12: '173 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '188.7 94.5% 42.7%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '188.7 94.5% 42.7%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Cyan + Teal + Blue + Emerald
    gradientBg1: '189 94% 43%',  // Cyan
    gradientBg2: '173 80% 40%',  // Teal
    gradientBg3: '217 91% 60%',  // Blue
    gradientBg4: '160 84% 39%',  // Emerald
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '188.7 94.5% 42.7%',
    fxTechLine: '188.7 94.5% 42.7%',
    fxTechBorder: '188.7 94.5% 42.7%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
