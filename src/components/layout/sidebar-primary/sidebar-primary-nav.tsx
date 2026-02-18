"use client"

/**
 * SidebarPrimaryNav - Primary sidebar navigation component
 * 
 * Renders navigation items with collapsible sections and a sheen hover effect
 * that's properly masked to only the text content (not the full container).
 * 
 * SHEEN EFFECT STRUCTURE:
 * The sheen animation requires a nested structure:
 * ```tsx
 * <span className="flex-1 text-left">           // Flex container for layout
 *   <span className="sidebar-link-sheen">       // Sheen effect wrapper (fit-content)
 *     {title}                                   // Actual text content
 *   </span>
 * </span>
 * ```
 * 
 * WHY NESTED SPANS?
 * - Outer span with flex-1: Handles layout, pushes chevron to the right
 * - Inner span with sidebar-link-sheen: Sized to text content via fit-content
 * - This ensures the sheen gradient only spans the text width, not the container
 * 
 * @see _sidebar.css for the .sidebar-link-sheen CSS implementation
 */

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { NavItem } from "@/types/navigation"

interface SidebarPrimaryNavProps {
  items: NavItem[]
}

/**
 * NavLinkText - Inner wrapper for navigation text with sheen effect
 * 
 * Separates the flex layout (outer span) from the sheen effect (this component).
 * This ensures the sheen is sized to the text content, not the flex container.
 * 
 * data-text attribute is used by CSS ::before pseudo-element to create
 * a duplicate text layer for the sheen gradient overlay.
 */
function NavLinkText({ 
  children, 
  isActive 
}: { 
  children: React.ReactNode
  isActive: boolean 
}) {
  const text = typeof children === 'string' ? children : ''
  return (
    <span 
      className="sidebar-link-sheen" 
      data-active={isActive}
      data-text={text}
    >
      {children}
    </span>
  )
}

export function SidebarPrimaryNav({ items }: SidebarPrimaryNavProps) {
  const pathname = usePathname()
  const containerGuide = "w-full max-w-[260px]"

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col items-center gap-3 px-2">
        <SidebarMenu className={containerGuide}>
          {items.map((item) => {
            if (item.items && item.items.length > 0) {
              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton tooltip={item.title} isActive={pathname === item.url} variant="futuristic">
                        {item.icon && <item.icon className="shrink-0 text-sidebar-primary" />}
                        {/**
                         * Outer span: flex-1 for layout (pushes chevron right)
                         * Inner NavLinkText: fit-content for sheen masking
                         */}
                        <span className="flex-1 text-left">
                          <NavLinkText isActive={pathname === item.url}>
                            {item.title}
                          </NavLinkText>
                        </span>
                        <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <SidebarMenuSub className="pl-3">
                        {item.items.map((subItem) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild isActive={pathname === subItem.url} className="text-sidebar-foreground/80 transition-colors hover:text-sidebar-foreground">
                              <Link href={subItem.url} className="flex items-center gap-2">
                                <span className="block h-1 w-1 rounded-full bg-sidebar-border group-hover/menu-sub-item:bg-sidebar-primary transition-colors" />
                                <NavLinkText isActive={pathname === subItem.url}>
                                  {subItem.title}
                                </NavLinkText>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              )
            }

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.url}
                  variant="futuristic"
                  className="justify-start"
                >
                  <Link href={item.url}>
                    {item.icon && <item.icon className="shrink-0 text-sidebar-primary" />}
                    <span className="flex-1 text-left">
                      <NavLinkText isActive={pathname === item.url}>
                        {item.title}
                      </NavLinkText>
                    </span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
