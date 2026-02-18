/**
 * Console Drawer View Exports
 * 
 * This module exports the three view components for the console drawer.
 * Each view is self-contained and renders within the drawer's content area.
 * 
 * VIEW SIZING CONTRACT:
 * - All views receive a fixed-height container (DRAWER_HEIGHT from parent)
 * - Views must fill 100% width and height of their container
 * - Views should center their content vertically and horizontally
 * - Views should use CSS theme tokens, not hardcoded colors/sizes
 * 
 * AVAILABLE VIEWS:
 * - ConsoleView: Star topology with 3D isometric cube and control icons
 * - MetricsView: System metrics (CPU/MEM/NET/DSK) with live graph
 * - NetworkView: Server topology with status indicators
 */
export { ConsoleView } from './console-view'
export { MetricsView } from './metrics-view'
export { NetworkView } from './network-view'
