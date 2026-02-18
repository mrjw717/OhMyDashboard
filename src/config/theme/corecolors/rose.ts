import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Rose color theme.
 */
export const roseTheme: Theme = {
  name: 'rose',
  displayName: 'Rose',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '346 77% 49.8%',
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
    ring: '346 77% 49.8%',
    gradientFrom: '346 77% 67.8%',
    gradientTo: '346 77% 31.8%',
    chart1: '346 77% 49.8%',  // Primary Rose
    chart2: '330 81% 60%',    // Pink
    chart3: '0 72% 51%',      // Red
    chart4: '12 76% 61%',     // Red-Orange
    chart5: '292 84% 61%',    // Fuchsia
    chart6: '346 80% 35%',    // Deep Rose
    chart7: '350 90% 75%',    // Soft Rose
    chart8: '170 80% 40%',    // Teal (Contrast)
    chart9: '210 80% 50%',    // Blue (Contrast)
    chart10: '346 30% 50%',   // Muted Rose
    chart11: '355 100% 60%',  // Vibrant Rose
    chart12: '10 40% 75%',    // Blush
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '346 77% 49.8%',
    sidebarPrimaryForeground: '355.7 100% 97.3%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '346.8 77.2% 49.8%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Rose + Pink + Red + Fuchsia
    gradientBg1: '350 89% 60%',  // Rose
    gradientBg2: '330 81% 60%',  // Pink
    gradientBg3: '0 72% 51%',    // Red
    gradientBg4: '292 84% 61%',  // Fuchsia
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '346 77% 49.8%',
    fxTechLine: '346 77% 49.8%',
    fxTechBorder: '346 77% 49.8%',
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
    primary: '346 77% 49.8%',
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
    ring: '346 77% 49.8%',
    gradientFrom: '346 77% 59.8%',
    gradientTo: '346 77% 39.8%',
    chart1: '346 77% 49.8%',
    chart2: '330 100% 65%',
    chart3: '0 90% 60%',
    chart4: '12 90% 65%',
    chart5: '292 90% 65%',
    chart6: '346 90% 45%',
    chart7: '350 100% 80%',
    chart8: '170 90% 50%',
    chart9: '210 90% 60%',
    chart10: '346 40% 60%',
    chart11: '355 100% 70%',
    chart12: '10 50% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '346 77% 49.8%',
    sidebarPrimaryForeground: '355.7 100% 97.3%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '0 0% 14.9%',
    sidebarRing: '343.4 81.8% 52%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Rose + Pink + Red + Fuchsia
    gradientBg1: '350 89% 60%',  // Rose
    gradientBg2: '330 81% 60%',  // Pink
    gradientBg3: '0 72% 51%',    // Red
    gradientBg4: '292 84% 61%',  // Fuchsia
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '346 77% 49.8%',
    fxTechLine: '346 77% 49.8%',
    fxTechBorder: '346 77% 49.8%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
