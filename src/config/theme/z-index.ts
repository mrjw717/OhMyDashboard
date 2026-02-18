/**
 * Z-Index Management System
 * 
 * Centralized z-index values to prevent conflicts and ensure proper layering.
 * Values are organized by layer from bottom to top.
 */

export const zIndex = {
    /** Background layer - behind everything */
    animatedBackground: -10,

    // Base content layers
    /** Base z-index for standard content */
    base: 0,
    /** Sidebar z-index */
    sidebar: 10,
    /** Sidebar inset z-index */
    sidebarInset: 5,

    // Sidebar footer layers
    sidebarFooterBase: 15,
    sidebarDrawer: 16,
    sidebarDrawerContent: 17,
    sidebarUser: 18,

    // UI elements
    header: 20,
    dropdown: 30,
    tooltip: 40,

    // Overlays
    modal: 50,
    popover: 60,
    toast: 70,

    // Top-most layers
    commandPalette: 80,
    loadingOverlay: 90,
    debugPanel: 100,
} as const

export type ZIndex = typeof zIndex[keyof typeof zIndex]
