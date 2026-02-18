/**
 * Represents the full set of color tokens required for a theme in both light and dark modes.
 * These map directly to standard ShadCN/Tailwind CSS variables (e.g., `background` -> `--background`).
 */
export interface ThemeColors {
  background: string
  foreground: string
  card: string
  cardForeground: string
  popover: string
  popoverForeground: string
  primary: string
  primaryForeground: string
  secondary: string
  secondaryForeground: string
  muted: string
  mutedForeground: string
  accent: string
  accentForeground: string
  destructive: string
  destructiveForeground: string
  border: string
  input: string
  ring: string
  // Theme-specific gradient endpoints for Magic Card borders (H S% L%)
  gradientFrom: string
  gradientTo: string
  // Standard chart colors
  chart1: string
  chart2: string
  chart3: string
  chart4: string
  chart5: string
  chart6: string
  chart7: string
  chart8: string
  chart9: string
  chart10: string
  chart11: string
  chart12: string
  // Sidebar specific tokens
  sidebar: string
  sidebarForeground: string
  sidebarPrimary: string
  sidebarPrimaryForeground: string
  sidebarAccent: string
  sidebarAccentForeground: string
  sidebarBorder: string
  sidebarRing: string
  radius: string
  // Scrollbar specific tokens
  scrollbarThumb: string
  scrollbarTrack: string
  scrollbarThumbHover: string
  scrollbarThumbActive: string
  // Animated gradient background colors (4 layers)
  gradientBg1: string  // Primary gradient color
  gradientBg2: string  // Secondary gradient color
  gradientBg3: string  // Tertiary gradient color
  gradientBg4: string  // Quaternary gradient color
  // Extended Instructor Chart Colors (1-16)
  chartInst1: string
  chartInst2: string
  chartInst3: string
  chartInst4: string
  chartInst5: string
  chartInst6: string
  chartInst7: string
  chartInst8: string
  chartInst9: string
  chartInst10: string
  chartInst11: string
  chartInst12: string
  chartInst13: string
  chartInst14: string
  chartInst15: string
  chartInst16: string
  // Section/Surface specific tokens
  section: string
  sectionBorder: string
  // Text color tokens (using color theory - never pure black/white)
  textPrimary: string
  textSecondary: string
  textMuted: string
  textDisabled: string
  textInverse: string
  // Background tokens
  bgPrimary: string
  bgSecondary: string
  bgTertiary: string
  bgElevated: string
  // Border tokens with hover states
  borderHover: string
  borderFocus: string
  // Feedback colors (success, warning, error, info)
  colorSuccess: string
  colorWarning: string
  colorError: string
  colorInfo: string
  // Console size tokens (FX colors use --primary dynamically via CSS)
  consoleButtonSize: string
  consoleIconSize: string
  consoleSpreadRadius: string
  // FX tech tokens (glow, line, border colors for console effects)
  fxTechGlow: string
  fxTechLine: string
  fxTechBorder: string
}

/**
 * Definition of a complete theme, containing metadata and color palettes for both modes.
 */
export interface Theme {
  /** Unique identifier for the theme (e.g., 'blue', 'slate') */
  name: string
  /** Human-readable name for UI display */
  displayName: string
  /** Color tokens for light mode */
  light: ThemeColors
  /** Color tokens for dark mode */
  dark: ThemeColors
}
