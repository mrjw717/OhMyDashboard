/**
 * Console Drawer Type Definitions
 * 
 * This file defines the TypeScript types used across the console drawer components.
 * 
 * DESIGN NOTES:
 * - DrawerTab is a union type for type-safe tab switching
 * - DrawerTabConfig uses React.ComponentType for proper icon typing
 * - Icons must accept className prop for Tailwind styling
 */

/**
 * Available drawer tabs
 * 
 * - 'console': Star topology with 3D cube and orbital control icons
 * - 'metrics': System metrics with live animated graph
 * - 'network': Network topology visualization
 */
export type DrawerTab = 'console' | 'metrics' | 'network'

/**
 * Configuration for a drawer tab
 * 
 * @property id - Tab identifier (matches DrawerTab union)
 * @property label - Human-readable label for tooltip
 * @property icon - Lucide icon component (must accept className prop)
 */
export interface DrawerTabConfig {
    id: DrawerTab
    label: string
    icon: React.ComponentType<{ className?: string }>
}
