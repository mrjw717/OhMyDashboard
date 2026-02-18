"use client"

/**
 * ConsoleDrawer - Expandable drawer with tabbed views for sidebar footer
 * 
 * ARCHITECTURE OVERVIEW:
 * This component provides an expandable drawer panel in the sidebar footer with
 * three tabs: Console, Metrics, and Network. It uses smooth CSS transitions for
 * open/close animations.
 * 
 * CRITICAL DESIGN DECISIONS - DO NOT MODIFY WITHOUT UNDERSTANDING:
 * 
 * 1. DRAWER_HEIGHT CONSTANT (200px):
 *    - This value is coordinated with the ConsoleCube size calculation
 *    - Changing this requires updating the cube's percentage-based sizing
 *    - The cube uses 12% of container, so drawer height affects cube visibility
 * 
 * 2. CENTERING (flex items-center justify-center):
 *    - The content wrapper uses flexbox centering to ensure the console cube
 *      is always perfectly centered regardless of drawer size
 *    - Do NOT remove this or the cube will be off-center
 * 
 * 3. MAX-HEIGHT ANIMATION:
 *    - Uses max-height instead of height for smooth CSS transitions
 *    - The +16 buffer accounts for margin (mb-2 = 8px * 2)
 *    - Using max-height: 0 when collapsed ensures content is hidden
 * 
 * 4. TAB BAR DESIGN:
 *    - Icons only with tooltips (mobile-friendly, space-efficient)
 *    - Active tab shows colored background using --fx-tech-glow token
 *    - Clicking any tab auto-expands the drawer
 * 
 * 5. Z-INDEX LAYERING:
 *    - Drawer content: Uses z-index from themes/z-index.ts
 *    - This ensures proper stacking with NavUser component below
 * 
 * @see console-view.tsx for cube/icon positioning details
 * @see themes/z-index.ts for layering constants
 */

import * as React from "react"
import { 
    TrendingUp, 
    Network, 
    Terminal, 
    ChevronUp
} from "lucide-react"
import { cn } from "@/lib/utils"
import { 
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider 
} from "@/components/ui/tooltip"
import { ConsoleView, MetricsView, NetworkView } from './views'
import type { DrawerTab, DrawerTabConfig } from './types'

const drawerTabs: DrawerTabConfig[] = [
    { id: 'console', label: 'Console', icon: Terminal },
    { id: 'metrics', label: 'Metrics', icon: TrendingUp },
    { id: 'network', label: 'Network', icon: Network },
]

/**
 * Drawer height in pixels - CRITICAL: Do not change without updating:
 * 1. ConsoleCube size calculation (console-cube.tsx uses 12% of this)
 * 2. CSS variable --console-spread-radius if spacing feels off
 */
const DRAWER_HEIGHT = 200

export function ConsoleDrawer() {
    const [activeTab, setActiveTab] = React.useState<DrawerTab>('console')
    const [isExpanded, setIsExpanded] = React.useState(false)
    const [activeNode, setActiveNode] = React.useState<string | null>(null)
    
    return (
        <TooltipProvider delayDuration={300}>
            <div className={cn(
                "flex flex-col group-data-[collapsible=icon]:hidden",
                "transition-all duration-300 ease-out"
            )}>
                <div className="relative h-px w-full shrink-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--sidebar-border))] to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[hsl(var(--sidebar-primary)/0.5)] to-transparent blur-[2px]" />
                </div>
                
                <div className="flex items-center justify-center gap-2 px-2 py-2 shrink-0">
                    {drawerTabs.map((tab) => {
                        const Icon = tab.icon
                        const isActive = activeTab === tab.id
                        return (
                            <Tooltip key={tab.id}>
                                <TooltipTrigger asChild>
                                    <button
                                        onClick={() => {
                                            setActiveTab(tab.id)
                                            setIsExpanded(true)
                                        }}
                                        className={cn(
                                            "p-2 rounded-md transition-all duration-200",
                                            "border border-transparent",
                                            isActive 
                                                ? cn(
                                                    "bg-[hsl(var(--fx-tech-glow)/0.15)]",
                                                    "text-[hsl(var(--sidebar-primary))]",
                                                    "border-[hsl(var(--fx-tech-border)/0.5)]",
                                                    "shadow-[0_0_10px_hsl(var(--fx-tech-glow)/0.2)]"
                                                ) 
                                                : cn(
                                                    "text-[hsl(var(--text-muted))]",
                                                    "hover:text-[hsl(var(--text-secondary))]",
                                                    "hover:bg-[hsl(var(--sidebar-accent)/0.5)]"
                                                )
                                        )}
                                    >
                                        <Icon className="w-4 h-4" />
                                    </button>
                                </TooltipTrigger>
                                <TooltipContent 
                                    side="top" 
                                    sideOffset={4}
                                    className="text-[10px] font-mono"
                                >
                                    {tab.label}
                                </TooltipContent>
                            </Tooltip>
                        )
                    })}
                    
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className={cn(
                                    "p-2 rounded-md transition-all duration-200 ml-2",
                                    "text-[hsl(var(--text-muted))]",
                                    "hover:text-[hsl(var(--text-secondary))]",
                                    "hover:bg-[hsl(var(--sidebar-accent)/0.5)]"
                                )}
                            >
                                <ChevronUp className={cn(
                                    "w-4 h-4 transition-transform duration-300",
                                    isExpanded && "rotate-180"
                                )} />
                            </button>
                        </TooltipTrigger>
                        <TooltipContent 
                            side="top" 
                            sideOffset={4}
                            className="text-[10px] font-mono"
                        >
                            {isExpanded ? 'Collapse' : 'Expand'}
                        </TooltipContent>
                    </Tooltip>
                </div>
                
                <div 
                    className={cn(
                        "overflow-hidden transition-all duration-300 ease-out shrink-0",
                        isExpanded ? "opacity-100" : "opacity-0 max-h-0"
                    )}
                    style={{ maxHeight: isExpanded ? DRAWER_HEIGHT + 16 : 0 }}
                >
                    <div 
                        className={cn(
                            "mx-2 mb-2 rounded-lg overflow-hidden",
                            "border border-[hsl(var(--fx-tech-border)/0.3)]",
                            "bg-[hsl(var(--fx-tech-glow)/0.02)]",
                            "flex items-center justify-center"
                        )}
                        style={{ height: DRAWER_HEIGHT }}
                    >
                        {activeTab === 'console' && (
                            <ConsoleView activeNode={activeNode} setActiveNode={setActiveNode} />
                        )}
                        {activeTab === 'metrics' && <MetricsView />}
                        {activeTab === 'network' && <NetworkView />}
                    </div>
                </div>
            </div>
        </TooltipProvider>
    )
}
