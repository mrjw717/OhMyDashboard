"use client"

/**
 * ElectricLine - Canvas-based animated electric/zap line effect
 * 
 * ARCHITECTURE OVERVIEW:
 * Renders an animated "electric" line between two points using HTML5 Canvas.
 * The line appears to crackle and move with procedural noise-based displacement,
 * creating a sci-fi "energy connection" effect.
 * 
 * ============================================================================
 * CRITICAL THEME SWITCHING FIX - READ BEFORE MODIFYING
 * ============================================================================
 * 
 * THE PROBLEM:
 * When users changed the theme color, the console cube's electric lines would
 * flash/reload but the colors would NOT update to match the new theme. Users
 * had to refresh the page to see the correct colors.
 * 
 * ROOT CAUSE (Multiple Issues):
 * 
 * 1. CSS VARIABLE TIMING ISSUE:
 *    - Canvas context.strokeStyle cannot directly use CSS variables like
 *      "hsl(var(--fx-tech-line))" - it needs resolved RGB/HSL values
 *    - Initial approach used a temp DOM element with getComputedStyle()
 *    - This DOES NOT force the browser to recalculate CSS variable cascade
 *    - Result: Stale color values even after theme CSS variables were updated
 * 
 * 2. REMOUNT RACE CONDITION (in console-view.tsx):
 *    - ConsoleCube had `key={colorScheme}` which forced full remount on theme change
 *    - ElectricLine would initialize BEFORE CSS variables finished updating
 *    - The color resolution happened in a race condition with theme system
 * 
 * 3. ANIMATION LOOP STALE CLOSURE:
 *    - Original implementation resolved color once in useEffect
 *    - The animation loop (drawLine) captured this value in closure
 *    - Even if color resolved correctly, the running animation wouldn't pick it up
 * 
 * THE FIX (Three-Part Solution):
 * 
 * 1. READ --primary DIRECTLY FROM document.documentElement:
 *    - Theme system (theme-hydrator.tsx) sets --primary on :root element
 *    - getComputedStyle(document.documentElement).getPropertyValue('--primary')
 *      bypasses CSS cascade timing issues - reads the value that was JUST set
 *    - This is synchronous and guaranteed to have the latest theme value
 * 
 * 2. RESOLVE COLOR EVERY FRAME (Not Cached):
 *    - getColor() is called inside the drawLine animation loop
 *    - Every frame (60fps) reads the current --primary value
 *    - Theme change is picked up immediately on next frame render
 *    - Minimal performance impact: single getPropertyValue call per frame
 * 
 * 3. INCLUDE colorScheme IN USEEFFECT DEPENDENCIES:
 *    - When colorScheme changes, useEffect re-runs
 *    - Cancels old animation, starts new one with fresh closure
 *    - Ensures animation loop has access to updated getColor function
 * 
 * 4. REMOVED key={colorScheme} FROM CONSOLE-VIEW.TSX:
 *    - ConsoleCube no longer remounts on theme change
 *    - Component persists, avoiding initialization race conditions
 *    - Color updates happen smoothly without flash/reload
 * 
 * WHY THIS WORKS:
 * - CSS variables on :root are updated synchronously by theme-hydrator.tsx
 * - Reading directly from document.documentElement avoids cascade timing
 * - Per-frame color resolution means theme change is visible within 16ms
 * - No remounting means no race conditions or visual flashing
 * 
 * @see console-view.tsx - Parent component (removed key prop)
 * @see theme-hydrator.tsx - Theme system that sets --primary on :root
 * @see console-cube.tsx - Uses ElectricLine for cube wireframe and connections
 */

import { useEffect, useRef, useCallback } from "react"
import { useTheme } from "@/app/theme-hydrator"

/**
 * Props for the ElectricLine component
 */
interface ElectricLineProps {
    /** X coordinate of line start point (container-relative) */
    x1: number
    /** Y coordinate of line start point (container-relative) */
    y1: number
    /** X coordinate of line end point (container-relative) */
    x2: number
    /** Y coordinate of line end point (container-relative) */
    y2: number
    /** Animation speed multiplier (default: 1). Higher = faster crackling */
    speed?: number
    /** Chaos/displacement amount (default: 0.1). Higher = more erratic movement */
    chaos?: number
    /** Line width in pixels (default: 1) */
    width?: number
    /** Additional CSS classes to apply to canvas element */
    className?: string
}

/**
 * ElectricLine - Animated electric/zap line effect using Canvas
 * 
 * Creates a procedurally animated line that appears to crackle with electrical
 * energy. Uses noise functions to create organic, non-repetitive movement.
 * 
 * ANIMATION TECHNIQUE:
 * - Line is divided into segments (distance/2 segments, minimum 2)
 * - Each segment point is displaced perpendicular to the line direction
 * - Displacement is calculated using octaved 2D noise for natural movement
 * - Envelope function (sin(t*PI)) ensures endpoints stay fixed
 * - Shadow blur creates glow effect matching the line color
 * 
 * PERFORMANCE CONSIDERATIONS:
 * - Canvas is positioned absolutely, no DOM layout thrashing
 * - Shadow blur is reset to 0 after each frame (expensive operation)
 * - Device pixel ratio is capped at 2 to prevent excessive canvas size
 * - Noise functions use cached callbacks via useCallback
 * 
 * @param props - Line coordinates and animation parameters
 * @returns Canvas element rendering the animated line
 */
export function ElectricLine({
    x1,
    y1,
    x2,
    y2,
    speed = 1,
    chaos = 0.1,
    width = 1,
    className,
}: ElectricLineProps) {
    /** Reference to the canvas element */
    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    /** Animation frame ID for cleanup */
    const animationRef = useRef<number | null>(null)
    
    /** Accumulated time for noise animation */
    const timeRef = useRef(0)
    
    /** Timestamp of last frame for delta time calculation */
    const lastFrameTimeRef = useRef(0)
    
    /**
     * Current color scheme from theme context.
     * 
     * IMPORTANT: This is included in the useEffect dependency array below.
     * When colorScheme changes, the animation loop is restarted with a fresh
     * closure, ensuring getColor() picks up the new theme values.
     */
    const { colorScheme } = useTheme()

    /**
     * getColor - Resolve the current theme color for the line
     * 
     * CRITICAL: This function is called EVERY FRAME to ensure theme changes
     * are picked up immediately without requiring a page refresh.
     * 
     * WHY READ --primary DIRECTLY:
     * - Theme system sets --primary on document.documentElement (:root)
     * - getComputedStyle(element).getPropertyValue('--var') reads the ACTUAL
     *   computed value, not a cached or cascaded value
     * - This bypasses CSS cascade timing issues that plagued the previous
     *   implementation (temp element approach)
     * 
     * ALTERNATIVE APPROACHES THAT FAILED:
     * 1. temp element + getComputedStyle().color
     *    - Race condition: CSS cascade not yet recalculated
     *    - Would return old/stale color values
     * 
     * 2. CSS variable in canvas strokeStyle directly
     *    - Canvas API doesn't support CSS variables
     *    - Would result in invalid color (fallback to black)
     * 
     * 3. Caching resolved color in ref/state
     *    - Animation loop closure wouldn't see updates
     *    - Required useEffect dependency changes and re-initialization
     * 
     * @returns HSL color string resolved from current --primary CSS variable
     */
    const getColor = useCallback(() => {
        if (typeof window === "undefined") return "rgb(128, 128, 128)"
        
        // Read --primary directly from :root where theme-hydrator sets it
        // This is synchronous and always returns the current theme value
        const primary = getComputedStyle(document.documentElement)
            .getPropertyValue('--primary')
            .trim()
        
        // --primary is stored as HSL values (e.g., "262.1 83.3% 57.8%")
        // Canvas accepts hsl() format directly
        return `hsl(${primary})`
    }, [])

    /**
     * random - Deterministic pseudo-random function for noise generation
     * 
     * Uses sine-based hash to generate reproducible "random" values.
     * Same input always produces same output, which is essential for
     * consistent noise patterns across frames.
     * 
     * @param x - Input seed value
     * @returns Pseudo-random value between -1 and 1
     */
    const random = useCallback((x: number) => {
        return (Math.sin(x * 12.9898) * 43758.5453) % 1
    }, [])

    /**
     * noise2D - 2D smooth noise function using bilinear interpolation
     * 
     * Generates smooth, continuous noise values for (x, y) coordinates.
     * Uses the random() function for grid point values and interpolates
     * between them for smooth transitions.
     * 
     * ALGORITHM:
     * 1. Floor coordinates to get grid cell (i, j)
     * 2. Calculate fractional position within cell (fx, fy)
     * 3. Sample random values at all four corners of the cell
     * 4. Interpolate using smoothstep (cubic Hermite interpolation)
     * 
     * @param x - X coordinate (can be fractional)
     * @param y - Y coordinate (can be fractional)
     * @returns Smooth noise value between 0 and 1
     */
    const noise2D = useCallback(
        (x: number, y: number) => {
            const i = Math.floor(x)
            const j = Math.floor(y)
            const fx = x - i
            const fy = y - j

            // Sample four corners of the grid cell
            const a = random(i + j * 57)
            const b = random(i + 1 + j * 57)
            const c = random(i + (j + 1) * 57)
            const d = random(i + 1 + (j + 1) * 57)

            // Smoothstep interpolation (smoother than linear)
            const ux = fx * fx * (3.0 - 2.0 * fx)
            const uy = fy * fy * (3.0 - 2.0 * fy)

            // Bilinear interpolation
            return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy
        },
        [random]
    )

    /**
     * octavedNoise - Multi-octave fractal noise for natural variation
     * 
     * Combines multiple layers (octaves) of noise at different frequencies
     * and amplitudes to create more complex, natural-looking patterns.
     * This is similar to Perlin noise's fractal brownian motion (fBm).
     * 
     * HOW IT WORKS:
     * - Each octave doubles the frequency (lacunarity = 2)
     * - Each octave halves the amplitude (gain = 0.5)
     * - Lower octaves provide broad, smooth movement
     * - Higher octaves add fine detail and variation
     * - Time parameter animates the noise field
     * 
     * @param x - Position along the line (0 to ~10, scaled from segment index)
     * @param octaves - Number of noise layers (4 provides good detail)
     * @param lacunarity - Frequency multiplier per octave (typically 2)
     * @param gain - Amplitude multiplier per octave (typically 0.5)
     * @param baseAmplitude - Starting amplitude (derived from chaos prop)
     * @param baseFrequency - Starting frequency (0.05 works well for lines)
     * @param time - Animation time value (advances noise field)
     * @returns Combined noise value from all octaves
     */
    const octavedNoise = useCallback(
        (
            x: number,
            octaves: number,
            lacunarity: number,
            gain: number,
            baseAmplitude: number,
            baseFrequency: number,
            time: number
        ) => {
            let y = 0
            let amplitude = baseAmplitude
            let frequency = baseFrequency

            for (let i = 0; i < octaves; i++) {
                y += amplitude * noise2D(frequency * x, time * frequency * 0.3)
                frequency *= lacunarity
                amplitude *= gain
            }

            return y
        },
        [noise2D]
    )

    /**
     * Main animation effect - Sets up canvas and runs animation loop
     * 
     * This effect initializes the canvas element, calculates line geometry,
     * and starts the requestAnimationFrame loop for continuous animation.
     * 
     * DEPENDENCY ARRAY EXPLAINED:
     * - x1, y1, x2, y2: Line position changes require canvas resize/reposition
     * - speed, chaos, width: Animation parameter changes require restart
     * - colorScheme: Theme change requires new closure with updated getColor
     * - getColor: Function reference (stable due to useCallback)
     * - octavedNoise: Function reference (stable due to useCallback)
     * 
     * IMPORTANT: Including colorScheme ensures that when the theme changes,
     * this effect re-runs, cancelling the old animation and starting a new
     * one. The new animation's drawLine closure will call the updated
     * getColor() function, which reads the new --primary value.
     */
    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Calculate canvas bounds with padding for line displacement
        // The animated line can deviate from the straight path, so we need
        // extra canvas space to avoid clipping
        const padding = 100
        const minX = Math.min(x1, x2) - padding
        const minY = Math.min(y1, y2) - padding
        const maxX = Math.max(x1, x2) + padding
        const maxY = Math.max(y1, y2) + padding
        const canvasWidth = maxX - minX
        const canvasHeight = maxY - minY

        // Guard against zero-size canvas (would cause errors)
        if (canvasWidth <= 0 || canvasHeight <= 0) return

        // Set up high-DPI canvas rendering
        // Cap at 2x to prevent excessive memory usage on high-DPI displays
        const dpr = typeof window !== 'undefined' ? Math.min(window.devicePixelRatio || 1, 2) : 1
        canvas.width = canvasWidth * dpr
        canvas.height = canvasHeight * dpr
        canvas.style.width = `${canvasWidth}px`
        canvas.style.height = `${canvasHeight}px`
        
        // Position canvas to cover the line's bounding box
        canvas.style.left = `${minX}px`
        canvas.style.top = `${minY}px`
        canvas.style.position = "absolute"
        canvas.style.pointerEvents = "none"

        // Apply DPI scaling to context
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.scale(dpr, dpr)

        // Convert absolute coordinates to canvas-relative coordinates
        const startX = x1 - minX
        const startY = y1 - minY
        const endX = x2 - minX
        const endY = y2 - minY

        // Calculate line direction vector and length
        const dx = endX - startX
        const dy = endY - startY
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Calculate perpendicular vector for displacement
        // Noise displacement is applied perpendicular to line direction
        const perpX = -dy / distance
        const perpY = dx / distance

        /**
         * drawLine - Animation frame callback
         * 
         * Called 60 times per second via requestAnimationFrame.
         * Redraws the electric line with time-based noise animation.
         * 
         * THEME COLOR RESOLUTION:
         * getColor() is called EVERY FRAME inside this function.
         * This ensures that when the theme changes, the very next frame
         * will pick up the new color value immediately.
         * 
         * @param currentTime - High-resolution timestamp from requestAnimationFrame
         */
        const drawLine = (currentTime: number) => {
            if (!canvas || !ctx) return

            // Calculate delta time for smooth animation regardless of frame rate
            const deltaTime = (currentTime - lastFrameTimeRef.current) / 1000
            timeRef.current += deltaTime * speed
            lastFrameTimeRef.current = currentTime

            // Clear previous frame
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)

            // CRITICAL: Get current theme color EVERY FRAME
            // This is what enables instant theme switching without refresh
            const currentColor = getColor()
            
            ctx.strokeStyle = currentColor
            ctx.lineWidth = width
            ctx.lineCap = "round"
            ctx.lineJoin = "round"

            // Glow effect - shadow color matches line color
            ctx.shadowBlur = width * 2
            ctx.shadowColor = currentColor

            // Calculate segment count based on line length
            // More segments = smoother curve but more computation
            const segments = Math.max(Math.floor(distance / 2), 2)
            
            // Amplitude scales with chaos parameter
            const amplitude = chaos * 30
            const frequency = 0.05

            // Begin drawing the noisy line
            ctx.beginPath()
            ctx.moveTo(startX, startY)

            // Generate displaced points along the line
            for (let i = 1; i < segments; i++) {
                // Interpolation parameter (0 at start, 1 at end)
                const t = i / segments
                
                // Base position along the straight line
                const px = startX + dx * t
                const py = startY + dy * t

                // Calculate noise-based displacement
                const noise = octavedNoise(
                    t * 10,        // Position along line (scaled for noise variation)
                    4,             // Octaves
                    2,             // Lacunarity
                    0.5,           // Gain
                    amplitude,     // Base amplitude from chaos prop
                    frequency,     // Base frequency
                    timeRef.current // Time for animation
                )

                // Envelope function: sin(t*PI) peaks at t=0.5, zero at endpoints
                // This ensures the line starts and ends at the correct positions
                const envelope = Math.sin(t * Math.PI)
                const displacement = noise * envelope

                // Apply displacement perpendicular to line direction
                const tx = px + perpX * displacement
                const ty = py + perpY * displacement

                ctx.lineTo(tx, ty)
            }

            // Draw final segment to endpoint
            ctx.lineTo(endX, endY)
            ctx.stroke()

            // Reset shadow blur for performance
            // Shadow blur is expensive - only enable during actual drawing
            ctx.shadowBlur = 0

            // Schedule next frame
            animationRef.current = requestAnimationFrame(drawLine)
        }

        // Start animation loop
        animationRef.current = requestAnimationFrame(drawLine)

        // Cleanup: Cancel animation on unmount or dependency change
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [x1, y1, x2, y2, speed, chaos, width, colorScheme, getColor, octavedNoise])

    return <canvas ref={canvasRef} className={className} />
}
