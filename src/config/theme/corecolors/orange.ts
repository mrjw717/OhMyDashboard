import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Orange color theme.
 */
export const orangeTheme: Theme = {
  name: 'orange',
  displayName: 'Orange',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '24.6 95% 53.1%',
    primaryForeground: '60 9.1% 97.8%',
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
    ring: '24.6 95% 53.1%',
    gradientFrom: '24.6 95% 71.1%',
    gradientTo: '24.6 95% 35.1%',
    chart1: '24.6 95% 53.1%', // Primary Orange
    chart2: '38 92% 50%',     // Amber
    chart3: '48 96% 53%',     // Yellow
    chart4: '12 76% 61%',     // Red-Orange
    chart5: '0 72% 51%',      // Red
    chart6: '25 100% 35%',    // Deep Orange
    chart7: '30 90% 70%',     // Peach
    chart8: '173 80% 40%',    // Teal (Contrast)
    chart9: '190 90% 45%',    // Cyan (Contrast)
    chart10: '25 30% 45%',    // Muted Orange
    chart11: '15 100% 55%',   // Vibrant Orange
    chart12: '45 40% 75%',    // Sand
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '24.6 95% 53.1%',
    sidebarPrimaryForeground: '60 9.1% 97.8%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '24.6 95% 53.1%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Orange + Amber + Red + Yellow
    gradientBg1: '25 80% 60%',   // Orange
    gradientBg2: '38 80% 55%',   // Amber
    gradientBg3: '0 60% 60%',    // Red
    gradientBg4: '48 80% 60%',   // Yellow
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '24.6 95% 53.1%',
    fxTechLine: '24.6 95% 53.1%',
    fxTechBorder: '24.6 95% 53.1%',
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
    primary: '24.6 95% 53.1%',
    primaryForeground: '60 9.1% 97.8%',
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
    ring: '24.6 95% 53.1%',
    gradientFrom: '24.6 95% 63.1%',
    gradientTo: '24.6 95% 43.1%',
    chart1: '24.6 95% 53.1%',
    chart2: '38 100% 60%',
    chart3: '48 100% 60%',
    chart4: '12 90% 65%',
    chart5: '0 90% 60%',
    chart6: '25 100% 45%',
    chart7: '30 100% 75%',
    chart8: '173 90% 50%',
    chart9: '190 100% 50%',
    chart10: '25 40% 55%',
    chart11: '15 100% 65%',
    chart12: '45 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '24.6 95% 53.1%',
    sidebarPrimaryForeground: '60 9.1% 97.8%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '20.5 90.2% 48.2%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Orange + Amber + Red + Yellow
    gradientBg1: '25 80% 55%',   // Orange
    gradientBg2: '38 80% 50%',   // Amber
    gradientBg3: '0 60% 55%',    // Red
    gradientBg4: '48 80% 55%',   // Yellow
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '24.6 95% 53.1%',
    fxTechLine: '24.6 95% 53.1%',
    fxTechBorder: '24.6 95% 53.1%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
