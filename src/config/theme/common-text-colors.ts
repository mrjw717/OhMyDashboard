/**
 * Common Text Colors - Applied across all themes
 * 
 * Color Theory Principles:
 * - Light mode: Never pure black (too harsh), use dark gray tones
 * - Dark mode: Never pure white (eye strain), use silver/gray tones
 * - Primary used sparingly for emphasis
 * 
 * NOTE: FX tech colors (fxTechGlow, fxTechLine, fxTechBorder) are NOT here
 * because they should reference each theme's primary color dynamically.
 * They are set in globals.css to reference var(--primary) directly.
 */

export const commonTextColors = {
  light: {
    textPrimary: '222.2 47.4% 11.2%',
    textSecondary: '215.4 16.3% 46.9%',
    textMuted: '215.4 16.3% 66.9%',
    textDisabled: '215.4 16.3% 76.9%',
    textInverse: '210 40% 98%',
    bgPrimary: '0 0% 100%',
    bgSecondary: '210 40% 96.1%',
    bgTertiary: '210 40% 92.1%',
    bgElevated: '0 0% 100%',
    borderHover: '214.3 31.8% 81.4%',
    borderFocus: '262.1 83.3% 57.8%',
    colorSuccess: '142.1 76.2% 36.3%',
    colorWarning: '38 92% 50%',
    colorError: '0 84.2% 60.2%',
    colorInfo: '199 89% 48%',
    scrollbarThumbHover: '0 0% 35%',
    scrollbarThumbActive: '0 0% 25%',
    consoleButtonSize: '2.75rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '0.75rem',
    consoleCubeScale: '0.12',
  },
  dark: {
    textPrimary: '210 20% 90%',
    textSecondary: '215 20% 70%',
    textMuted: '215 15% 50%',
    textDisabled: '215 10% 35%',
    textInverse: '222.2 84% 4.9%',
    bgPrimary: '222.2 84% 4.9%',
    bgSecondary: '217.2 32.6% 12.5%',
    bgTertiary: '217.2 32.6% 17.5%',
    bgElevated: '222.2 84% 8%',
    borderHover: '217.2 32.6% 30%',
    borderFocus: '263.4 70% 50.4%',
    colorSuccess: '142.1 70% 45%',
    colorWarning: '38 92% 50%',
    colorError: '0 72% 51%',
    colorInfo: '199 89% 48%',
    scrollbarThumbHover: '0 0% 75%',
    scrollbarThumbActive: '0 0% 85%',
    consoleButtonSize: '2.75rem',
    consoleIconSize: '1.5rem',
    consoleSpreadRadius: '0.75rem',
    consoleCubeScale: '0.12',
  },
}

export default commonTextColors
