import type { ResponsiveLayouts } from "react-grid-layout"

export type DashboardBreakpoint = keyof typeof DASHBOARD_GRID_BREAKPOINTS

export const DASHBOARD_GRID_BREAKPOINTS = {
  lg: 1200,
  md: 996,
  sm: 768,
  xs: 480,
  xxs: 0,
} as const

export const DASHBOARD_GRID_COLS = {
  lg: 12,
  md: 8,
  sm: 4,
  xs: 2,
  xxs: 1,
} as const

export const DEFAULT_DASHBOARD_LAYOUTS: ResponsiveLayouts = {
  lg: [
    { i: "arr-velocity", x: 0, y: 0, w: 5, h: 8 },
    { i: "pipeline", x: 0, y: 8, w: 5, h: 8 },
    { i: "profit-quality", x: 5, y: 0, w: 7, h: 16 },
    { i: "traffic", x: 0, y: 16, w: 4, h: 8 },
    { i: "system-health", x: 4, y: 16, w: 4, h: 8 },
    { i: "user-growth", x: 8, y: 16, w: 4, h: 8 },
    { i: "regional-sales", x: 0, y: 24, w: 12, h: 8 },
  ],
  md: [
    { i: "arr-velocity", x: 0, y: 0, w: 4, h: 8 },
    { i: "pipeline", x: 0, y: 8, w: 4, h: 8 },
    { i: "profit-quality", x: 4, y: 0, w: 4, h: 16 },
    { i: "traffic", x: 0, y: 16, w: 4, h: 8 },
    { i: "system-health", x: 4, y: 16, w: 4, h: 8 },
    { i: "user-growth", x: 0, y: 24, w: 8, h: 8 },
    { i: "regional-sales", x: 0, y: 32, w: 8, h: 8 },
  ],
  sm: [
    { i: "arr-velocity", x: 0, y: 0, w: 4, h: 8 },
    { i: "pipeline", x: 0, y: 8, w: 4, h: 8 },
    { i: "profit-quality", x: 0, y: 16, w: 4, h: 16 },
    { i: "traffic", x: 0, y: 32, w: 4, h: 8 },
    { i: "system-health", x: 0, y: 40, w: 4, h: 8 },
    { i: "user-growth", x: 0, y: 48, w: 4, h: 8 },
    { i: "regional-sales", x: 0, y: 56, w: 4, h: 8 },
  ],
}
