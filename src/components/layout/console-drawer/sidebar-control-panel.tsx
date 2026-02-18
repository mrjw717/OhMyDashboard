"use client"

import * as React from "react"
import {
    Settings,
    Activity,
    Cloud,
    Shield,
    Database,
    Zap
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"
import { useTheme } from "@/app/theme-hydrator"

const ConsoleCube = dynamic(
    () => import("./console-cube").then((mod) => mod.ConsoleCube),
    {
        ssr: false,
        loading: () => (
            <div
                aria-hidden="true"
                className="h-full w-full animate-pulse rounded-full bg-[hsl(var(--fx-tech-glow)/0.06)]"
            />
        )
    }
)

// Digital text scrambler hook
function useScrambleText(text: string, speed = 30) {
    const [displayedText, setDisplayedText] = React.useState(text)
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

    React.useEffect(() => {
        let iterations = 0

        // Initial scramble
        const interval = setInterval(() => {
            setDisplayedText(() =>
                text.split("").map((char, index) => {
                    if (index < iterations) {
                        return text[index]
                    }
                    return chars[Math.floor(Math.random() * chars.length)]
                }).join("")
            )

            if (iterations >= text.length) {
                clearInterval(interval)
            }

            iterations += 1 / 3
        }, speed)

        return () => clearInterval(interval)
    }, [text, speed])

    return displayedText
}

export function SidebarControlPanel() {
    const { colorScheme } = useTheme()
    const [activeNode, setActiveNode] = React.useState<string | null>(null)
    const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Calculate center point
    const centerX = containerSize.width / 2
    const centerY = containerSize.height / 2

    // Radius for the satellite buttons
    const radius = Math.min(containerSize.width, containerSize.height) / 2 - 8 // Minimal padding to push to edges

    React.useEffect(() => {
        if (!containerRef.current) return
        const updateSize = () => {
            if (containerRef.current) {
                setContainerSize({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                })
            }
        }

        updateSize()
        // Small delay to ensure layout is settled
        const timeout = setTimeout(updateSize, 100)

        window.addEventListener('resize', updateSize)
        return () => {
            window.removeEventListener('resize', updateSize)
            clearTimeout(timeout)
        }
    }, [])

    const controls = [
        { icon: Activity, label: "SYS" },
        { icon: Cloud, label: "NET" },
        { icon: Shield, label: "SEC" },
        { icon: Database, label: "DB" },
        { icon: Zap, label: "PWR" },
        { icon: Settings, label: "CFG" },
    ]

    // Scramble the central text
    const displayText = useScrambleText(activeNode || "CONSOLE")

    return (
        <div className="flex flex-col gap-2 px-2 py-2 group-data-[collapsible=icon]:hidden">
            {/* Gradient Divider */}
            <div className="relative h-px w-full mb-2">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sidebar-border to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sidebar-primary/50 to-transparent blur-[2px]" />
            </div>

            {/* Star Topology Container */}
            <div
                ref={containerRef}
                className={cn(
                    "relative aspect-square w-full select-none transition-all duration-500",
                    // Pulse the whole container slightly when hovering the area but not a specific node
                    // This creates a "waking up" feel
                )}
                onMouseEnter={() => { }} // Could track area hover here if needed
            >


                <div className="absolute inset-0 z-20 pointer-events-none">
                    <ConsoleCube
                        key={colorScheme}
                        isActive={!!activeNode}
                        isHovering={!!activeNode}
                        width={containerSize.width}
                        height={containerSize.height}
                        satellitePositions={controls.map((control, index) => {
                            const angle = (index * (360 / controls.length) - 90) * (Math.PI / 180)
                            return {
                                x: centerX + radius * Math.cos(angle),
                                y: centerY + radius * Math.sin(angle),
                                id: control.label,
                                isActive: activeNode === control.label
                            }
                        })}
                    />

                    {/* Text Overlay */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                        <span className="text-xs font-mono font-bold tracking-widest text-sidebar-primary drop-shadow-[0_0_10px_hsl(var(--sidebar-primary)/0.8)]">
                            {displayText}
                        </span>
                    </div>
                </div>

                {/* Satellite Buttons */}
                {controls.map((control, index) => {
                    const angle = (index * (360 / controls.length) - 90) * (Math.PI / 180)
                    // Position using CSS variables for performance if simpler, but absolute is fine here
                    const left = `calc(50% + ${radius * Math.cos(angle)}px)`
                    const top = `calc(50% + ${radius * Math.sin(angle)}px)`

                    return (
                        <div
                            key={control.label}
                            className="absolute -translate-x-1/2 -translate-y-1/2 z-30"
                            style={{ left, top }}
                        >
                            <Button
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    "rounded-full border backdrop-blur-[4px] transition-all duration-300",
                                    // Default state: Faint border & glow using FX tokens
                                    "border-[hsl(var(--fx-tech-border)/0.3)] bg-[hsl(var(--fx-tech-glow)/0.05)]",
                                    "shadow-[0_0_10px_hsl(var(--fx-tech-glow)/0.1)]",

                                    // Hover state: Stronger border & glow
                                    "hover:border-[hsl(var(--fx-tech-border)/1)] hover:bg-[hsl(var(--fx-tech-glow)/0.2)]",
                                    "hover:shadow-[0_0_20px_hsl(var(--fx-tech-glow)/0.6)] hover:ring-1 hover:ring-[hsl(var(--fx-tech-glow)/0.5)]",

                                    // Active state: Intense glow
                                    activeNode === control.label && [
                                        "border-[hsl(var(--fx-tech-border)/1)] bg-[hsl(var(--fx-tech-glow)/0.3)]",
                                        "shadow-[0_0_30px_hsl(var(--fx-tech-glow)/0.8)] ring-1 ring-[hsl(var(--fx-tech-glow)/1)] scale-110"
                                    ]
                                )}
                                style={{
                                    width: `var(--console-button-size)`,
                                    height: `var(--console-button-size)`
                                } as React.CSSProperties}
                                onMouseEnter={() => setActiveNode(control.label)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                <control.icon
                                    style={{
                                        width: `var(--console-icon-size)`,
                                        height: `var(--console-icon-size)`
                                    }}
                                />
                                <span className="sr-only">{control.label}</span>
                            </Button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
