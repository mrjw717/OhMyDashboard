import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Slate color theme.
 */
export const slateTheme: Theme = {
  name: 'slate',
  displayName: 'Slate',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '215.4 16.3% 46.9%',
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
    ring: '215.4 16.3% 46.9%',
    gradientFrom: '215.4 16.3% 46.9%',
    gradientTo: '215.4 16.3% 46.9%',
    chart1: '215.4 16.3% 46.9%', // Primary Slate
    chart2: '217 91% 60%',    // Blue
    chart3: '226 70% 55%',    // Indigo
    chart4: '173 80% 40%',    // Teal
    chart5: '160 84% 39%',    // Emerald
    chart6: '215 25% 35%',    // Deep Slate
    chart7: '210 20% 70%',    // Light Gray
    chart8: '350 70% 55%',    // Rose (Contrast)
    chart9: '35 80% 50%',     // Amber (Contrast)
    chart10: '215 10% 55%',   // Muted Slate
    chart11: '200 80% 60%',   // Sky Blue
    chart12: '240 50% 70%',   // Periwinkle
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '215.4 16.3% 46.9%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: 'transparent',
    sidebarRing: '215.4 16.3% 46.9%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Monochrome with subtle hints
    gradientBg1: '217 30% 60%',  // Blue-gray (Less saturated)
    gradientBg2: '262 30% 60%',  // Violet-gray (Less saturated)
    gradientBg3: '189 30% 60%',  // Cyan-gray (Less saturated)
    gradientBg4: '330 30% 60%',  // Pink-gray (Less saturated)
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    ...commonTextColors.light,
    ...commonTextColors.light, // Duplicate line removed in next cleanup?
    // FX Tokens
    fxTechGlow: '215.4 16.3% 46.9%', // Matches sidebarPrimary
    fxTechLine: '215.4 16.3% 46.9%',
    fxTechBorder: '215.4 16.3% 46.9%',
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
    primary: '215.4 16.3% 46.9%',
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
    ring: '215.4 16.3% 46.9%',
    gradientFrom: '215.4 16.3% 46.9%',
    gradientTo: '215.4 16.3% 46.9%',
    chart1: '215.4 16.3% 46.9%',
    chart2: '217 100% 65%',
    chart3: '226 80% 65%',
    chart4: '173 90% 50%',
    chart5: '160 90% 50%',
    chart6: '215 30% 45%',
    chart7: '210 30% 75%',
    chart8: '350 80% 65%',
    chart9: '35 90% 60%',
    chart10: '215 20% 60%',
    chart11: '200 90% 65%',
    chart12: '240 60% 75%',
    sidebar: '0 0% 3.9%',
    sidebarForeground: '0 0% 98%',
    sidebarPrimary: '215.4 16.3% 46.9%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 14.9%',
    sidebarAccentForeground: '0 0% 98%',
    sidebarBorder: 'transparent',
    sidebarRing: '215.4 16.3% 46.9%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 63.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Monochrome with subtle hints
    gradientBg1: '217 25% 50%',  // Blue-gray (Less saturated)
    gradientBg2: '262 25% 50%',  // Violet-gray (Less saturated)
    gradientBg3: '189 25% 50%',  // Cyan-gray (Less saturated)
    gradientBg4: '330 25% 50%',  // Pink-gray (Less saturated)
    section: '0 0% 6.9%',
    sectionBorder: '0 0% 14.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // Console Tokens (Slate Dark)
    // Console Tokens (Slate Dark)
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
    // FX Tokens
    fxTechGlow: '215.4 16.3% 46.9%',
    fxTechLine: '215.4 16.3% 46.9%',
    fxTechBorder: '215.4 16.3% 46.9%',
  },
}
