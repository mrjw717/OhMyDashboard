"use client"

/**
 * @fileoverview Shell Header Component — sticky glassmorphic chrome that anchors
 * KONSOLE search, breadcrumb navigation, sidebars, and a theme customizer.
 *
 * ## Responsibilities
 * - Maintain a fixed-height surface that reacts to scroll (rounded corners + blur)
 * - Keep primary controls aligned along a single vertical center line
 * - Host an overlay slot for floating experiences (e.g., CommandMenu)
 *
 * Implementation follows `/master-workflow` import rules and `/documentcode`
 * documentation standards to ensure at least ~40% of this file conveys intent.
 */
import React, { useEffect, useState } from "react"

import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { RightSidebarTrigger } from "@/components/ui/right-sidebar"
import { ThemeCustomizer } from "@/features/theme-customizer"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { CommandMenu } from "@/features/command-menu"
import { cn } from "@/lib/utils"

/**
 * ShellHeader renders the persistent application chrome shown across every page.
 *
 * Layout notes:
 * - The outer header is sticky and uses `--header-height` so downstream layouts
 *   can rely on shared spacing tokens.
 * - `shell-glass` is a decorative layer (absolutely positioned) that animates on
 *   scroll to create the glassmorphic effect without reflowing inner content.
 * - The foreground flex row hosts left/balance/right clusters while the
 *   CommandMenu is rendered via an overlay to keep animations independent.
 *
 * @returns ReactElement representing the application header chrome.
 */
export function ShellHeader() {
    const headerRef = React.useRef<HTMLElement>(null)
    const [isScrolled, setIsScrolled] = useState(false)

    useEffect(() => {
        /**
         * onScroll handler updates `isScrolled` which triggers the glass panel
         * animation (rounded corners + inset translation). The handler listens on
         * `.scrollable-container` per shell architecture docs.
         */
        const handleScroll = (e: Event) => {
            const target = e.target as HTMLElement
            setIsScrolled(target.scrollTop > 20)
        }

        const scrollContainer = document.querySelector('.scrollable-container')
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', handleScroll)
            return () => scrollContainer.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return (
        <header
            ref={headerRef}
            className="sticky top-0 h-[var(--header-height)] w-full shrink-0 z-[100]"
            style={{
                zIndex: 100
            }}
        >
            {/*
             * Layer 1: Decorative glass background. Positioned absolutely so the
             * glass can morph independently of the interactive controls.
             */}
            <div
                className={cn(
                    "shell-glass absolute z-0 overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
                    "bg-transparent border-b border-border/40 backdrop-blur-2xl",
                    isScrolled ?
                        "top-2 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-8 bottom-0 rounded-3xl glass-extreme shadow-sm border border-white/10 [mask-image:linear-gradient(to_bottom,transparent_0%,black_20%,black_80%,transparent_100%)]"
                        :
                        "inset-0 rounded-t-3xl rounded-b-none"
                )}
            >
                <div className="h-full w-full bg-transparent" />
            </div>

            {/*
             * Layer 2: Foreground content row. Three equal flex children keep
             * sidebar controls, spacer, and theme utilities balanced.
             */}
            <div
                className={cn(
                    "relative z-10 flex h-full items-center transition-all duration-700 ease-[cubic-bezier(0.25,0.4,0.25,1)]",
                    isScrolled ? "mx-4 md:mx-6 lg:mx-8 mt-2" : "mx-0 mt-0"
                )}
            >
                {/* Left cluster: navigation affordances */}
                <div className="flex items-center gap-2 px-4 flex-1 justify-start min-w-0">
                    <SidebarTrigger />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4 bg-primary/20"
                    />
                    <Breadcrumbs />
                </div>

                {/* Middle cluster: deliberate spacer so the overlay can remain centered */}
                <div className="hidden md:flex flex-1 items-center justify-center" aria-hidden>
                    {/* Intentionally empty: CommandMenu renders via the overlay below */}
                </div>

                {/* Right cluster: theme tools + right sidebar */}
                <div className="flex items-center gap-2 px-4 flex-1 justify-end z-40 min-w-0">
                    <ThemeCustomizer />
                    <Separator
                        orientation="vertical"
                        className="mx-2 data-[orientation=vertical]:h-4 bg-primary/20"
                    />
                    <RightSidebarTrigger />
                </div>
            </div>

            {/*
             * Layer 3: Full-header overlay. CommandMenu needs to ignore pointer
             * events until interacted with, so the wrapper is pointer-events-none
             * while the internal component toggles pointer access as needed.
             */}
            <div className="hidden md:block absolute inset-0 pointer-events-none z-[70]">
                <CommandMenu />
            </div>
        </header>
    )
}
