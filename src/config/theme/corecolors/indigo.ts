import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Indigo color theme.
 */
export const indigoTheme: Theme = {
  name: 'indigo',
  displayName: 'Indigo',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '226.2 70.7% 55.3%',
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
    ring: '226.2 70.7% 55.3%',
    gradientFrom: '226.2 70.7% 55.3%',
    gradientTo: '226.2 70.7% 55.3%',
    chart1: '226.2 70.7% 55.3%', // Primary Indigo
    chart2: '217 91% 60%',    // Blue
    chart3: '262 83% 58%',    // Violet
    chart4: '280 75% 60%',    // Purple
    chart5: '189 94% 43%',    // Cyan
    chart6: '226 85% 35%',    // Deep Indigo
    chart7: '200 90% 60%',    // Sky Blue
    chart8: '310 75% 55%',    // Magenta
    chart9: '262 70% 75%',    // Light Violet
    chart10: '226 25% 45%',   // Muted Indigo
    chart11: '235 100% 60%',  // Electric Indigo
    chart12: '250 50% 75%',   // Lavender
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '226.2 70.7% 55.3%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '226.2 70.7% 55.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Indigo + Blue + Violet + Purple
    gradientBg1: '263 90% 51%',  // Indigo
    gradientBg2: '217 91% 60%',  // Blue
    gradientBg3: '262 83% 58%',  // Violet
    gradientBg4: '271 91% 65%',  // Purple
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '226.2 70.7% 55.3%',
    fxTechLine: '226.2 70.7% 55.3%',
    fxTechBorder: '226.2 70.7% 55.3%',
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
    primary: '226.2 70.7% 55.3%',
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
    ring: '226.2 70.7% 55.3%',
    gradientFrom: '226.2 70.7% 55.3%',
    gradientTo: '226.2 70.7% 55.3%',
    chart1: '226.2 70.7% 55.3%',
    chart2: '217 100% 65%',
    chart3: '262 90% 65%',
    chart4: '280 90% 65%',
    chart5: '189 100% 50%',
    chart6: '226 100% 40%',
    chart7: '200 100% 70%',
    chart8: '310 85% 65%',
    chart9: '262 100% 80%',
    chart10: '226 30% 50%',
    chart11: '235 100% 70%',
    chart12: '250 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '226.2 70.7% 55.3%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '226.2 70.7% 55.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Indigo + Blue + Violet + Purple
    gradientBg1: '263 90% 51%',  // Indigo
    gradientBg2: '217 91% 60%',  // Blue
    gradientBg3: '262 83% 58%',  // Violet
    gradientBg4: '271 91% 65%',  // Purple
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '226.2 70.7% 55.3%',
    fxTechLine: '226.2 70.7% 55.3%',
    fxTechBorder: '226.2 70.7% 55.3%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
