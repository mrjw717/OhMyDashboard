"use client"

import * as React from "react"
import { MainContentArea, SidebarProvider, useSidebar } from "@/components/ui/sidebar"
import { RightSidebarProvider, useRightSidebar } from "@/components/ui/right-sidebar"
import { SidebarPrimary } from "@/components/layout/sidebar-primary"
import { SidebarSecondary } from "@/components/layout/sidebar-secondary"
import { ShellHeader } from "./header"
import { ScrollBlur } from "@/components/ui/scroll-blur"
import { cn } from "@/lib/utils"

interface ShellProps {
    children: React.ReactNode
}

/**
 * Shell Component
 * 
 * The main application layout wrapper.
 * Responsibilities:
 * - Providers: Wraps content in Sidebar and RightSidebar providers.
 * - Layout Structure: Defines the primary three-column layout (Sidebar Primary, Main Content, Sidebar Secondary).
 * - Visual Styling: Applies the "glass" look, borders, and centralized overflow handling.
 * - Scroll Management: Contains the main scrollable area and integrates the `ScrollBlur` effect.
 * - Header Positioning: Places the `ShellHeader` in a sticky/absolute position relative to the content.
 * 
 * @param children - The main page content to render within the central shell.
 */
export function Shell({ children }: ShellProps) {
    return (
        <SidebarProvider>
            <RightSidebarProvider>
                <SidebarKeyboardShortcuts />
                <SidebarPrimary />
                <ShellContent>{children}</ShellContent>
                <SidebarSecondary />
            </RightSidebarProvider>
        </SidebarProvider >
    )
}

function SidebarKeyboardShortcuts() {
    const { setOpen: setLeftOpen } = useSidebar()
    const { setOpen: setRightOpen } = useRightSidebar()

    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!(event.ctrlKey || event.metaKey)) {
                return
            }

            switch (event.key) {
                case "ArrowLeft":
                    event.preventDefault()
                    setLeftOpen(false)
                    break
                case "ArrowRight":
                    event.preventDefault()
                    setRightOpen(false)
                    break
                case "ArrowUp":
                    event.preventDefault()
                    setLeftOpen(true)
                    setRightOpen(true)
                    break
                case "ArrowDown":
                    event.preventDefault()
                    setLeftOpen(false)
                    setRightOpen(false)
                    break
                default:
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [setLeftOpen, setRightOpen])

    return null
}

function ShellContent({ children }: ShellProps) {
    const { state } = useRightSidebar()
    const isRightCollapsed = state === "collapsed"

    return (
        <MainContentArea
            data-right-sidebar-state={state}
            className={cn(
                "relative flex flex-col h-svh min-h-svh bg-transparent overflow-visible px-4 md:px-6 lg:px-8",
                isRightCollapsed && "lg:pr-12"
            )}
        >
            <div className="flex-1 flex flex-col relative min-h-0 h-full min-h-svh overflow-visible py-3 md:py-4">
                <div
                    className="rounded-3xl border border-primary/5 relative glow-enabled flex flex-col group/spotlight h-full overflow-visible"
                >
                    <div className="shell-glass shell-glass-middle absolute inset-0 z-0 overflow-visible rounded-3xl border-b border-border/40">
                        <div className="h-full w-full bg-transparent" />
                    </div>
                    <div className="relative z-10 flex flex-col min-h-0 flex-1 h-full overflow-hidden rounded-3xl">
                        <div className="absolute top-0 left-0 right-0 z-50 pointer-events-none">
                            <div className="pointer-events-auto">
                                <ShellHeader />
                            </div>
                        </div>
                        <ScrollBlur
                            containerSelector="#main-scroll"
                            className="pointer-events-none absolute inset-0 z-60 rounded-3xl"
                            topBlurHeight="5.5rem"
                            bottomBlurHeight="5.5rem"
                            strength={4.0}
                        />
                        <div
                            id="main-scroll"
                            className="absolute inset-0 overflow-y-auto scrollable-container z-0 no-scrollbar relative rounded-3xl min-h-full shell-middle-scroll"
                        >
                            <div
                                className="relative min-h-full overflow-hidden px-4 pb-4 pt-[calc(var(--header-height)+1rem)] md:px-6 md:pb-6 md:pt-[calc(var(--header-height)+1.5rem)] lg:px-8 lg:pb-8 lg:pt-[calc(var(--header-height)+2rem)] shell-middle-surface"
                            >
                                {children}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainContentArea>
    )
}
