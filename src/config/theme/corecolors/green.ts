import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Green color theme.
 */
export const greenTheme: Theme = {
  name: 'green',
  displayName: 'Green',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '142.1 76.2% 36.3%',
    primaryForeground: '355.7 100% 97.3%',
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
    ring: '142.1 76.2% 36.3%',
    gradientFrom: '142.1 76.2% 54.3%',
    gradientTo: '142.1 76.2% 18.3%',
    chart1: '142.1 76.2% 36.3%', // Primary Green
    chart2: '160 84% 39%',    // Emerald
    chart3: '84 81% 44%',     // Lime
    chart4: '173 80% 40%',    // Teal
    chart5: '140 60% 25%',    // Forest Green
    chart6: '150 60% 70%',    // Mint
    chart7: '120 70% 50%',    // Spring Green
    chart8: '80 50% 35%',     // Olive
    chart9: '160 50% 75%',    // Seafoam
    chart10: '180 70% 25%',   // Deep Teal
    chart11: '75 95% 55%',    // Electric Lime
    chart12: '120 20% 60%',   // Sage
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '142.1 76.2% 36.3%',
    sidebarPrimaryForeground: '355.7 100% 97.3%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '142.1 76.2% 36.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Green + Emerald + Lime + Teal
    gradientBg1: '142 76% 36%',  // Green
    gradientBg2: '160 84% 39%',  // Emerald
    gradientBg3: '84 81% 44%',   // Lime
    gradientBg4: '173 80% 40%',  // Teal
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '142.1 76.2% 36.3%',
    fxTechLine: '142.1 76.2% 36.3%',
    fxTechBorder: '142.1 76.2% 36.3%',
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
    primary: '142.1 76.2% 36.3%',
    primaryForeground: '355.7 100% 97.3%',
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
    ring: '142.1 76.2% 36.3%',
    gradientFrom: '142.1 76.2% 46.3%',
    gradientTo: '142.1 76.2% 26.3%',
    chart1: '142.1 76.2% 36.3%',
    chart2: '160 90% 45%',
    chart3: '84 90% 55%',
    chart4: '173 90% 50%',
    chart5: '140 70% 35%',
    chart6: '150 70% 75%',
    chart7: '120 80% 60%',
    chart8: '80 60% 45%',
    chart9: '160 60% 80%',
    chart10: '180 80% 35%',
    chart11: '75 100% 60%',
    chart12: '120 30% 70%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '142.1 76.2% 36.3%',
    sidebarPrimaryForeground: '355.7 100% 97.3%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '142.4 71.8% 29.2%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Green + Emerald + Lime + Teal
    gradientBg1: '142 76% 36%',  // Green
    gradientBg2: '160 84% 39%',  // Emerald
    gradientBg3: '84 81% 44%',   // Lime
    gradientBg4: '173 80% 40%',  // Teal
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '142.1 76.2% 36.3%',
    fxTechLine: '142.1 76.2% 36.3%',
    fxTechBorder: '142.1 76.2% 36.3%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
