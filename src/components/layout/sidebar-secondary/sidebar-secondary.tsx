"use client"

import * as React from "react"
import {
  RightSidebar,
  RightSidebarContent,
  RightSidebarHeader,
} from "@/components/ui/right-sidebar"

import { SidebarDivider } from "@/components/layout/sidebar-divider"
import { useSecondarySidebarStore } from "@/stores"

export function SidebarSecondary({ ...props }: React.ComponentProps<typeof RightSidebar>) {
  const { component, title } = useSecondarySidebarStore()
  return (
    <RightSidebar collapsible="offcanvas" side="right" {...props}>
      <RightSidebarHeader className="pt-6">
        <div className="flex items-center gap-3 px-2 py-1">
          <div className="relative flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-accent-foreground shadow-[0_0_10px_hsl(var(--sidebar-accent)/0.2)] ring-1 ring-sidebar-border">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4"
            >
              <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
              <line x1="3" x2="21" y1="9" y2="9" />
              <line x1="9" x2="9" y1="21" y2="9" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5 leading-none">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/50">Module</span>
            <span className="text-sm font-bold tracking-tight text-sidebar-foreground">{title || "OPERATIONS"}</span>
          </div>
        </div>
        <SidebarDivider className="mt-1" />
      </RightSidebarHeader>
      <RightSidebarContent>
        {component ? component : (
          <div className="p-4 text-sm text-sidebar-foreground/70">
            {/* Default Content */}
            <p>Select a module to view options.</p>
          </div>
        )}
      </RightSidebarContent>
    </RightSidebar>
  )
}
