/**
 * Radius System - Border Radius Tokens
 * Provides a comprehensive set of border radius utilities for UI elements.
 */
export const radius = {
    /** No border radius */
    none: 'rounded-none',
    /** Extra small radius (2px) */
    xs: 'rounded-xs', // 2px
    /** Small radius (4px) */
    sm: 'rounded-sm', // 4px
    /** Medium radius (6px) */
    md: 'rounded-md', // 6px
    /** Large radius (8px) */
    lg: 'rounded-lg', // 8px
    /** Extra large radius (12px) */
    xl: 'rounded-xl', // 12px
    /** 2XL radius (16px) */
    '2xl': 'rounded-2xl', // 16px
    /** 3XL radius (24px) */
    '3xl': 'rounded-3xl', // 24px
    /** Full radius (pill shape) */
    full: 'rounded-full',
} as const;

export default radius;
