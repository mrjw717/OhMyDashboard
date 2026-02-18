import * as React from "react"
import { cn } from "@/lib/utils"

export function SidebarDivider({ className }: React.ComponentProps<"div">) {
    return (
        <div 
            data-sidebar="separator" 
            className={cn("relative h-3 w-full shrink-0", className)}
        >
            <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-sidebar-border/60 to-transparent" />
            <div className="absolute inset-x-4 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-sidebar-primary/30 to-transparent blur-sm" />
        </div>
    )
}
