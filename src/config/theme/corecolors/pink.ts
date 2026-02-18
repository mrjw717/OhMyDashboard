import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Pink color theme.
 */
export const pinkTheme: Theme = {
  name: 'pink',
  displayName: 'Pink',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '330.4 81.2% 60.4%',
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
    ring: '330.4 81.2% 60.4%',
    gradientFrom: '330.4 81.2% 60.4%',
    gradientTo: '330.4 81.2% 60.4%',
    chart1: '330.4 81.2% 60.4%', // Primary Pink
    chart2: '350 89% 60%',    // Rose
    chart3: '292 84% 61%',    // Fuchsia
    chart4: '271 91% 65%',    // Purple
    chart5: '12 76% 61%',     // Red-Orange
    chart6: '330 90% 35%',    // Deep Pink
    chart7: '315 90% 75%',    // Light Pink
    chart8: '190 80% 45%',    // Cyan (Contrast)
    chart9: '150 70% 45%',    // Emerald (Contrast)
    chart10: '330 30% 50%',   // Muted Pink
    chart11: '340 100% 60%',  // Hot Pink
    chart12: '310 40% 75%',   // Lavender Pink
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '330.4 81.2% 60.4%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '330.4 81.2% 60.4%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Pink + Rose + Fuchsia + Purple
    gradientBg1: '330 81% 60%',  // Pink
    gradientBg2: '350 89% 60%',  // Rose
    gradientBg3: '292 84% 61%',  // Fuchsia
    gradientBg4: '271 91% 65%',  // Purple
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '330.4 81.2% 60.4%',
    fxTechLine: '330.4 81.2% 60.4%',
    fxTechBorder: '330.4 81.2% 60.4%',
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
    primary: '330.4 81.2% 60.4%',
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
    ring: '330.4 81.2% 60.4%',
    gradientFrom: '330.4 81.2% 60.4%',
    gradientTo: '330.4 81.2% 60.4%',
    chart1: '330.4 81.2% 60.4%',
    chart2: '350 100% 65%',
    chart3: '292 90% 65%',
    chart4: '271 100% 70%',
    chart5: '12 90% 65%',
    chart6: '330 100% 45%',
    chart7: '315 100% 80%',
    chart8: '190 90% 55%',
    chart9: '150 80% 55%',
    chart10: '330 40% 60%',
    chart11: '340 100% 70%',
    chart12: '310 50% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '330.4 81.2% 60.4%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '330.4 81.2% 60.4%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Pink + Rose + Fuchsia + Purple
    gradientBg1: '330 81% 60%',  // Pink
    gradientBg2: '350 89% 60%',  // Rose
    gradientBg3: '292 84% 61%',  // Fuchsia
    gradientBg4: '271 91% 65%',  // Purple
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '330.4 81.2% 60.4%',
    fxTechLine: '330.4 81.2% 60.4%',
    fxTechBorder: '330.4 81.2% 60.4%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
