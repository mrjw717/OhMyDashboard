import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Violet color theme.
 */
export const violetTheme: Theme = {
  name: 'violet',
  displayName: 'Violet',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '262.1 83.3% 57.8%',
    primaryForeground: '210 40% 98%',
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
    ring: '262.1 83.3% 57.8%',
    gradientFrom: '262.1 83.3% 75.8%',
    gradientTo: '262.1 83.3% 39.8%',
    chart1: '262.1 83.3% 57.8%', // Primary Violet
    chart2: '280 75% 60%',    // Purple
    chart3: '226 70% 55%',    // Indigo
    chart4: '310 70% 60%',    // Magenta
    chart5: '40 90% 55%',     // Gold (Contrast)
    chart6: '262 90% 40%',    // Deep Violet
    chart7: '270 80% 75%',    // Lilac
    chart8: '180 80% 45%',    // Teal (Contrast)
    chart9: '140 70% 50%',    // Green (Contrast)
    chart10: '262 30% 50%',   // Muted Violet
    chart11: '250 100% 65%',  // Electric Violet
    chart12: '290 50% 75%',   // Lavender
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '262.1 83.3% 57.8%',
    sidebarPrimaryForeground: '210 40% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '262.1 83.3% 57.8%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    gradientBg1: '262.1 83.3% 57.8%',
    gradientBg2: '217 91% 60%',
    gradientBg3: '330 81% 60%',
    gradientBg4: '189 94% 43%',
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '262.1 83.3% 57.8%',
    fxTechLine: '262.1 83.3% 57.8%',
    fxTechBorder: '262.1 83.3% 57.8%',
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
    primary: '262.1 83.3% 57.8%',
    primaryForeground: '210 40% 98%',
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
    ring: '262.1 83.3% 57.8%',
    gradientFrom: '262.1 83.3% 67.8%',
    gradientTo: '262.1 83.3% 47.8%',
    chart1: '262.1 83.3% 57.8%',
    chart2: '280 90% 65%',
    chart3: '226 90% 65%',
    chart4: '310 90% 65%',
    chart5: '40 100% 60%',
    chart6: '262 100% 45%',
    chart7: '270 100% 80%',
    chart8: '180 90% 55%',
    chart9: '140 80% 60%',
    chart10: '262 40% 60%',
    chart11: '250 100% 70%',
    chart12: '290 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '262.1 83.3% 57.8%',
    sidebarPrimaryForeground: '210 40% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '263.4 70% 50.4%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    gradientBg1: '262.1 83.3% 57.8%',
    gradientBg2: '217 91% 60%',
    gradientBg3: '330 81% 60%',
    gradientBg4: '189 94% 43%',
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '262.1 83.3% 57.8%',
    fxTechLine: '262.1 83.3% 57.8%',
    fxTechBorder: '262.1 83.3% 57.8%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
