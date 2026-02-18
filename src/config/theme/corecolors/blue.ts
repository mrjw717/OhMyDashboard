import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Blue color theme.
 */
export const blueTheme: Theme = {
  name: 'blue',
  displayName: 'Blue',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '221.2 83.2% 53.3%',
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
    ring: '221.2 83.2% 53.3%',
    gradientFrom: '221.2 83.2% 71.3%',
    gradientTo: '221.2 83.2% 35.3%',
    chart1: '221.2 83.2% 53.3%', // Primary Blue
    chart2: '190 90% 45%',    // Cyan
    chart3: '240 80% 60%',    // Indigo
    chart4: '262 80% 60%',    // Violet
    chart5: '173 80% 40%',    // Teal
    chart6: '210 90% 40%',    // Deep Blue
    chart7: '200 95% 70%',    // Sky Blue
    chart8: '280 75% 60%',    // Purple
    chart9: '160 70% 45%',    // Emerald
    chart10: '215 25% 40%',   // Muted Blue
    chart11: '210 100% 50%',  // Electric Blue
    chart12: '255 50% 75%',   // Soft Lavender
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '221.2 83.2% 53.3%',
    sidebarPrimaryForeground: '210 40% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '221.2 83.2% 53.3%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Blue + Cyan + Indigo + Sky
    gradientBg1: '217 91% 60%',  // Blue
    gradientBg2: '189 94% 43%',  // Cyan
    gradientBg3: '263 90% 51%',  // Indigo
    gradientBg4: '199 89% 48%',  // Sky
    section: '210 40% 99%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '221.2 83.2% 53.3%',
    fxTechLine: '221.2 83.2% 53.3%',
    fxTechBorder: '221.2 83.2% 53.3%',
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
    primary: '221.2 83.2% 53.3%',
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
    ring: '221.2 83.2% 53.3%',
    gradientFrom: '221.2 83.2% 63.3%',
    gradientTo: '221.2 83.2% 43.3%',
    chart1: '221.2 83.2% 53.3%',
    chart2: '190 100% 50%',
    chart3: '240 90% 65%',
    chart4: '262 90% 65%',
    chart5: '173 90% 45%',
    chart6: '210 100% 45%',
    chart7: '200 100% 75%',
    chart8: '280 85% 65%',
    chart9: '160 80% 50%',
    chart10: '215 30% 50%',
    chart11: '210 100% 60%',
    chart12: '255 60% 80%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '221.2 83.2% 53.3%',
    sidebarPrimaryForeground: '210 40% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: '217.2 32.6% 17.5%',
    sidebarRing: '224.3 76.3% 48%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Blue + Cyan + Indigo + Sky
    gradientBg1: '217 91% 60%',  // Blue
    gradientBg2: '189 94% 43%',  // Cyan
    gradientBg3: '263 90% 51%',  // Indigo
    gradientBg4: '199 89% 48%',  // Sky
    section: '222.2 84% 7%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '221.2 83.2% 53.3%',
    fxTechLine: '221.2 83.2% 53.3%',
    fxTechBorder: '221.2 83.2% 53.3%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
