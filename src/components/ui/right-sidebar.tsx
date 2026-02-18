/**
 * @fileoverview Right Sidebar Component System
 * 
 * ARCHITECTURE OVERVIEW:
 * This file implements the SECONDARY (right) sidebar system.
 * It mirrors the left sidebar structure but with key differences for proper
 * visual layering with the floating shell glow effect.
 * 
 * CRITICAL DESIGN DECISIONS - DO NOT MODIFY WITHOUT EXPLICIT PERMISSION:
 * 
 * 1. Z-INDEX VALUES (DIFFERENT FROM LEFT SIDEBAR):
 *    - Right sidebar container: z-0 (NOT z-10)
 *    - Right sidebar rail: z-20 (same as left)
 *    
 *    WHY z-0 INSTEAD OF z-10:
 *    The center shell has a glow effect that extends beyond its boundaries.
 *    If the right sidebar had z-10, it would visually sit ABOVE the glow,
 *    creating a jarring "cutoff" effect where the glow disappears.
 *    By using z-0, the glow appears to pass "over" the right sidebar.
 * 
 *    This is the KEY DIFFERENCE from the left sidebar (which uses z-10).
 * 
 * 2. DATA ATTRIBUTES (DIFFERENT FROM LEFT SIDEBAR):
 *    - data-right-sidebar="sidebar" instead of data-sidebar="sidebar"
 *    - data-right-sidebar-provider for the provider wrapper
 *    - data-right-sidebar="container" for the fixed container
 *    
 *    WHY DIFFERENT ATTRIBUTES:
 *    globals.css uses these attributes to target CSS rules.
 *    Separate attributes allow different styling rules for left vs right.
 *    The left sidebar rules use [data-sidebar="sidebar"]
 *    The right sidebar rules use [data-right-sidebar="sidebar"]
 * 
 * 3. WIDTH CONSTANTS (SAME AS LEFT SIDEBAR):
 *    - SIDEBAR_WIDTH: 16rem (256px) - must match left sidebar
 *    - SIDEBAR_WIDTH_ICON: 3rem (48px) - must match left sidebar
 *    - This ensures visual symmetry between both sidebars
 * 
 * 4. MainContentAreaRight MUST NOT have overflow-hidden:
 *    - Same reasoning as left MainContentArea
 *    - The shell glow must not be clipped
 * 
 * 5. TRANSPARENCY:
 *    - All backgrounds forced transparent via globals.css
 *    - Uses CSS variable overrides: --right-sidebar-background, etc.
 *    - DO NOT add background colors to sidebar elements
 * 
 * RELATIONSHIP TO LEFT SIDEBAR:
 * - This file is nearly identical to sidebar.tsx
 * - Key differences: z-index values, data attribute names, CSS variable names
 * - When updating one, consider if the other needs matching changes
 * 
 * @see sidebar.tsx for the primary (left) sidebar
 * @see globals.css for transparency enforcement rules
 * @see themes/z-index.ts for z-index configuration
 */
"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { PanelRightIcon } from "lucide-react"

import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { surfaces, shadows, radius } from "@/config/theme"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { SidebarDivider } from "@/components/layout/sidebar-divider"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

/**
 * Right sidebar width constants
 * 
 * MUST MATCH LEFT SIDEBAR for visual symmetry:
 * - 16rem: Standard width (matches left sidebar)
 * - 3rem: Icon-only collapsed state (matches left sidebar)
 * - 18rem: Mobile sheet width (matches left sidebar)
 */
const SIDEBAR_COOKIE_NAME = "sidebar_right_state"
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7
const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_MOBILE = "18rem"
const SIDEBAR_WIDTH_ICON = "3rem"
const SIDEBAR_KEYBOARD_SHORTCUT = "b"

/**
 * Right sidebar context type definition
 */
type RightSidebarContextProps = {
  state: "expanded" | "collapsed"
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleRightSidebar: () => void
}

const RightSidebarContext = React.createContext<RightSidebarContextProps | null>(null)

/**
 * Hook to access right sidebar context
 * 
 * @throws Error if used outside RightSidebarProvider
 */
function useRightSidebar() {
  const context = React.useContext(RightSidebarContext)
  if (!context) {
    throw new Error("useRightSidebar must be used within a RightSidebarProvider.")
  }

  return context
}

/**
 * RightSidebarProvider Component
 * 
 * PURPOSE: Same as SidebarProvider but for the right sidebar
 * 
 * CRITICAL DATA ATTRIBUTE:
 * - data-right-sidebar-provider: Used by globals.css to target this wrapper
 * 
 * CSS VARIABLE INJECTIONS:
 * - --right-sidebar-width: Width for expanded state
 * - --right-sidebar-width-icon: Width for collapsed icon state
 * - --right-sidebar-* variables: Mirror of left sidebar variables
 * 
 * WHY SEPARATE VARIABLES:
 * Allows different styling/theming for left vs right sidebar if needed.
 * Currently both use the same values, but architecture allows flexibility.
 */
function RightSidebarProvider({
  defaultOpen = true,
  open: openProp,
  onOpenChange: setOpenProp,
  className,
  style,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}) {
  const isMobile = useIsMobile()
  const [openMobile, setOpenMobile] = React.useState(false)

  const [_open, _setOpen] = React.useState(defaultOpen)
  const open = openProp ?? _open
  const setOpen = React.useCallback(
    (value: boolean | ((value: boolean) => boolean)) => {
      const openState = typeof value === "function" ? value(open) : value
      if (setOpenProp) {
        setOpenProp(openState)
      } else {
        _setOpen(openState)
      }

      document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`
    },
    [setOpenProp, open]
  )

  const toggleRightSidebar = React.useCallback(() => {
    return isMobile ? setOpenMobile((open) => !open) : setOpen((open) => !open)
  }, [isMobile, setOpen, setOpenMobile])

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault()
        toggleRightSidebar()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [toggleRightSidebar])

  const state = open ? "expanded" : "collapsed"

  const contextValue = React.useMemo<RightSidebarContextProps>(
    () => ({
      state,
      open,
      setOpen,
      isMobile,
      openMobile,
      setOpenMobile,
      toggleRightSidebar,
    }),
    [state, open, setOpen, isMobile, openMobile, setOpenMobile, toggleRightSidebar]
  )

  return (
    <RightSidebarContext.Provider value={contextValue}>
      <TooltipProvider delayDuration={0}>
        <div
          data-right-sidebar-provider
          data-right-sidebar-state={state}
          data-slot="sidebar-wrapper"
          style={
            {
              "--right-sidebar-width": SIDEBAR_WIDTH,
              "--right-sidebar-width-icon": SIDEBAR_WIDTH_ICON,
              "--right-sidebar-background": "var(--sidebar-background)",
              "--right-sidebar-foreground": "var(--sidebar-foreground)",
              "--right-sidebar-primary": "var(--sidebar-primary)",
              "--right-sidebar-primary-foreground": "var(--sidebar-primary-foreground)",
              "--right-sidebar-accent": "var(--sidebar-accent)",
              "--right-sidebar-accent-foreground": "var(--sidebar-accent-foreground)",
              "--right-sidebar-border": "var(--sidebar-border)",
              "--right-sidebar-ring": "var(--sidebar-ring)",
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            "group/sidebar-wrapper group/right-sidebar flex min-h-svh w-full",
            className
          )}
          {...props}
        >
          {children}
        </div>
      </TooltipProvider>
    </RightSidebarContext.Provider >
  )
}

/**
 * RightSidebar Component
 * 
 * RENDERING: Same modes as left Sidebar (desktop fixed, mobile sheet, non-collapsible)
 * 
 * CRITICAL DIFFERENCES FROM LEFT SIDEBAR:
 * 
 * 1. Z-INDEX: z-0 (left sidebar uses z-10)
 *    - This allows the shell glow to appear OVER the right sidebar
 *    - If you change this to z-10, the glow will be cut off at the right edge
 * 
 * 2. DATA ATTRIBUTES:
 *    - data-right-sidebar="sidebar" on outer container
 *    - data-right-sidebar="container" on fixed container
 *    - These are targeted by globals.css transparency rules
 * 
 * 3. CSS VARIABLES:
 *    - Uses --right-sidebar-width instead of --sidebar-width
 *    - Uses --right-sidebar-width-icon instead of --sidebar-width-icon
 * 
 * DO NOT CHANGE z-0 to z-10 without understanding the glow effect!
 */
function RightSidebar({
  side = "left",
  variant = "sidebar",
  collapsible = "offcanvas",
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  side?: "left" | "right"
  variant?: "sidebar" | "floating" | "inset"
  collapsible?: "offcanvas" | "icon" | "none"
}) {
  const { isMobile, state, openMobile, setOpenMobile } = useRightSidebar()

  if (collapsible === "none") {
    return (
      <div
        data-right-sidebar="sidebar"
        data-slot="sidebar"
        className={cn(
          "text-sidebar-foreground flex h-full w-(--right-sidebar-width) flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile} {...props}>
        <SheetContent
          data-right-sidebar="sidebar"
          data-slot="sidebar"
          data-mobile="true"
          className="text-sidebar-foreground w-(--right-sidebar-width) p-0 [&>button]:hidden bg-transparent"
          style={
            {
              "--right-sidebar-width": SIDEBAR_WIDTH_MOBILE,
            } as React.CSSProperties
          }
          side={side}
        >
          <SheetHeader className="sr-only">
            <SheetTitle>RightSidebar</SheetTitle>
            <SheetDescription>Displays the mobile sidebar.</SheetDescription>
          </SheetHeader>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <div
      className="group peer text-sidebar-foreground hidden md:block"
      data-right-sidebar="sidebar"
      data-state={state}
      data-collapsible={state === "collapsed" ? collapsible : ""}
      data-variant={variant}
      data-side={side}
      data-slot="sidebar"
    >
      {/* 
       * RIGHT SIDEBAR GAP
       * Same purpose as left sidebar gap - maintains layout flow.
       */}
      <div
        data-slot="sidebar-gap"
        className={cn(
          "relative w-(--right-sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
          "group-data-[collapsible=offcanvas]:w-0",
          "group-data-[side=right]:rotate-180",
          variant === "floating" || variant === "inset"
            ? "group-data-[collapsible=icon]:w-[calc(var(--right-sidebar-width-icon)+(--spacing(4)))]"
            : "group-data-[collapsible=icon]:w-(--right-sidebar-width-icon)"
        )}
      />
      {/*
       * RIGHT SIDEBAR CONTAINER
       * 
       * CRITICAL: z-0 (NOT z-10!)
       * 
       * This is the KEY difference from the left sidebar.
       * The z-0 value allows the floating shell's glow effect to
       * visually appear OVER the right sidebar.
       * 
       * If you change this to z-10, the glow will be clipped at
       * the right edge of the shell, creating an ugly cutoff.
       * 
       * data-right-sidebar="container" is used by globals.css
       */}
      <div
        data-slot="sidebar-container"
        data-right-sidebar="container"
        className={cn(
          "fixed inset-y-0 z-0 hidden h-svh w-(--right-sidebar-width) transition-[left,right,width] duration-200 ease-linear md:flex",
          side === "left"
            ? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--right-sidebar-width)*-1)]"
            : "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--right-sidebar-width)*-1)]",
          variant === "floating" || variant === "inset"
            ? "p-2 group-data-[collapsible=icon]:w-[calc(var(--right-sidebar-width-icon)+(--spacing(4))+2px)]"
            : "group-data-[collapsible=icon]:w-(--right-sidebar-width-icon)",
          className
        )}
        {...props}
      >
        <div
          data-right-sidebar="sidebar"
          data-slot="sidebar-inner"
          className={cn(
            "flex h-full w-full flex-col"
          )}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

/**
 * RightSidebarTrigger Component
 * 
 * Same functionality as SidebarTrigger but for the right sidebar.
 * Uses PanelRightIcon to indicate right sidebar toggle.
 */
function RightSidebarTrigger({
  className,
  onClick,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleRightSidebar } = useRightSidebar()

  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      className={cn("size-7 transition-all active:scale-95", className)}
      onClick={(event) => {
        onClick?.(event)
        toggleRightSidebar()
      }}
      {...props}
    >
      <PanelRightIcon />
      <span className="sr-only">Toggle RightSidebar</span>
    </Button>
  )
}

/**
 * RightSidebarRail Component
 * 
 * Z-INDEX: z-20 (same as left sidebar rail)
 * Higher than container (z-0) to ensure clickability.
 */
function RightSidebarRail({ className, ...props }: React.ComponentProps<"button">) {
  const { toggleRightSidebar } = useRightSidebar()

  return (
    <button
      data-sidebar="rail"
      data-slot="sidebar-rail"
      aria-label="Toggle RightSidebar"
      tabIndex={-1}
      onClick={toggleRightSidebar}
      title="Toggle RightSidebar"
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 transition-all ease-linear group-data-[side=left]:-right-4 group-data-[side=right]:left-0 after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] sm:flex",
        "in-data-[side=left]:cursor-w-resize in-data-[side=right]:cursor-e-resize",
        "[[data-side=left][data-state=collapsed]_&]:cursor-e-resize [[data-side=right][data-state=collapsed]_&]:cursor-w-resize",
        "hover:group-data-[collapsible=offcanvas]:bg-sidebar group-data-[collapsible=offcanvas]:translate-x-0 group-data-[collapsible=offcanvas]:after:left-full",
        "[[data-side=left][data-collapsible=offcanvas]_&]:-right-2",
        "[[data-side=right][data-collapsible=offcanvas]_&]:-left-2",
        className
      )}
      {...props}
    />
  )
}

/**
 * MainContentAreaRight Component (formerly RightSidebarInset)
 * 
 * CRITICAL: NO overflow-hidden by default
 * Same reasoning as MainContentArea - allows shell glow to extend.
 */
function MainContentAreaRight({ className, ...props }: React.ComponentProps<"main">) {
  return (
    <main
      data-slot="main-content-area"
      className={cn(
        "relative flex w-full flex-1 flex-col bg-transparent",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-slot="sidebar-input"
      data-sidebar="input"
      className={cn("bg-background h-8 w-full shadow-none", className)}
      {...props}
    />
  )
}

function RightSidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-header"
      data-sidebar="header"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function RightSidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-footer"
      data-sidebar="footer"
      className={cn("flex flex-col gap-2 p-2", className)}
      {...props}
    />
  )
}

function RightSidebarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SidebarDivider>) {
  return <SidebarDivider className={className} {...props} />
}

function RightSidebarContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-content"
      data-sidebar="content"
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-2 overflow-auto group-data-[collapsible=icon]:overflow-hidden",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group"
      data-sidebar="group"
      className={cn("relative flex w-full min-w-0 flex-col p-4", className)}
      {...props}
    />
  )
}

function RightSidebarGroupLabel({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"div"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "div"

  return (
    <Comp
      data-slot="sidebar-group-label"
      data-sidebar="group-label"
      className={cn(
        "text-sidebar-foreground/70 ring-sidebar-ring flex h-8 shrink-0 items-center rounded-md px-4 text-xs font-medium outline-hidden transition-[margin,opacity] duration-200 ease-linear focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "group-data-[collapsible=icon]:-mt-8 group-data-[collapsible=icon]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarGroupAction({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-group-action"
      data-sidebar="group-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground absolute top-3.5 right-3 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarGroupContent({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-group-content"
      data-sidebar="group-content"
      className={cn("w-full text-sm", className)}
      {...props}
    />
  )
}

function RightSidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu"
      data-sidebar="menu"
      className={cn("flex w-full min-w-0 flex-col gap-1", className)}
      {...props}
    />
  )
}

function RightSidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-item"
      data-sidebar="menu-item"
      className={cn("group/menu-item relative", className)}
      {...props}
    />
  )
}

const sidebarMenuButtonVariants = cva(
  "peer/menu-button flex w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm outline-hidden ring-sidebar-ring transition-[width,height,padding] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 active:bg-sidebar-accent active:text-sidebar-accent-foreground disabled:pointer-events-none disabled:opacity-50 group-has-data-[sidebar=menu-action]/menu-item:pr-8 aria-disabled:pointer-events-none aria-disabled:opacity-50 data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground data-[state=open]:hover:bg-sidebar-accent data-[state=open]:hover:text-sidebar-accent-foreground group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-2! [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        outline:
          "bg-background shadow-[0_0_0_1px_hsl(var(--right-sidebar-border))] hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:shadow-[0_0_0_1px_hsl(var(--right-sidebar-accent))]",
      },
      size: {
        default: "h-8 text-sm",
        sm: "h-7 text-xs",
        lg: "h-12 text-sm group-data-[collapsible=icon]:p-0!",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function RightSidebarMenuButton({
  asChild = false,
  isActive = false,
  variant = "default",
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  tooltip?: string | React.ComponentProps<typeof TooltipContent>
} & VariantProps<typeof sidebarMenuButtonVariants>) {
  const Comp = asChild ? Slot : "button"
  const { isMobile, state } = useRightSidebar()

  const button = (
    <Comp
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive}
      className={cn(sidebarMenuButtonVariants({ variant, size }), className)}
      {...props}
    />
  )

  if (!tooltip) {
    return button
  }

  if (typeof tooltip === "string") {
    tooltip = {
      children: tooltip,
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent
        side="right"
        align="center"
        hidden={state !== "collapsed" || isMobile}
        {...tooltip}
      />
    </Tooltip>
  )
}

function RightSidebarMenuAction({
  className,
  asChild = false,
  showOnHover = false,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  showOnHover?: boolean
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="sidebar-menu-action"
      data-sidebar="menu-action"
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground peer-hover/menu-button:text-sidebar-accent-foreground absolute top-1.5 right-1 flex aspect-square w-5 items-center justify-center rounded-md p-0 outline-hidden transition-transform focus-visible:ring-2 [&>svg]:size-4 [&>svg]:shrink-0",
        "after:absolute after:-inset-2 md:after:hidden",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        showOnHover &&
        "peer-data-[active=true]/menu-button:text-sidebar-accent-foreground group-focus-within/menu-item:opacity-100 group-hover/menu-item:opacity:100 data-[state=open]:opacity:100 md:opacity-0",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarMenuBadge({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sidebar-menu-badge"
      data-sidebar="menu-badge"
      className={cn(
        "text-sidebar-foreground pointer-events-none absolute right-1 flex h-5 min-w-5 items-center justify-center rounded-md px-1 text-xs font-medium tabular-nums select-none",
        "peer-hover/menu-button:text-sidebar-accent-foreground peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "peer-data-[size=sm]/menu-button:top-1",
        "peer-data-[size=default]/menu-button:top-1.5",
        "peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarMenuSkeleton({
  className,
  showIcon = false,
  ...props
}: React.ComponentProps<"div"> & {
  showIcon?: boolean
}) {
  const width = React.useMemo(() => {
    return `${Math.floor(Math.random() * 40) + 50}%`
  }, [])

  return (
    <div
      data-slot="sidebar-menu-skeleton"
      data-sidebar="menu-skeleton"
      className={cn("flex h-8 items-center gap-2 rounded-md px-2", className)}
      {...props}
    >
      {showIcon && (
        <Skeleton
          className="size-4 rounded-md"
          data-sidebar="menu-skeleton-icon"
        />
      )}
      <Skeleton
        className="h-4 max-w-(--skeleton-width) flex-1"
        data-sidebar="menu-skeleton-text"
        style={
          {
            "--skeleton-width": width,
          } as React.CSSProperties
        }
      />
    </div>
  )
}

function RightSidebarMenuSub({ className, ...props }: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="sidebar-menu-sub"
      data-sidebar="menu-sub"
      className={cn(
        "border-sidebar-border mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l px-2.5 py-0.5",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

function RightSidebarMenuSubItem({
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="sidebar-menu-sub-item"
      data-sidebar="menu-sub-item"
      className={cn("group/menu-sub-item relative", className)}
      {...props}
    />
  )
}

function RightSidebarMenuSubButton({
  asChild = false,
  size = "md",
  isActive = false,
  className,
  ...props
}: React.ComponentProps<"a"> & {
  asChild?: boolean
  size?: "sm" | "md"
  isActive?: boolean
}) {
  const Comp = asChild ? Slot : "a"

  return (
    <Comp
      data-slot="sidebar-menu-sub-button"
      data-sidebar="menu-sub-button"
      data-size={size}
      data-active={isActive}
      className={cn(
        "text-sidebar-foreground ring-sidebar-ring hover:bg-sidebar-accent hover:text-sidebar-accent-foreground active:bg-sidebar-accent active:text-sidebar-accent-foreground [&>svg]:text-sidebar-accent-foreground flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 outline-hidden focus-visible:ring-2 disabled:pointer-events-none disabled:opacity:50 aria-disabled:pointer-events-none aria-disabled:opacity:50 [&>span:last-child]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
        "data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        "group-data-[collapsible=icon]:hidden",
        className
      )}
      {...props}
    />
  )
}

export {
  RightSidebar,
  RightSidebarContent,
  RightSidebarFooter,
  RightSidebarGroup,
  RightSidebarGroupAction,
  RightSidebarGroupContent,
  RightSidebarGroupLabel,
  RightSidebarHeader,
  RightSidebarInput,
  MainContentAreaRight,
  RightSidebarMenu,
  RightSidebarMenuAction,
  RightSidebarMenuBadge,
  RightSidebarMenuButton,
  RightSidebarMenuItem,
  RightSidebarMenuSkeleton,
  RightSidebarMenuSub,
  RightSidebarMenuSubButton,
  RightSidebarMenuSubItem,
  RightSidebarProvider,
  RightSidebarRail,
  RightSidebarSeparator,
  RightSidebarTrigger,
  useRightSidebar,
}
