import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Red color theme.
 */
export const redTheme: Theme = {
  name: 'red',
  displayName: 'Red',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '0 72.2% 50.6%',
    primaryForeground: '0 85.7% 97.3%',
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
    ring: '0 72.2% 50.6%',
    gradientFrom: '0 72.2% 68.6%',
    gradientTo: '0 72.2% 32.6%',
    chart1: '0 72.2% 50.6%',  // Primary Red
    chart2: '25 95% 53%',    // Orange
    chart3: '350 89% 60%',   // Rose
    chart4: '330 81% 65%',   // Pink
    chart5: '40 95% 55%',    // Goldenrod
    chart6: '0 75% 35%',     // Deep Red
    chart7: '0 80% 70%',     // Soft Red
    chart8: '310 70% 50%',   // Magenta
    chart9: '20 90% 75%',    // Peach
    chart10: '350 60% 30%',  // Maroon
    chart11: '15 100% 55%',  // Vibrant Orange
    chart12: '10 85% 65%',   // Coral
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '0 72.2% 50.6%',
    sidebarPrimaryForeground: '0 85.7% 97.3%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '0 72.2% 50.6%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Red + Orange + Rose + Pink
    gradientBg1: '0 72% 51%',    // Red
    gradientBg2: '25 95% 53%',   // Orange
    gradientBg3: '350 89% 60%',  // Rose
    gradientBg4: '330 81% 60%',  // Pink
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '0 72.2% 50.6%',
    fxTechLine: '0 72.2% 50.6%',
    fxTechBorder: '0 72.2% 50.6%',
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
    primary: '0 72.2% 50.6%',
    primaryForeground: '0 85.7% 97.3%',
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
    ring: '0 72.2% 50.6%',
    gradientFrom: '0 72.2% 60.6%',
    gradientTo: '0 72.2% 40.6%',
    chart1: '0 72.2% 50.6%',
    chart2: '25 100% 60%',
    chart3: '350 100% 70%',
    chart4: '330 100% 70%',
    chart5: '40 100% 65%',
    chart6: '0 100% 45%',
    chart7: '0 100% 75%',
    chart8: '310 90% 65%',
    chart9: '20 100% 80%',
    chart10: '350 80% 45%',
    chart11: '15 100% 65%',
    chart12: '10 100% 70%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '0 72.2% 50.6%',
    sidebarPrimaryForeground: '0 85.7% 97.3%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '0 72.2% 50.6%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Red + Orange + Rose + Pink
    gradientBg1: '0 72% 51%',    // Red
    gradientBg2: '25 95% 53%',   // Orange
    gradientBg3: '350 89% 60%',  // Rose
    gradientBg4: '330 81% 60%',  // Pink
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '0 72.2% 50.6%',
    fxTechLine: '0 72.2% 50.6%',
    fxTechBorder: '0 72.2% 50.6%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
