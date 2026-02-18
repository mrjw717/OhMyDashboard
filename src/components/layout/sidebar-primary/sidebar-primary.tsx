"use client"

import * as React from "react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { SidebarPrimaryNav } from "./sidebar-primary-nav"
import { SidebarPrimaryUserMenu } from "./sidebar-primary-user-menu"
import { ConsoleDrawer } from "@/components/layout/console-drawer"
import { navPrimaryItems, defaultUser } from "@/config/navigation"
import { zIndex } from "@/config/theme/z-index"
import { SidebarDivider } from "@/components/layout/sidebar-divider"

export type SidebarPrimaryProps = React.ComponentProps<typeof Sidebar>

export function SidebarPrimary({ ...props }: SidebarPrimaryProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="pt-6">
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex w-full justify-center px-2 py-1 group-data-[collapsible=icon]:px-0">
              <div className="flex items-center gap-3 rounded-lg px-2 text-center group-data-[collapsible=icon]:hidden">
                <div className="relative flex h-10 w-12 items-center justify-center rounded-md border border-[hsl(var(--sidebar-border)/0.4)] bg-[hsl(var(--sidebar-primary)/0.08)] text-[hsl(var(--sidebar-primary))] shadow-[0_0_12px_hsl(var(--sidebar-primary)/0.25)]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1090 620"
                    className="z-10 h-6 w-9"
                    role="img"
                    aria-label="Oh My Dashboard logo"
                  >
                    <g fill="currentColor" stroke="none" strokeWidth="0">
                      <path d="M 162 240 L 960 240 L 960 240 L 960 348 A 32 32 0 0 1 928 380 L 130 380 L 130 380 L 130 272 A 32 32 0 0 1 162 240 Z" />
                      <path d="M 992 190 L 1048 190 A 32 32 0 0 1 1080 222 L 1080 238 A 32 32 0 0 1 1048 270 L 960 270 L 960 270 L 960 222 A 32 32 0 0 1 992 190 Z" />
                      <path d="M 42 380 L 190 380 L 190 380 L 190 468 A 32 32 0 0 1 158 500 L 42 500 A 32 32 0 0 1 10 468 L 10 412 A 32 32 0 0 1 42 380 Z" />
                      <path d="M 512 10 L 558 10 A 32 32 0 0 1 590 42 L 590 240 L 590 240 L 480 240 L 480 240 L 480 42 A 32 32 0 0 1 512 10 Z" />
                      <path d="M 490 380 L 600 380 L 600 380 L 600 578 A 32 32 0 0 1 568 610 L 522 610 A 32 32 0 0 1 490 578 L 490 380 L 490 380 Z" />
                      <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" transform="translate(960, 302)" />
                      <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" transform="translate(190, 412)" />
                      <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" transform="translate(480, 208)" />
                      <path d="M 0 0 C 0 23.872 5.76 32 32 32 H 0 Z" transform="translate(590, 208)" />
                      <path d="M 0 0 C 0 -23.872 -5.76 -32 -32 -32 H 0 Z" transform="translate(490, 412)" />
                      <path d="M 0 0 C 0 -23.872 5.76 -32 32 -32 H 0 Z" transform="translate(600, 412)" />
                      <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" transform="translate(960, 208)" />
                      <path d="M 0 0 C 0 23.872 -5.76 32 -32 32 H 0 Z" transform="translate(130, 348)" />
                    </g>
                  </svg>
                </div>
                <span className="text-base font-extrabold tracking-tight text-[hsl(var(--sidebar-primary))] drop-shadow-[0_0_12px_hsl(var(--sidebar-primary)/0.45)]">
                  Oh My Dashboard!
                </span>
              </div>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarDivider className="mt-1" />
      </SidebarHeader>
      <SidebarContent className="items-center px-2">
        <SidebarPrimaryNav items={navPrimaryItems} />
      </SidebarContent>
      <SidebarFooter className="relative">
        <ConsoleDrawer />
        <div style={{ zIndex: zIndex.sidebarUser }} className="relative">
          <SidebarPrimaryUserMenu user={defaultUser} />
        </div>
      </SidebarFooter>
    </Sidebar >
  )
}
