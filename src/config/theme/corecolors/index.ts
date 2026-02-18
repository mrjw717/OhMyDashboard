/**
 * Core color theme exports.
 * Provides access to all available color themes for the application.
 */

// Theme types
export type { Theme, ThemeColors } from '../types'

// Individual theme exports
export { neutralTheme } from './neutral'
export { redTheme } from './red'
export { roseTheme } from './rose'
export { orangeTheme } from './orange'
export { greenTheme } from './green'
export { blueTheme } from './blue'
export { yellowTheme } from './yellow'
export * from './violet'
export * from './slate'
export * from './stone'
export * from './indigo'
export * from './cyan'
export * from './lime'
export * from './emerald'
export * from './fuchsia'
export * from './pink'

// All themes array
export { themes } from '../themes'

// Theme utilities and hooks
export * from '../theme-provider'
export * from '../use-theme'

// Typography system
export * from '../typography'
export { typography as default } from '../typography'
