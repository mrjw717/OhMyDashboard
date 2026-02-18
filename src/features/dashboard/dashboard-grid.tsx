"use client"

import * as React from "react"
import {
  Responsive,
  useContainerWidth,
  type ResponsiveLayouts,
} from "react-grid-layout"
import {
  DASHBOARD_GRID_BREAKPOINTS,
  DASHBOARD_GRID_COLS,
} from "@/config/constants/dashboard-layout"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"

interface DashboardGridItem {
  id: string
  node: React.ReactNode
}

interface DashboardGridProps {
  layouts: ResponsiveLayouts
  items: DashboardGridItem[]
  allowEditing?: boolean
  onLayoutsChange?: (layouts: ResponsiveLayouts) => void
}

export function DashboardGrid({
  layouts,
  items,
  allowEditing = false,
  onLayoutsChange,
}: DashboardGridProps) {
  const { width, containerRef, mounted } = useContainerWidth()

  return (
    <div ref={containerRef} className="w-full">
      {mounted && (
        <Responsive
          className="dashboard-grid"
          breakpoints={DASHBOARD_GRID_BREAKPOINTS}
          cols={DASHBOARD_GRID_COLS}
          layouts={layouts}
          width={width}
          rowHeight={40}
          margin={[16, 16]}
          containerPadding={[0, 0]}
          autoSize
          dragConfig={{ enabled: allowEditing, bounded: false }}
          resizeConfig={{ enabled: allowEditing }}
          onLayoutChange={(_, updatedLayouts) => {
            if (updatedLayouts && onLayoutsChange) {
              onLayoutsChange(updatedLayouts)
            }
          }}
        >
          {items.map((item) => (
            <div key={item.id} className="h-full w-full" data-grid-item={item.id}>
              {item.node}
            </div>
          ))}
        </Responsive>
      )}
    </div>
  )
}
