import { Theme } from '../types'
import { commonChartColors } from '../common'
import { commonTextColors } from '../common-text-colors'

/**
 * Stone color theme.
 */
export const stoneTheme: Theme = {
  name: 'stone',
  displayName: 'Stone',
  light: {
    background: '0 0% 100%',
    foreground: '0 0% 3.9%',
    card: '0 0% 100%',
    cardForeground: '0 0% 3.9%',
    popover: '0 0% 100%',
    popoverForeground: '0 0% 3.9%',
    primary: '24 5.4% 63.9%',
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
    ring: '24 5.4% 63.9%',
    gradientFrom: '24 5.4% 63.9%',
    gradientTo: '24 5.4% 63.9%',
    chart1: '24 5.4% 63.9%',  // Primary Stone
    chart2: '25 95% 53%',     // Orange
    chart3: '35 80% 50%',     // Amber
    chart4: '84 81% 44%',     // Lime
    chart5: '142 76% 36%',    // Green
    chart6: '24 10% 40%',     // Deep Stone
    chart7: '30 20% 75%',     // Warm Gray
    chart8: '210 60% 50%',    // Blue (Contrast)
    chart9: '280 50% 55%',    // Purple (Contrast)
    chart10: '24 10% 55%',    // Muted Stone
    chart11: '12 80% 60%',    // Rust
    chart12: '45 40% 70%',    // Sand
    sidebar: '0 0% 98%',
    sidebarForeground: '0 0% 3.9%',
    sidebarPrimary: '24 5.4% 63.9%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '0 0% 96.1%',
    sidebarAccentForeground: '0 0% 9%',
    sidebarBorder: '0 0% 89.8%',
    sidebarRing: '24 5.4% 63.9%',
    radius: '0.5rem',
    scrollbarThumb: '0 0% 45.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Monochrome with subtle hints
    gradientBg1: '217 10% 50%',  // Blue-gray
    gradientBg2: '262 10% 50%',  // Violet-gray
    gradientBg3: '189 10% 50%',  // Cyan-gray
    gradientBg4: '330 10% 50%',  // Pink-gray
    section: '0 0% 100%',
    sectionBorder: '0 0% 89.8%',
    ...commonChartColors.light,
    ...commonTextColors.light,
    // FX Tokens
    fxTechGlow: '24 5.4% 63.9%',
    fxTechLine: '24 5.4% 63.9%',
    fxTechBorder: '24 5.4% 63.9%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
  dark: {
    background: '0 0% 0%', // Pure black for high contrast
    foreground: '60 9.1% 97.8%',
    card: '24 9.8% 10%', // Very dark warm gray/brown
    cardForeground: '60 9.1% 97.8%',
    popover: '20 14.3% 4.1%',
    popoverForeground: '60 9.1% 97.8%',
    primary: '24 5.4% 63.9%',
    primaryForeground: '60 9.1% 97.8%',
    secondary: '12 6.5% 15.1%',
    secondaryForeground: '60 9.1% 97.8%',
    muted: '12 6.5% 15.1%',
    mutedForeground: '24 5.4% 63.9%',
    accent: '12 6.5% 15.1%',
    accentForeground: '60 9.1% 97.8%',
    destructive: '0 62.8% 30.6%',
    destructiveForeground: '60 9.1% 97.8%',
    border: '12 6.5% 15.1%',
    input: '12 6.5% 15.1%',
    ring: '24 5.4% 63.9%',
    gradientFrom: '24 5.4% 63.9%',
    gradientTo: '24 5.4% 63.9%',
    chart1: '24 5.4% 63.9%',
    chart2: '27 96% 61%',
    chart3: '33 100% 70%',
    chart4: '142 69% 58%',
    chart5: '199 89% 48%',
    chart6: '24 15% 50%',
    chart7: '30 25% 80%',
    chart8: '210 70% 60%',
    chart9: '280 60% 65%',
    chart10: '24 15% 65%',
    chart11: '12 90% 65%',
    chart12: '45 50% 75%',
    sidebar: '24 9.8% 10%',
    sidebarForeground: '60 9.1% 97.8%',
    sidebarPrimary: '24 5.4% 63.9%',
    sidebarPrimaryForeground: '0 0% 98%',
    sidebarAccent: '12 6.5% 15.1%',
    sidebarAccentForeground: '60 9.1% 97.8%',
    sidebarBorder: '12 6.5% 15.1%',
    sidebarRing: '24 5.4% 63.9%',
    radius: '0.5rem',
    scrollbarThumb: '12 6.5% 15.1%',
    scrollbarTrack: 'transparent',
    // Animated gradient background - Darker, richer tones
    gradientBg1: '220 20% 10%',  // Deep Blue
    gradientBg2: '260 20% 10%',  // Deep Violet
    gradientBg3: '180 20% 10%',  // Deep Cyan
    gradientBg4: '340 20% 10%',  // Deep Pink
    section: '0 0% 0%',
    sectionBorder: '12 6.5% 15.1%',
    ...commonChartColors.dark,
    ...commonTextColors.dark,
    // FX Tokens
    fxTechGlow: '24 5.4% 63.9%',
    fxTechLine: '24 5.4% 63.9%',
    fxTechBorder: '24 5.4% 63.9%',
    // Console Tokens
    consoleButtonSize: '3rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '8px',
  },
}
