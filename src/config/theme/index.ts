export * from './types'
export * from './themes'
export * from './theme-provider'
export * from './use-theme'
export * from './typography'
export * from './shadows'
export * from './surfaces'
export * from './buttons'
export * from './radius'
export * from './component-styles'
export * from './common'
export * from './input-formatters'
export * from './input-validators'
export * from './input-styles'
export * from './colors'
export * from './z-index'
export * from './scrollbar'

import { typography } from './typography'
import { shadows } from './shadows'
import { surfaces } from './surfaces'
import { buttons } from './buttons'
import { radius } from './radius'
import { formatters } from './input-formatters'
import { validators } from './input-validators'
import { inputStyles } from './input-styles'
import { colors, textColors, textClasses } from './colors'
import { zIndex } from './z-index'
import { scrollbar, getScrollbarVariables } from './scrollbar'

/**
 * Main theme configuration object.
 * Combines all theme modules into a single export.
 */
export const theme = {
    typography,
    shadows,
    surfaces,
    buttons,
    radius,
    formatters,
    validators,
    inputStyles,
    colors,
    textColors,
    textClasses,
    zIndex,
    scrollbar,
    getScrollbarVariables,
} as const;

export default theme;
