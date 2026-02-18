"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      style={
        {
          "--normal-bg": "hsl(var(--popover) / 0.8)",
          "--normal-text": "hsl(var(--popover-foreground))",
          "--normal-border": "hsl(var(--border) / 0.5)",
          "--border-radius": "var(--radius-xl)",
          "--glass-tint": "hsl(var(--primary) / 0.05)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group font-sans border-border/50 bg-popover/95 shadow-2xl shadow-primary/10",
          description: "text-muted-foreground font-sans",
          actionButton: "bg-primary text-primary-foreground font-medium",
          cancelButton: "bg-muted text-muted-foreground",
        }
      }}
      {...props}
    />
  )
}

export { Toaster }
