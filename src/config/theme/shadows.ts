/**
 * Shadow System - Centralized Shadow Configuration
 * Provides a comprehensive set of shadow utilities for UI elements.
 */
export const shadows = {
    /** No shadow */
    none: 'shadow-none',
    /** Small shadow */
    sm: 'shadow-sm',
    /** Base shadow */
    base: 'shadow',
    /** Medium shadow */
    md: 'shadow-md',
    /** Large shadow */
    lg: 'shadow-lg',
    /** Extra large shadow */
    xl: 'shadow-xl',
    /** 2XL shadow */
    '2xl': 'shadow-2xl',
    /** Inner shadow */
    inner: 'shadow-inner',
    // Custom vibrant shadows
    /** Glow effect shadow */
    glow: 'shadow-[0_0_15px_hsl(var(--primary)/35%)]',
    /** Large glow effect shadow */
    'glow-lg': 'shadow-[0_0_25px_hsl(var(--primary)/50%)]',
    'glow-primary': 'shadow-[0_0_20px_-5px_hsl(var(--primary))]',
    'glass-shadow': 'shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]',
} as const;

export default shadows;
