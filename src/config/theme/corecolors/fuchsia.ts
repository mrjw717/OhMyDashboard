import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Fuchsia color theme.
 */
export const fuchsiaTheme: Theme = {
  name: 'fuchsia',
  displayName: 'Fuchsia',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '292.2 84.1% 60.6%',
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
    ring: '292.2 84.1% 60.6%',
    gradientFrom: '292.2 84.1% 60.6%',
    gradientTo: '292.2 84.1% 60.6%',
    chart1: '292.2 84.1% 60.6%', // Primary Fuchsia
    chart2: '310 75% 55%',    // Magenta
    chart3: '270 80% 60%',    // Violet
    chart4: '330 80% 60%',    // Pink
    chart5: '170 80% 45%',    // Teal (Contrast)
    chart6: '292 90% 35%',    // Deep Fuchsia
    chart7: '300 90% 75%',    // Light Fuchsia
    chart8: '220 80% 55%',    // Blue (Contrast)
    chart9: '150 70% 50%',    // Green (Contrast)
    chart10: '292 30% 50%',   // Muted Fuchsia
    chart11: '280 100% 60%',  // Electric Purple
    chart12: '315 50% 75%',   // Orchid
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '292.2 84.1% 60.6%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '292.2 84.1% 60.6%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Fuchsia + Pink + Purple + Rose
    gradientBg1: '292 84% 61%',  // Fuchsia
    gradientBg2: '330 81% 60%',  // Pink
    gradientBg3: '271 91% 65%',  // Purple
    gradientBg4: '350 89% 60%',  // Rose
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '292.2 84.1% 60.6%',
    fxTechLine: '292.2 84.1% 60.6%',
    fxTechBorder: '292.2 84.1% 60.6%',
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
    primary: '292.2 84.1% 60.6%',
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
    ring: '292.2 84.1% 60.6%',
    gradientFrom: '292.2 84.1% 60.6%',
    gradientTo: '292.2 84.1% 60.6%',
    chart1: '292.2 84.1% 60.6%',
    chart2: '310 90% 65%',
    chart3: '270 90% 65%',
    chart4: '330 90% 65%',
    chart5: '170 90% 55%',
    chart6: '292 100% 45%',
    chart7: '300 100% 80%',
    chart8: '220 90% 65%',
    chart9: '150 80% 60%',
    chart10: '292 40% 60%',
    chart11: '280 100% 70%',
    chart12: '315 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '292.2 84.1% 60.6%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '292.2 84.1% 60.6%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Fuchsia + Pink + Purple + Rose
    gradientBg1: '292 84% 61%',  // Fuchsia
    gradientBg2: '330 81% 60%',  // Pink
    gradientBg3: '271 91% 65%',  // Purple
    gradientBg4: '350 89% 60%',  // Rose
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '292.2 84.1% 60.6%',
    fxTechLine: '292.2 84.1% 60.6%',
    fxTechBorder: '292.2 84.1% 60.6%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
