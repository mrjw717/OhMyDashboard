"use client"

/**
 * ConsoleCube - 3D Isometric Cube with Electric Line Connections
 * 
 * ARCHITECTURE OVERVIEW:
 * Renders a 3D isometric cube using canvas-based vertex projection and draws
 * animated "electric" lines connecting the cube's hull vertices to external
 * satellite button positions. Uses Convex Hull algorithm for wireframe.
 * 
 * ============================================================================
 * THEME SWITCHING FIX - CRITICAL DOCUMENTATION
 * ============================================================================
 * 
 * HOW THEME SWITCHING WORKS IN THIS COMPONENT:
 * 
 * ConsoleCube uses ElectricLine components for all visual elements:
 * 1. Connection lines from cube vertices to satellite buttons
 * 2. Hull lines forming the cube wireframe edges
 * 
 * When the user changes the theme, ElectricLine handles color updates
 * automatically by reading --primary directly from document.documentElement
 * every frame. This component does NOT need to:
 * - Subscribe to theme changes
 * - Pass color props to ElectricLine
 * - Remount on theme change
 * 
 * IMPORTANT: This component should NOT have a key prop that changes on
 * theme change. The parent (ConsoleView) intentionally does NOT use
 * key={colorScheme} to allow smooth theme transitions.
 * 
 * CSS VARIABLE USAGE:
 * - Vertices use --fx-tech-glow (defined as var(--primary) in globals.css)
 * - Inner glow uses --fx-tech-glow
 * - ElectricLine reads --primary directly (via getColor in electric-line.tsx)
 * 
 * All CSS variables resolve to --primary, which is set by theme-hydrator.tsx
 * on document.documentElement when the theme changes.
 * 
 * @see electric-line.tsx - Contains the getColor() theme resolution logic
 * @see console-view.tsx - Parent component (removed key prop for smooth transitions)
 * @see theme-hydrator.tsx - Sets --primary on document.documentElement
 * 
 * ============================================================================
 * CRITICAL DESIGN DECISIONS - DO NOT MODIFY WITHOUT UNDERSTANDING
 * ============================================================================
 * 
 * 1. CUBE SIZE CALCULATION (12% of container):
 *    - const size = Math.min(width, height) * 0.12
 *    - This percentage is CRITICAL for visual balance
 *    - Cube must be large enough to contain "CONSOLE" text (7 chars)
 *    - Cube must be small enough to leave visible space for electric lines
 *    - DO NOT change 0.12 without testing with full "CONSOLE" text
 *    - If container size changes in drawer, recalculate this percentage
 * 
 * 2. ISOMETRIC ANGLES (35.264°, 45°):
 *    - ISO_ANGLE_X = 35.264° (arctan(1/√2)) - Standard isometric tilt
 *    - ISO_ANGLE_Y = 45° - Standard isometric rotation
 *    - These create the classic "2.5D" isometric view
 *    - DO NOT change - this is mathematically correct for isometric projection
 * 
 * 3. HULL CALCULATION:
 *    - Uses Monotone Chain algorithm for convex hull
 *    - Hull points sorted by angle for consistent line drawing
 *    - Hull is used for: wireframe edges + finding closest vertex to satellites
 *    - DO NOT change algorithm - it's O(n log n) and produces correct hull
 * 
 * 4. SATELLITE POSITION HANDLING:
 *    - Receives satellitePositions from parent (calculated by ConsoleView)
 *    - Positions are in container coordinates, not relative to cube
 *    - getClosestHullPoint() finds nearest hull vertex for line start
 *    - Lines connect from hull vertex to satellite button center
 *    - DO NOT transform coordinates here - parent handles positioning
 * 
 * 5. ELECTRIC LINE ANIMATION:
 *    - Uses ElectricLine component (canvas-based animated lines)
 *    - Active satellites: fast (speed=35), chaotic (chaos=0.75)
 *    - Inactive: slow (speed=0.2-10), subtle (chaos=0.02-0.1)
 *    - Hover state increases activity
 *    - DO NOT increase chaos values - lines become unreadable
 * 
 * 6. CENTER TEXT OVERLAY:
 *    - Text is rendered by parent (ConsoleView), not in cube
 *    - Cube provides z-10 inner glow for text backdrop
 *    - DO NOT move text into cube - breaks centering with container
 * 
 * 7. PERFORMANCE:
 *    - Cube vertices calculated once on mount/resize
 *    - Hull points memoized via React state
 *    - Electric lines use requestAnimationFrame (handled by ElectricLine)
 *    - DO NOT add re-calculation on every frame
 */

import * as React from "react"
import { ElectricLine } from "./electric-line"
import { cn } from "@/lib/utils"

/**
 * Point3D - 3D coordinate for cube vertices
 * 
 * Values are normalized (-1 to 1) for the unit cube, then scaled
 * and projected to 2D screen coordinates.
 */
interface Point3D {
    x: number
    y: number
    z: number
}

/**
 * Point2D - 2D screen coordinate for projected vertices
 */
interface Point2D {
    x: number
    y: number
}

/**
 * Satellite - External button position for electric line connections
 * 
 * Represents one of the 6 control buttons orbiting the cube.
 * Position is in container coordinates (same coordinate system as hull points).
 */
export interface Satellite {
    /** X coordinate in container space */
    x: number
    /** Y coordinate in container space */
    y: number
    /** Unique identifier (matches control label: "SYS", "NET", etc.) */
    id: string
    /** Whether this satellite is currently active (hovered) */
    isActive: boolean
}

/**
 * Standard isometric rotation angles
 * 
 * ISO_ANGLE_X (35.264°): The angle needed to make a cube's diagonal
 * perpendicular to the view plane. Calculated as arctan(1/√2).
 * 
 * ISO_ANGLE_Y (45°): The rotation around vertical axis for 3-face view.
 * 
 * DO NOT MODIFY - These are mathematically derived for correct isometric projection
 */
const ISO_ANGLE_X = 35.264 * (Math.PI / 180)
const ISO_ANGLE_Y = 45 * (Math.PI / 180)

/**
 * ConsoleCube - Main cube rendering component
 * 
 * Renders a 3D isometric cube with:
 * - Electric line wireframe (convex hull edges)
 * - Connection lines to satellite buttons
 * - Glowing vertices at each hull point
 * - Inner glow effect at center
 * 
 * THEME HANDLING:
 * This component does NOT subscribe to theme changes. Color updates are
 * handled by ElectricLine reading --primary directly every frame, and
 * CSS variables on the vertex/glow elements update automatically.
 * 
 * @param isActive - Whether the console is active (affects animation intensity)
 * @param isHovering - Whether the user is hovering over the console area
 * @param satellitePositions - Array of satellite button positions for line connections
 * @param width - Container width in pixels
 * @param height - Container height in pixels
 */
export function ConsoleCube({
    isActive = false,
    isHovering = false,
    satellitePositions = [],
    width = 0,
    height = 0
}: {
    isActive?: boolean
    isHovering?: boolean
    satellitePositions?: Satellite[]
    width?: number
    height?: number
}) {
    /**
     * Hull points state - 2D projected vertices forming the convex hull
     * 
     * Calculated once on mount/resize, then used for:
     * - Drawing wireframe lines (hull edges)
     * - Drawing vertex dots
     * - Finding closest vertex to satellite buttons
     */
    const [hullPoints, setHullPoints] = React.useState<Point2D[]>([])

    /**
     * Cube size calculation
     * 
     * 12% of the smaller container dimension. This creates a cube that:
     * - Is large enough to visually contain "CONSOLE" text
     * - Is small enough to leave visible space for electric lines to satellites
     * - Maintains aspect ratio regardless of container shape
     */
    const size = Math.min(width, height) * 0.12

    /**
     * 3D Projection Effect
     * 
     * Projects the 8 vertices of a unit cube from 3D to 2D using isometric
     * projection, then computes the convex hull for wireframe drawing.
     * 
     * Runs only when container dimensions change (not every frame).
     */
    React.useEffect(() => {
        if (width === 0 || height === 0) return

        /**
         * Unit cube vertices
         * 
         * 8 vertices of a cube centered at origin with side length 2
         * (corners at ±1 on each axis)
         */
        const vertices: Point3D[] = [
            { x: -1, y: -1, z: -1 }, { x: 1, y: -1, z: -1 },
            { x: 1, y: 1, z: -1 }, { x: -1, y: 1, z: -1 },
            { x: -1, y: -1, z: 1 }, { x: 1, y: -1, z: 1 },
            { x: 1, y: 1, z: 1 }, { x: -1, y: 1, z: 1 }
        ]

        // Container center for positioning
        const cx = width / 2
        const cy = height / 2

        // Static rotation angle (cube doesn't rotate)
        const angle = 0

        /**
         * Project each 3D vertex to 2D using isometric projection
         * 
         * 1. Rotate around Y axis by (angle + ISO_ANGLE_Y)
         * 2. Rotate around X axis by ISO_ANGLE_X
         * 3. Scale by cube size and translate to container center
         */
        const projected = vertices.map(v => {
            // Rotate Y axis
            const x = v.x * Math.cos(angle + ISO_ANGLE_Y) - v.z * Math.sin(angle + ISO_ANGLE_Y)
            let z = v.x * Math.sin(angle + ISO_ANGLE_Y) + v.z * Math.cos(angle + ISO_ANGLE_Y)
            let y = v.y

            // Rotate X axis (uses original y for z calculation)
            const tempY = y * Math.cos(ISO_ANGLE_X) - z * Math.sin(ISO_ANGLE_X)
            z = y * Math.sin(ISO_ANGLE_X) + z * Math.cos(ISO_ANGLE_X)
            y = tempY

            // Scale and translate to screen coordinates
            return {
                x: cx + x * size,
                y: cy + y * size
            }
        })

        // Compute convex hull for wireframe
        const hull = getConvexHull(projected)

        /**
         * Sort hull points by angle around center
         * 
         * This ensures hull lines connect points in order around the perimeter,
         * creating a closed polygon. Without sorting, lines would connect
         * in the order returned by convex hull algorithm (which may jump around).
         */
        hull.sort((a, b) => {
            const angleA = Math.atan2(a.y - cy, a.x - cx)
            const angleB = Math.atan2(b.y - cy, b.x - cx)
            return angleA - angleB
        })

        setHullPoints(hull)
    }, [width, height, size])

    /**
     * getClosestHullPoint - Find the hull vertex nearest to a target point
     * 
     * Used to determine which cube vertex each electric line should start from.
     * Lines connect from the closest hull vertex to each satellite button.
     * 
     * @param target - Target point (satellite button position)
     * @returns The hull point closest to the target
     */
    const getClosestHullPoint = (target: { x: number, y: number }) => {
        if (hullPoints.length === 0) return { x: width / 2, y: height / 2 }

        let closest = hullPoints[0]
        let minDist = Infinity

        // Find minimum squared distance (avoids sqrt for performance)
        hullPoints.forEach(p => {
            const dx = p.x - target.x
            const dy = p.y - target.y
            const dist = dx * dx + dy * dy
            if (dist < minDist) {
                minDist = dist
                closest = p
            }
        })

        return closest
    }

    return (
        <div className="relative w-full h-full pointer-events-none">
            {/**
             * Connection Lines to Satellites
             * 
             * Electric lines connecting each hull vertex to its corresponding
             * satellite button. Active satellites have faster, more chaotic lines.
             * 
             * THEME: ElectricLine reads --primary directly every frame,
             * so colors update instantly on theme change.
             */}
            {satellitePositions.map((sat) => {
                const start = getClosestHullPoint(sat)

                /**
                 * Animation parameters based on state
                 * 
                 * - Inactive: Very slow, subtle movement (humming effect)
                 * - Hovering: Slightly more active
                 * - Active (direct hover): Fast, chaotic electric effect
                 */
                const baseSpeed = isHovering ? 10 : 0.2
                const baseChaos = isHovering ? 0.05 : 0.02
                const baseOpacity = isHovering ? "opacity-60" : "opacity-30"

                return (
                    <ElectricLine
                        key={`conn-${sat.id}`}
                        x1={start.x}
                        y1={start.y}
                        x2={sat.x}
                        y2={sat.y}
                        speed={sat.isActive ? 35 : baseSpeed}
                        chaos={sat.isActive ? 0.75 : baseChaos}
                        width={sat.isActive ? 3 : 1}
                        className={cn("transition-all duration-300",
                            sat.isActive ? "opacity-100 blur-[1px] z-10" : `${baseOpacity} blur-[0px] z-0`
                        )}
                    />
                )
            })}

            {/**
             * Hull Lines - Cube Wireframe Edges
             * 
             * Electric lines connecting hull vertices to form the cube outline.
             * Active state increases animation intensity.
             * 
             * THEME: ElectricLine reads --primary directly every frame,
             * so colors update instantly on theme change.
             */}
            {hullPoints.map((p1, i) => {
                // Connect each point to the next (with wraparound for closed polygon)
                const p2 = hullPoints[(i + 1) % hullPoints.length]
                return (
                    <ElectricLine
                        key={`hull-${i}`}
                        x1={p1.x}
                        y1={p1.y}
                        x2={p2.x}
                        y2={p2.y}
                        speed={isActive ? 35 : isHovering ? 20 : 5}
                        chaos={isActive ? 0.5 : 0.1}
                        width={2}
                        className={cn("opacity-60", isActive && "opacity-100 blur-[1px]")}
                    />
                )
            })}

            {/**
             * Vertex Dots - Glowing points at each hull vertex
             * 
             * Uses --fx-tech-glow CSS variable which resolves to var(--primary).
             * Updates automatically when theme changes via CSS cascade.
             */}
            {hullPoints.map((p, i) => (
                <div
                    key={`vert-${i}`}
                    className="absolute w-2 h-2 rounded-full bg-[hsl(var(--fx-tech-glow))] shadow-[0_0_10px_hsl(var(--fx-tech-glow)/0.8)]"
                    style={{
                        // Center the 8px (w-2) dot on the vertex position
                        left: p.x - 4,
                        top: p.y - 4,
                    }}
                />
            ))}

            {/**
             * Inner Glow - Central ambient light effect
             * 
             * Creates a soft glow at the cube center that expands when active.
             * Uses --fx-tech-glow which resolves to --primary, so it updates
             * automatically with theme changes.
             */}
            <div
                className={cn(
                    "absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[hsl(var(--fx-tech-glow))] blur-xl transition-all duration-500",
                    isActive ? "opacity-20 scale-150" : "opacity-5"
                )}
            />
        </div>
    )
}

/**
 * getConvexHull - Monotone Chain Algorithm for 2D Convex Hull
 * 
 * Computes the convex hull of a set of 2D points using Andrew's monotone chain
 * algorithm. Time complexity: O(n log n) due to sorting.
 * 
 * @param points - Array of 2D points
 * @returns Array of points forming the convex hull in counter-clockwise order
 * 
 * WHY THIS ALGORITHM:
 * - O(n log n) is optimal for convex hull
 * - Produces hull points in order (no need to sort separately)
 * - Handles collinear points correctly
 * 
 * DO NOT REPLACE - This is the standard, correct implementation
 */
function getConvexHull(points: Point2D[]): Point2D[] {
    if (points.length <= 2) return points

    // Sort by X then Y for monotone chain
    const sorted = [...points].sort((a, b) => a.x === b.x ? a.y - b.y : a.x - b.x)

    const upper: Point2D[] = []
    const lower: Point2D[] = []

    // Build lower hull (left to right)
    for (const p of sorted) {
        while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
            lower.pop()
        }
        lower.push(p)
    }

    // Build upper hull (right to left)
    for (const p of sorted.reverse()) {
        while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
            upper.pop()
        }
        upper.push(p)
    }

    // Remove duplicate endpoints
    lower.pop()
    upper.pop()

    return lower.concat(upper)
}

/**
 * cross - 2D Cross Product (Z component)
 * 
 * Computes the Z component of the cross product of vectors OA and OB.
 * Used to determine the orientation of three points (clockwise/counter-clockwise/collinear).
 * 
 * @param a - First point
 * @param b - Second point  
 * @param o - Origin point
 * @returns Positive if counter-clockwise, negative if clockwise, zero if collinear
 */
function cross(a: Point2D, b: Point2D, o: Point2D) {
    return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x)
}
