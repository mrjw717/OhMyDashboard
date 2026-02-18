import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Yellow color theme.
 */
export const yellowTheme: Theme = {
  name: 'yellow',
  displayName: 'Yellow',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '47.9 95.8% 53.1%',
    primaryForeground: '26 83.3% 14.1%',
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
    ring: '47.9 95.8% 53.1%',
    gradientFrom: '47.9 95.8% 71.1%',
    gradientTo: '47.9 95.8% 35.1%',
    chart1: '47.9 95.8% 53.1%', // Primary Yellow
    chart2: '38 92% 50%',     // Amber
    chart3: '25 95% 53%',     // Orange
    chart4: '84 81% 44%',     // Lime
    chart5: '142 76% 36%',    // Green
    chart6: '48 100% 35%',    // Deep Gold
    chart7: '55 90% 75%',     // Light Yellow
    chart8: '217 91% 60%',    // Blue (Contrast)
    chart9: '262 83% 58%',    // Violet (Contrast)
    chart10: '48 50% 50%',    // Muted Yellow
    chart11: '60 100% 50%',   // Bright Yellow
    chart12: '30 60% 40%',    // Brown
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '47.9 95.8% 53.1%',
    sidebarPrimaryForeground: '26 83.3% 14.1%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '47.9 95.8% 53.1%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Yellow + Amber + Lime + Orange
    gradientBg1: '48 96% 53%',   // Yellow
    gradientBg2: '38 92% 50%',   // Amber
    gradientBg3: '84 81% 44%',   // Lime
    gradientBg4: '25 95% 53%',   // Orange
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '47.9 95.8% 53.1%',
    fxTechLine: '47.9 95.8% 53.1%',
    fxTechBorder: '47.9 95.8% 53.1%',
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
    primary: '47.9 95.8% 53.1%',
    primaryForeground: '26 83.3% 14.1%',
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
    ring: '47.9 95.8% 53.1%',
    gradientFrom: '47.9 95.8% 63.1%',
    gradientTo: '47.9 95.8% 43.1%',
    chart1: '47.9 95.8% 53.1%',
    chart2: '38 100% 60%',
    chart3: '25 100% 60%',
    chart4: '84 90% 55%',
    chart5: '142 90% 45%',
    chart6: '48 100% 45%',
    chart7: '55 100% 80%',
    chart8: '217 100% 65%',
    chart9: '262 90% 65%',
    chart10: '48 60% 60%',
    chart11: '60 100% 60%',
    chart12: '30 70% 50%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '47.9 95.8% 53.1%',
    sidebarPrimaryForeground: '26 83.3% 14.1%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '45.4 93.4% 47.5%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Yellow + Amber + Lime + Orange
    gradientBg1: '48 96% 53%',   // Yellow
    gradientBg2: '38 92% 50%',   // Amber
    gradientBg3: '84 81% 44%',   // Lime
    gradientBg4: '25 95% 53%',   // Orange
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '47.9 95.8% 53.1%',
    fxTechLine: '47.9 95.8% 53.1%',
    fxTechBorder: '47.9 95.8% 53.1%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
