"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme as useNextTheme } from "next-themes"
import { useTheme } from "@/config/theme/theme-provider"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * ThemeCustomizer Component
 * 
 * Icon-only theme switcher with animated color swatches.
 * - Click icon to toggle light/dark
 * - Hover to reveal color swatches sliding from left with precise clipping
 * - System mode is automatic/invisible
 */
export function ThemeCustomizer() {
    const { setTheme, resolvedTheme } = useNextTheme()
    const { colorScheme, setColorScheme, availableThemes } = useTheme()
    const [showSwatches, setShowSwatches] = React.useState(false)
    const closeTimeoutRef = React.useRef<NodeJS.Timeout | null>(null)

    const toggleTheme = () => {
        const style = document.createElement('style')
        style.innerText = '* { transition: none !important; }'
        style.id = 'theme-transition-blocker'
        document.head.appendChild(style)

        setTheme(resolvedTheme === "dark" ? "light" : "dark")

        // Remove blocker after a short delay
        setTimeout(() => {
            const blocker = document.getElementById('theme-transition-blocker')
            if (blocker) blocker.remove()
        }, 50)
    }

    const handleMouseEnter = () => {
        // Clear any pending close timeout
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        setShowSwatches(true)
    }

    const handleMouseLeave = () => {
        // Delay closing by 3000ms to give user time to return
        closeTimeoutRef.current = setTimeout(() => {
            setShowSwatches(false)
        }, 3000)
    }

    const handleColorClick = (themeName: string) => {
        setColorScheme(themeName)
        // Immediately close swatches when a color is clicked
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        setShowSwatches(false)
    }

    const [isDragging, setIsDragging] = React.useState(false)
    const gradientRef = React.useRef<HTMLDivElement>(null)

    // Calculate gradient string from available themes
    const gradient = `linear-gradient(to right, ${availableThemes.map(t => `hsl(${t.light.primary})`).join(', ')})`

    const updateThemeFromEvent = (clientX: number, rect: DOMRect) => {
        const x = clientX - rect.left
        const percentage = Math.max(0, Math.min(1, x / rect.width))
        const index = Math.floor(percentage * availableThemes.length)
        const selectedTheme = availableThemes[Math.min(index, availableThemes.length - 1)]

        if (selectedTheme && selectedTheme.name !== colorScheme) {
            setColorScheme(selectedTheme.name)
        }
    }

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true)
        updateThemeFromEvent(e.clientX, e.currentTarget.getBoundingClientRect())

        // Prevent text selection while dragging
        document.body.style.userSelect = 'none'
    }

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isDragging) {
            updateThemeFromEvent(e.clientX, e.currentTarget.getBoundingClientRect())
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
        document.body.style.userSelect = ''

        // Close swatches if we were dragging, but give it a moment
        // so it doesn't feel abrupt
        if (closeTimeoutRef.current) {
            clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }
        // Don't close immediately to allow user to see their selection
        // Logic handled by onMouseLeave
    }

    // Global mouse up to handle dragging outside the element
    React.useEffect(() => {
        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false)
                document.body.style.userSelect = ''
            }
        }
        window.addEventListener('mouseup', handleGlobalMouseUp)
        return () => window.removeEventListener('mouseup', handleGlobalMouseUp)
    }, [isDragging])


    // Find current theme index for indicator
    const currentThemeIndex = availableThemes.findIndex(t => t.name === colorScheme)
    // Center the indicator in the middle of the theme "segment"
    const segmentWidth = 100 / availableThemes.length
    const indicatorPosition = currentThemeIndex >= 0
        ? `${(currentThemeIndex * segmentWidth) + (segmentWidth / 2)}%`
        : '0%'

    // Cleanup timeout on unmount
    React.useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                clearTimeout(closeTimeoutRef.current)
            }
        }
    }, [])

    return (
        <div
            className="flex items-center gap-0 relative theme-customizer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Absolutely positioned container to escape header height constraints */}
            {/* Added padding and overflow-visible to allow indicator to sit above */}
            <div className="absolute right-full top-1/2 -translate-y-1/2 flex items-center justify-end overflow-visible py-6 pointer-events-none z-10 pr-3 pl-4">
                {/* Gradient Bar - Slides from Left */}
                <div
                    ref={gradientRef}
                    className={cn(
                        "h-4 rounded-md relative cursor-crosshair pointer-events-auto shadow-sm border border-border/50 hover:scale-105 select-none",
                        showSwatches ? "w-[160px] opacity-100 mr-2" : "w-0 opacity-0 mr-0"
                    )}
                    style={{ background: gradient }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >
                    {/* Arrow Indicator (Above) */}
                    {showSwatches && currentThemeIndex >= 0 && (
                        <div
                            className="absolute -top-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-foreground/80 pointer-events-none filter drop-shadow-sm"
                            style={{
                                left: indicatorPosition,
                                transform: 'translateX(-50%)'
                            }}
                        />
                    )}
                </div>
            </div>

            {/* Light/Dark Toggle - Icon Only */}
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="relative flex-shrink-0"
            >
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
            </Button>
        </div>
    )
}
