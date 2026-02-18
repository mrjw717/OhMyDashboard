/**
 * Scrollbar System - Configuration and CSS Variable mapping
 * Provides scrollbar styling and CSS variable generation for theme integration.
 */
import { ThemeColors } from './types'

export const scrollbar = {
    /** Scrollbar width (thinner, more embedded look) */
    width: '6px', // Thinner, more embedded look
    /** Minimum scrollbar height */
    minHeight: '40px',
    /** Scrollbar corner radius (less rounded, more structural) */
    radius: '4px', // Less rounded, more structural
    /** Scrollbar border (removed floating effect) */
    border: 'none', // Removed floating effect
}

/**
 * Generates scrollbar CSS variables based on the provided theme colors.
 * This ensures the scrollbar matches the active theme presets.
 */
export const getScrollbarVariables = (colors: ThemeColors) => {
    return {
        '--scrollbar-thumb': colors.scrollbarThumb,
        '--scrollbar-track': colors.scrollbarTrack,
        '--scrollbar-width': scrollbar.width,
        '--scrollbar-radius': scrollbar.radius,
        '--scrollbar-thumb-hover': colors.scrollbarThumbHover,
        '--scrollbar-thumb-active': colors.scrollbarThumbActive,
    }
}

export default scrollbar
