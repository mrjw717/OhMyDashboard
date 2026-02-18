/**
 * Layout dimensions and breakpoints.
 */
export const LAYOUT = {
    SIDEBAR_PRIMARY_WIDTH: '16rem',
    SIDEBAR_SECONDARY_WIDTH: '16rem',
    SIDEBAR_COLLAPSED_WIDTH: '3rem',
    SIDEBAR_MOBILE_WIDTH: '18rem',
    HEADER_HEIGHT: '3.5rem',
    SHELL_BORDER_RADIUS: '1.5rem',
    SHELL_PADDING: '1.5rem',
    MOBILE_BREAKPOINT: 768,
} as const

/**
 * Z-index layering for stacking context.
 */
export const Z_INDEX = {
    BACKGROUND: -10,
    SHELL_GLOW: -1,
    SIDEBAR_SECONDARY: 0,
    SIDEBAR_PRIMARY: 10,
    SIDEBAR_RAIL: 20,
    HEADER: 100,
    TOOLTIP: 200,
    MODAL: 300,
    TOAST: 400,
} as const

/**
 * Animation durations and transitions.
 */
export const ANIMATION = {
    SIDEBAR_TRANSITION: 'duration-200 ease-linear',
    SHELL_GLOW_DURATION: 45,
} as const

/**
 * Cookie configuration for persistence.
 */
export const COOKIE = {
    SIDEBAR_STATE: 'sidebar_state',
    SIDEBAR_MAX_AGE: 60 * 60 * 24 * 7,
    THEME: 'theme',
} as const
