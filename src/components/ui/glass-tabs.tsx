"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"

const glassTabsVariants = cva(
  "inline-flex rounded-xl p-1 relative",
  {
    variants: {
      variant: {
        default: [
          "bg-background/60 backdrop-blur-xl",
          "border border-primary/10",
          "shadow-lg shadow-primary/5",
        ].join(" "),
        minimal: [
          "bg-muted/50 backdrop-blur-sm",
          "border border-border/50",
        ].join(" "),
        pill: [
          "bg-muted/30 backdrop-blur-md",
          "rounded-full",
        ].join(" "),
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const glassTabTriggerVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg",
    "px-4 py-2 text-sm font-medium",
    "transition-all duration-200",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "disabled:pointer-events-none disabled:opacity-50",
  ].join(" "),
  {
    variants: {
      active: {
        true: [
          "bg-primary text-primary-foreground",
          "shadow-md shadow-primary/20",
        ].join(" "),
        false: [
          "text-[hsl(var(--text-secondary))]",
          "hover:text-[hsl(var(--text-primary))]",
          "hover:bg-muted/50",
        ].join(" "),
      },
    },
    defaultVariants: {
      active: false,
    },
  }
)

export interface GlassTabsProps extends React.ComponentProps<"div"> {
  value?: string
  onValueChange?: (value: string) => void
  defaultValue?: string
  variant?: "default" | "minimal" | "pill"
}

export interface GlassTabProps extends React.ComponentProps<"button"> {
  value: string
  icon?: React.ReactNode
}

const GlassTabsContext = React.createContext<{
  value: string
  onValueChange: (value: string) => void
}>({
  value: "",
  onValueChange: () => {},
})

function GlassTabs({
  className,
  value: controlledValue,
  onValueChange,
  defaultValue,
  variant = "default",
  children,
  ...props
}: GlassTabsProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || "")
  
  const value = controlledValue ?? uncontrolledValue
  const handleValueChange = onValueChange ?? setUncontrolledValue

  return (
    <GlassTabsContext.Provider value={{ value, onValueChange: handleValueChange }}>
      <div
        data-slot="glass-tabs"
        className={cn(glassTabsVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    </GlassTabsContext.Provider>
  )
}

function GlassTab({
  className,
  value,
  icon,
  children,
  ...props
}: GlassTabProps) {
  const context = React.useContext(GlassTabsContext)
  const isActive = context.value === value

  return (
    <button
      data-slot="glass-tab"
      data-active={isActive}
      className={cn(glassTabTriggerVariants({ active: isActive }), className)}
      onClick={() => context.onValueChange(value)}
      {...props}
    >
      {icon}
      {children}
    </button>
  )
}

function GlassTabsList({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="glass-tabs-list"
      className={cn("flex items-center gap-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

function GlassTabsContent({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<"div"> & { value: string }) {
  const context = React.useContext(GlassTabsContext)
  
  if (context.value !== value) {
    return null
  }

  return (
    <div
      data-slot="glass-tabs-content"
      className={cn(
        "mt-4 animate-in fade-in-0 slide-in-from-bottom-2 duration-200",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export {
  GlassTabs,
  GlassTab,
  GlassTabsList,
  GlassTabsContent,
  glassTabsVariants,
  glassTabTriggerVariants,
}

export type GlassTabsVariantProps = VariantProps<typeof glassTabsVariants>
