import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Neutral color theme.
 */
export const neutralTheme: Theme = {
  name: 'neutral',
  displayName: 'Neutral',
  light: {
    background: '0 0% 99%', // Off-white
    foreground: '240 10% 3.9%', // Off-black
    card: '0 0% 99%',
    cardForeground: '240 10% 3.9%',
    popover: '0 0% 99%',
    popoverForeground: '240 10% 3.9%',
    primary: '240 5.9% 10%',
    primaryForeground: '0 0% 98%',
    secondary: '240 4.8% 95.9%',
    secondaryForeground: '240 5.9% 10%',
    muted: '240 4.8% 95.9%',
    mutedForeground: '240 3.8% 46.1%',
    accent: '240 4.8% 95.9%',
    accentForeground: '240 5.9% 10%',
    destructive: '0 84.2% 60.2%',
    destructiveForeground: '0 0% 98%',
    border: '240 5.9% 90%',
    input: '240 5.9% 90%',
    ring: '240 10% 3.9%',
    gradientFrom: '0 0% 27%',
    gradientTo: '0 0% 5%',
    chart1: '220 70% 50%', // Slate
    chart2: '350 70% 50%', // Rose
    chart3: '35 80% 50%',  // Amber
    chart4: '150 60% 45%', // Emerald
    chart5: '240 60% 60%', // Indigo
    chart6: '190 70% 50%', // Cyan
    chart7: '270 60% 60%', // Violet
    chart8: '25 80% 55%',  // Orange
    chart9: '80 70% 50%',  // Lime
    chart10: '170 70% 40%',// Teal
    chart11: '330 70% 60%',// Pink
    chart12: '30 40% 45%', // Brown/Tan
    sidebar: '0 0% 98%',
    sidebarForeground: '220 9% 46%',
    sidebarPrimary: '240 5.9% 10%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '240 4.8% 95.9%',
    sidebarAccentForeground: '240 5.9% 10%',
    sidebarBorder: '220 13% 91%',
    sidebarRing: '217.2 91.2% 59.8%',
    radius: '0.5rem',
    scrollbarThumb: '240 5% 64.9%', // Darker thumb for better contrast on off-white
    scrollbarTrack: 'transparent',
    // Animated gradient background - Use primary color with slight variations
    gradientBg1: '240 6% 10%',
    gradientBg2: '240 6% 15%',
    gradientBg3: '220 6% 12%',
    gradientBg4: '240 6% 8%',
    section: '0 0% 100%',
    sectionBorder: '240 5.9% 90%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '240 5.9% 10%',
    fxTechLine: '240 5.9% 10%',
    fxTechBorder: '240 5.9% 10%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
  dark: {
    background: '240 10% 3.9%', // Off-black
    foreground: '0 0% 98%',
    card: '240 10% 3.9%',
    cardForeground: '0 0% 98%',
    popover: '240 10% 3.9%',
    popoverForeground: '0 0% 98%',
    primary: '0 0% 98%',
    primaryForeground: '240 5.9% 10%',
    secondary: '240 3.7% 15.9%',
    secondaryForeground: '0 0% 98%',
    muted: '240 3.7% 15.9%',
    mutedForeground: '240 5% 64.9%',
    accent: '240 3.7% 15.9%',
    accentForeground: '0 0% 98%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '0 0% 98%',
    border: '240 3.7% 15.9%',
    input: '240 3.7% 15.9%',
    ring: '240 4.9% 83.9%',
    gradientFrom: '0 0% 90%',
    gradientTo: '0 0% 70%',
    chart1: '220 80% 60%',
    chart2: '350 80% 60%',
    chart3: '35 90% 60%',
    chart4: '150 70% 55%',
    chart5: '240 70% 70%',
    chart6: '190 80% 60%',
    chart7: '270 70% 70%',
    chart8: '25 90% 65%',
    chart9: '80 80% 60%',
    chart10: '170 80% 50%',
    chart11: '330 80% 70%',
    chart12: '30 50% 55%',
    sidebar: '240 5.9% 10%',
    sidebarForeground: '240 4.8% 95.9%',
    sidebarPrimary: '224.3 76.3% 48%',
    sidebarPrimaryForeground: '0 0% 100%',
    sidebarAccent: '240 3.7% 15.9%',
    sidebarAccentForeground: '240 4.8% 95.9%',
    sidebarBorder: '240 3.7% 15.9%',
    sidebarRing: '217.2 91.2% 59.8%',
    radius: '0.5rem',
    scrollbarThumb: '240 5% 64.9%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Use primary color with variations
    gradientBg1: '0 0% 98%',
    gradientBg2: '0 0% 92%',
    gradientBg3: '0 0% 95%',
    gradientBg4: '0 0% 88%',
    section: '240 10% 6%',
    sectionBorder: '240 3.7% 15.9%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '0 0% 98%',
    fxTechLine: '0 0% 98%',
    fxTechBorder: '0 0% 98%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}

