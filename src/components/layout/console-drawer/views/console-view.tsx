"use client"

/**
 * ConsoleView - Star topology console with centered cube and orbital icons
 * 
 * ARCHITECTURE OVERVIEW:
 * Creates a star topology visualization with a 3D isometric cube at center
 * and 6 control icons arranged in a circle at the edges. Electric lines
 * connect the cube vertices to each icon.
 * 
 * ============================================================================
 * THEME SWITCHING FIX - CRITICAL DOCUMENTATION
 * ============================================================================
 * 
 * THE PROBLEM:
 * When users changed the theme color via the theme switcher, the console
 * area would "flash" and re-generate, but the colors would NOT update to
 * match the newly selected theme. Users had to manually refresh the page
 * to see the correct colors.
 * 
 * ROOT CAUSE - key={colorScheme} FORCED REMOUNT:
 * 
 * Original (BROKEN) code:
 * ```tsx
 * <ConsoleCube
 *     key={colorScheme}  // <-- THIS WAS THE PROBLEM
 *     isActive={!!activeNode}
 *     ...
 * />
 * ```
 * 
 * Why this caused issues:
 * 1. When colorScheme changed, React would unmount the entire ConsoleCube
 * 2. ConsoleCube would remount from scratch (flash/reload)
 * 3. Inside ConsoleCube, ElectricLine components would initialize
 * 4. ElectricLine would try to resolve CSS variables during initialization
 * 5. RACE CONDITION: CSS variable cascade hadn't finished recalculating
 * 6. ElectricLine captured STALE color values in its animation closure
 * 7. Animation ran with wrong colors until page refresh
 * 
 * THE FIX - REMOVED key PROP:
 * 
 * Fixed code:
 * ```tsx
 * <ConsoleCube
 *     isActive={!!activeNode}
 *     // No key prop - component persists across theme changes
 *     ...
 * />
 * ```
 * 
 * Why this works:
 * 1. ConsoleCube is NOT remounted when theme changes
 * 2. Component persists in the DOM (part of the shell, never leaves)
 * 3. ElectricLine's animation loop calls getColor() EVERY FRAME
 * 4. getColor() reads --primary directly from document.documentElement
 * 5. Theme change is picked up on the VERY NEXT FRAME (~16ms)
 * 6. No flash, no reload, instant color transition
 * 
 * DESIGN PRINCIPLE:
 * Since the console area is part of the application shell (always visible,
 * never unmounted), it should NOT use React key-based remounting for
 * theme updates. Instead, components should read theme values dynamically.
 * 
 * @see electric-line.tsx - Contains the getColor() fix for per-frame color resolution
 * @see theme-hydrator.tsx - Sets --primary on document.documentElement
 * @see console-cube.tsx - 3D cube rendering and line drawing
 * 
 * ============================================================================
 * CRITICAL DESIGN DECISIONS - DO NOT MODIFY WITHOUT UNDERSTANDING
 * ============================================================================
 * 
 * 1. CENTERING STRATEGY:
 *    - Outer container: flex items-center justify-center (centers the whole component)
 *    - Inner wrapper: relative positioned with measured dimensions
 *    - All calculations use centerX/centerY derived from container size
 *    - DO NOT change this without testing - the cube must stay perfectly centered
 * 
 * 2. ICON SPACING (outerRadius calculation):
 *    - Icons are placed at: min(centerX, centerY) - halfButton
 *    - This pushes icons to the absolute edge of the container
 *    - The ConsoleCube (at 12% of container) creates visible gap for lines
 *    - DO NOT add padding here - it will make lines invisible or clip icons
 * 
 * 3. BUTTON SIZE (44px):
 *    - Hardcoded for consistent layout calculation
 *    - Coordinated with --console-button-size CSS variable (2.75rem = 44px)
 *    - Icon size uses CSS variable for theming: --console-icon-size
 *    - DO NOT change button size without updating CSS variables
 * 
 * 4. CUBE SIZE (12% in console-cube.tsx):
 *    - Cube is sized at 12% of the smaller container dimension
 *    - This leaves ~88% of space for icons and connecting lines
 *    - "CONSOLE" text must fit inside cube - if text changes, adjust percentage
 *    - DO NOT increase cube size or lines will be too short to see
 * 
 * 5. POSITIONING COORDINATES:
 *    - Icons use absolute positioning with calculated left/top
 *    - Positions account for halfButton offset (center the button on the point)
 *    - ConsoleCube receives satellite positions for line drawing
 *    - DO NOT use CSS transforms for positioning - breaks line calculations
 * 
 * 6. THEME TOKENS:
 *    - All colors use hsl(var(--token)) format for theme support
 *    - Icons use --fx-tech-glow, --fx-tech-border tokens
 *    - Text uses --sidebar-primary token
 *    - DO NOT hardcode colors - breaks theme switching
 * 
 * @see console-cube.tsx for 3D cube rendering and line drawing
 * @see themes/common-text-colors.ts for console size tokens
 */

import * as React from "react"
import dynamic from "next/dynamic"
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

/**
 * ConsoleCube - Dynamically imported to avoid SSR issues
 * 
 * Uses Next.js dynamic import with ssr: false because:
 * - Canvas API is not available during server-side rendering
 * - ElectricLine uses requestAnimationFrame (browser-only)
 * - Window measurements require browser environment
 */
const ConsoleCube = dynamic(
    () => import("../console-cube").then((mod) => mod.ConsoleCube),
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

/**
 * Props for the ConsoleView component
 */
interface ConsoleViewProps {
    /** Currently active control node (null when none selected) */
    activeNode: string | null
    /** Callback to set the active node (called on hover) */
    setActiveNode: (node: string | null) => void
}

/**
 * useScrambleText - Animated text scramble effect hook
 * 
 * Creates a decoding animation where random characters gradually
 * reveal the target text. Creates a "hacking/decoding" visual effect
 * used for the console center label.
 * 
 * ALGORITHM:
 * 1. Start with all characters random
 * 2. Every `speed` milliseconds, reveal one more character from target
 * 3. Remaining characters continue to show random values
 * 4. Animation completes when all characters match target
 * 
 * @param text - Target text to eventually display
 * @param speed - Milliseconds between character updates (default: 30)
 * @returns Currently displayed (possibly scrambled) text
 */
function useScrambleText(text: string, speed = 30) {
    const [displayedText, setDisplayedText] = React.useState(text)
    
    /** Character set for random scrambling - tech/hacker aesthetic */
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"

    React.useEffect(() => {
        let iterations = 0
        
        const interval = setInterval(() => {
            setDisplayedText(
                text.split("").map((char, index) => {
                    // Characters before 'iterations' are locked to target
                    if (index < iterations) return text[index]
                    // Remaining characters show random values
                    return chars[Math.floor(Math.random() * chars.length)]
                }).join("")
            )
            
            // Stop when all characters revealed
            if (iterations >= text.length) clearInterval(interval)
            
            // Reveal ~1 character every 3 iterations (creates smoother effect)
            iterations += 1 / 3
        }, speed)
        
        return () => clearInterval(interval)
    }, [text, speed])
    
    return displayedText
}

/**
 * Control button configuration
 * 
 * Defines the 6 control icons arranged in a hexagon around the cube.
 * Each icon represents a system monitoring/control function.
 * 
 * LAYOUT:
 * Icons are positioned at 60° intervals starting from top (−90°):
 * 
 *         SYS (0°)
 *        /         \
 *   CFG (300°)   NET (60°)
 *      |           |
 *   PWR (240°)   SEC (120°)
 *        \         /
 *         DB (180°)
 */
const controls = [
    { icon: Activity, label: "SYS" },   // System monitoring
    { icon: Cloud, label: "NET" },      // Network status
    { icon: Shield, label: "SEC" },     // Security status
    { icon: Database, label: "DB" },    // Database status
    { icon: Zap, label: "PWR" },        // Power/Performance
    { icon: Settings, label: "CFG" },   // Configuration
]

/**
 * ConsoleView - Main console visualization component
 * 
 * Renders the star topology console with:
 * - Centered 3D isometric cube (ConsoleCube)
 * - 6 orbital control buttons arranged in a hexagon
 * - Electric lines connecting cube to each button
 * - Scrambled text overlay showing active node name
 * 
 * THEME HANDLING:
 * This component does NOT subscribe to theme changes directly. The
 * ConsoleCube and ElectricLine components handle theme updates internally
 * by reading CSS variables every frame. This avoids unnecessary re-renders
 * and ensures smooth color transitions.
 * 
 * @param activeNode - Currently hovered/active control node
 * @param setActiveNode - Callback to update active node state
 */
export function ConsoleView({ activeNode, setActiveNode }: ConsoleViewProps) {
    /**
     * Container dimensions state
     * 
     * Used to calculate all positioning for cube and buttons.
     * Measured via ResizeObserver-like pattern with resize event listener.
     */
    const [containerSize, setContainerSize] = React.useState({ width: 0, height: 0 })
    
    /** Reference to container element for dimension measurement */
    const containerRef = React.useRef<HTMLDivElement>(null)

    /**
     * Display text with scramble animation
     * Shows "CONSOLE" by default, or active node label when hovered
     */
    const displayText = useScrambleText(activeNode || "CONSOLE")

    /**
     * Container dimension measurement effect
     * 
     * Sets up resize listener to update container dimensions.
     * Also includes a 100ms delayed measurement to catch layout shifts
     * after initial mount.
     */
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
        
        // Initial measurement
        updateSize()
        
        // Delayed measurement for layout shift compensation
        const timeout = setTimeout(updateSize, 100)
        
        // Listen for resize events
        window.addEventListener('resize', updateSize)
        
        return () => {
            window.removeEventListener('resize', updateSize)
            clearTimeout(timeout)
        }
    }, [])

    /**
     * Center point calculations
     * Used as origin for all radial positioning
     */
    const centerX = containerSize.width / 2
    const centerY = containerSize.height / 2

    /**
     * Layout constants
     * 
     * buttonSize: 44px - Standard touch target size, matches --console-button-size
     * halfButton: 22px - Offset to center buttons on their position points
     * outerRadius: Distance from center to button centers
     * 
     * outerRadius calculation pushes buttons to container edges while
     * accounting for button size, ensuring they don't overflow.
     */
    const buttonSize = 44
    const halfButton = buttonSize / 2
    const outerRadius = Math.min(centerX, centerY) - halfButton

    return (
        <div ref={containerRef} className="relative w-full h-full flex items-center justify-center">
            {containerSize.width > 0 && containerSize.height > 0 && (
                <div className="relative" style={{ width: containerSize.width, height: containerSize.height }}>
                    {/**
                     * ConsoleCube - 3D cube with electric line connections
                     * 
                     * CRITICAL: No key prop is used here. This component persists
                     * across theme changes. Theme color updates are handled by
                     * ElectricLine reading --primary directly every frame.
                     * 
                     * DO NOT add key={colorScheme} - it will break theme switching
                     * by forcing remount and causing race conditions with CSS
                     * variable cascade timing.
                     */}
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                        <ConsoleCube
                            isActive={!!activeNode}
                            isHovering={!!activeNode}
                            width={containerSize.width}
                            height={containerSize.height}
                            satellitePositions={controls.map((control, index) => {
                                /**
                                 * Calculate button position using polar coordinates
                                 * - Angle: evenly distributed around circle (360°/6 = 60° apart)
                                 * - Start from top: subtract 90° so first button is at top
                                 * - Convert to radians for Math.cos/sin
                                 */
                                const angle = (index * (360 / controls.length) - 90) * (Math.PI / 180)
                                return {
                                    x: centerX + outerRadius * Math.cos(angle),
                                    y: centerY + outerRadius * Math.sin(angle),
                                    id: control.label,
                                    isActive: activeNode === control.label
                                }
                            })}
                        />
                    </div>

                    {/**
                     * Center text overlay
                     * 
                     * Positioned directly over the cube center using translate.
                     * Shows scrambled text that reveals "CONSOLE" or the active
                     * node label.
                     * 
                     * z-index: 10 ensures text appears above cube but below buttons
                     */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
                        <span className="text-xs font-mono font-bold tracking-widest text-[hsl(var(--sidebar-primary))] drop-shadow-[0_0_10px_hsl(var(--sidebar-primary)/0.8)]">
                            {displayText}
                        </span>
                    </div>

                    {/**
                     * Control buttons - Orbital icons around the cube
                     * 
                     * Each button:
                     * - Uses absolute positioning with calculated coordinates
                     * - Has hover effects showing electric glow
                     * - Triggers active state on mouse enter
                     * - Clears active state on mouse leave
                     */}
                    {controls.map((control, index) => {
                        // Calculate position using same polar coordinate formula
                        const angle = (index * (360 / controls.length) - 90) * (Math.PI / 180)
                        const x = centerX + outerRadius * Math.cos(angle)
                        const y = centerY + outerRadius * Math.sin(angle)

                        return (
                            <Button
                                key={control.label}
                                variant="ghost"
                                size="icon"
                                className={cn(
                                    // Base styles
                                    "absolute rounded-full border backdrop-blur-[4px] transition-all duration-300 z-20",
                                    // Default state - subtle glow
                                    "border-[hsl(var(--fx-tech-border)/0.3)] bg-[hsl(var(--fx-tech-glow)/0.05)]",
                                    "shadow-[0_0_10px_hsl(var(--fx-tech-glow)/0.1)]",
                                    // Hover state - increased glow
                                    "hover:border-[hsl(var(--fx-tech-border)/1)] hover:bg-[hsl(var(--fx-tech-glow)/0.2)]",
                                    "hover:shadow-[0_0_20px_hsl(var(--fx-tech-glow)/0.6)]",
                                    // Active state - maximum glow
                                    activeNode === control.label && [
                                        "border-[hsl(var(--fx-tech-border)/1)] bg-[hsl(var(--fx-tech-glow)/0.3)]",
                                        "shadow-[0_0_30px_hsl(var(--fx-tech-glow)/0.8)] ring-1 ring-[hsl(var(--fx-tech-glow)/1)]"
                                    ]
                                )}
                                style={{
                                    // Position button center at calculated point
                                    left: x - halfButton,
                                    top: y - halfButton,
                                    width: buttonSize,
                                    height: buttonSize
                                }}
                                onMouseEnter={() => setActiveNode(control.label)}
                                onMouseLeave={() => setActiveNode(null)}
                            >
                                {/**
                                 * Icon - Sized via CSS variable for theme consistency
                                 * --console-icon-size allows global icon size adjustment
                                 */}
                                <control.icon className="w-[var(--console-icon-size)] h-[var(--console-icon-size)]" />
                            </Button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}
