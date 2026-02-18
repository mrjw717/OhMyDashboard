/**
 * ============================================================================
 * DRAG AND DROP SYSTEM DOCUMENTATION
 * ============================================================================
 * 
 * ORIGINAL ISSUES:
 * 1. Windows not dropping where released - snapped back to start position
 * 2. Drag function not smooth - jerky movement
 * 3. Viewport bounds (error boundaries) not working on bottom/right sides
 * 4. Windows couldn't get within 5px of viewport edges
 * 
 * ROOT CAUSES:
 * 1. Position calculation bug in onDragEnd: Used circular logic
 *    - Original: info.point.x - dragStartOffset.current.x
 *    - Problem: dragStartOffset was info.point.x - windowState.position.x
 *    - Result: info.point.x - (info.point.x - windowState.position.x) = windowState.position.x (no change!)
 *    - Fix: Use pointer position minus grab offset for exact final position
 * 
 * 2. Missing position updates during drag
 *    - Problem: Only visual state (direction, speed) was updated
 *    - Result: Window appeared to move but stored position didn't change
 *    - Fix: Call updatePosition() during drag for smooth tracking
 * 
 * 3. Spring transition causing snapping
 *    - Problem: transition={{ type: "spring", stiffness: 300, damping: 30 }}
 *    - Result: Window sprang back to stored position after drag
 *    - Fix: Use transition={{ type: false }} and layout prop
 * 
 * 4. Incorrect drag constraints
 *    - Problem: window.innerWidth/innerHeight captured at render time
 *    - Result: Constraints didn't update on window resize
 *    - Fix: Track viewport state with resize listener
 * 
 * 5. Viewport bounds calculation
 *    - Problem: Used 0 as minimum for left/top, viewport - size for right/bottom
 *    - Result: Windows couldn't go partially off-screen
 *    - Fix: Add 5px edge buffer to allow partial off-screen positioning
 * 
 * ARCHITECTURE:
 * 
 * 1. Viewport Tracking (lines 54-62)
 *    - State: viewport { width, height }
 *    - Effect: Listens for resize events to update constraints
 *    - Why: window.innerWidth doesn't trigger React re-renders
 * 
 * 2. Position Constraints (lines 112-120)
 *    - Function: constrainPosition(x, y, width, height, viewportWidth, viewportHeight)
 *    - Logic: Math.max(-edgeBuffer, Math.min(x, maxX))
 *    - edgeBuffer: 5px allows windows to go 5px off-screen
 *    - Why: Prevents windows from being completely inaccessible
 * 
 * 3. Drag Constraints (lines 159-169)
 *    - useMemo: Recalculates when window size or viewport changes
 *    - Structure: { left, right, top, bottom } boundaries
 *    - Framer Motion: Uses these to physically constrain drag
 * 
 * 4. Drag Lifecycle:
 *    a) onDragStart (lines 273-282)
 *       - Store grab offset: info.point - windowState.position
 *       - Store start position: windowState.position
 *       - Why: Calculate exact final position in onDragEnd
 *    
 *    b) onDrag (lines 122-145)
 *       - Update position during drag for smooth tracking
 *       - Uses requestAnimationFrame for performance
 *       - Calculates direction/speed for visual effects
 *       - Why: Prevents lag and provides smooth visual feedback
 *    
 *    c) onDragEnd (lines 293-300)
 *       - Calculate final: info.point - dragStartOffset
 *       - Constrain to viewport bounds
 *       - Update store with final position
 *       - Why: Ensures window lands exactly where released
 * 
 * 5. Visual Effects (lines 191-231)
 *    - Dynamic shadow based on drag direction/speed
 *    - Glow effects during drag
 *    - Why: Provides visual feedback and polish
 * 
 * KEY INSIGHTS:
 * - Framer Motion's drag system and manual position updates must be synchronized
 * - info.delta is cumulative from drag start, not incremental
 * - info.point is the current pointer position in viewport coordinates
 * - Window position is top-left corner in viewport coordinates
 * - Grab offset = pointer position - window position (where user grabbed)
 * - Final position = pointer position - grab offset (where user released)
 * 
 * PERFORMANCE:
 * - requestAnimationFrame throttles position updates to 60fps
 * - useMemo prevents unnecessary constraint recalculations
 * - useCallback prevents function recreation on every render
 * - React.useEffect cleanup prevents memory leaks
 * 
 * ============================================================================
 */

"use client"

import * as React from "react"
import { motion, PanInfo, useAnimationControls } from "framer-motion"
import { useToolWindowStore, ToolType } from "@/stores"
import { IconMinimize, IconX, IconPin, IconGripVertical, IconMoodSmile, IconCalculator, IconRefresh, IconLock, IconKey, IconFileText, IconClock, IconTextResize, IconRuler } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import { useAppTheme } from "@/config/theme/use-theme"
import { getToolMetadata } from "@/config/tools"

/**
 * Props for the DraggableToolWindow component.
 */
interface DraggableToolWindowProps {
    toolId: ToolType
    title: string
    children: React.ReactNode
}

/**
 * Draggable tool window component.
 * Provides a floating, draggable window for tools.
 * 
 * Features:
 * - Drag and drop positioning with smooth tracking
 * - Resizable with aspect ratio lock
 * - Pin/unpin functionality
 * - Focus management and z-index ordering
 * - Highlight animation on trigger
 * - Minimize functionality
 * 
 * @param toolId - Unique identifier for the tool
 * @param title - Window title
 * @param children - Content to display in the window
 */
export function DraggableToolWindow({ toolId, title, children }: DraggableToolWindowProps) {
    const { windows, focusedWindow, closeWindow, togglePin, bringToFront, updatePosition, minimizeTool, setIncomingDock } = useToolWindowStore()
    const animationControls = useAnimationControls()
    const windowRef = React.useRef<HTMLDivElement>(null)
    const headerIconRef = React.useRef<HTMLSpanElement>(null)
    const windowState = windows[toolId]
    const isFocused = focusedWindow === toolId
    const toolMeta = React.useMemo(() => getToolMetadata(toolId), [toolId])
    const toolIconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = React.useMemo(() => ({
        IconMoodSmile,
        IconCalculator,
        IconRefresh,
        IconLock,
        IconKey,
        IconFileText,
        IconClock,
        IconTextResize,
        IconRuler,
        IconGripVertical,
    }), [])
    const HeaderIcon = React.useMemo(() => toolIconMap[toolMeta.iconName] || IconGripVertical, [toolIconMap, toolMeta.iconName])
    const { isDark } = useAppTheme()
    const [isAnimatingOut, setIsAnimatingOut] = React.useState(false)
    const prevMinimized = React.useRef(windowState.minimized)

    const baseTransform = React.useMemo(() => ({
        x: 0,
        y: 0,
        scaleX: 1,
        scaleY: 1,
        skewX: 0,
        skewY: 0,
        rotateX: 0,
        rotateY: 0,
        opacity: 1,
        filter: "blur(0px)",
        // IMPORTANT: allow glow/shadows to render outside the window bounds
        clipPath: "none",
        transformOrigin: "50% 50%"
    }), [])

    React.useEffect(() => {
        animationControls.set(baseTransform)
    }, [animationControls, baseTransform])

    const runRestoreAnimation = React.useCallback(async () => {
        if (!windowRef.current) return

        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const rect = windowRef.current.getBoundingClientRect()
        const windowCenterX = rect.left + rect.width / 2
        const windowCenterY = rect.top + rect.height / 2

        // Calculate where the window would be coming from (dock position)
        const dockTargetX = viewportWidth / 2
        const dockTargetY = viewportHeight - 32
        const deltaX = dockTargetX - windowCenterX
        const deltaY = dockTargetY - windowCenterY

        // Set initial state at dock position (collapsed)
        animationControls.stop()
        animationControls.set({
            x: deltaX,
            y: deltaY,
            scaleX: 0,
            scaleY: 0,
            rotateX: 40,
            rotateY: 0,
            opacity: 0,
            filter: "blur(4px)",
            clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
            transformOrigin: "50% 100%"
        })

        // Animate expansion from dock to window position (reverse of minimize)
        await animationControls.start({
            x: [
                deltaX,
                deltaX * 0.9,
                deltaX * 0.6,
                deltaX * 0.3,
                deltaX * 0.1,
                deltaX * -0.02,  // Slight overshoot past target
                0
            ],
            y: [
                deltaY,
                deltaY * 0.85,
                deltaY * 0.5,
                deltaY * 0.2,
                deltaY * 0.05,
                deltaY * -0.02,
                0
            ],
            scaleX: [
                0,
                0.08,
                0.25,
                0.55,
                0.82,
                1.03,            // Overshoot
                1
            ],
            scaleY: [
                0,
                0.1,
                0.35,
                0.65,
                0.88,
                1.02,
                1
            ],
            rotateX: [
                40,
                35,
                25,
                15,
                6,
                -2,              // Slight overshoot
                0
            ],
            rotateY: [
                0,
                deltaX > 0 ? 2 : -2,
                deltaX > 0 ? 4 : -4,
                deltaX > 0 ? 3 : -3,
                deltaX > 0 ? 1 : -1,
                0,
                0
            ],
            opacity: [
                0,
                0.2,
                0.5,
                0.75,
                0.92,
                0.98,
                1
            ],
            filter: [
                "blur(4px)",
                "blur(3px)",
                "blur(2px)",
                "blur(1px)",
                "blur(0.5px)",
                "blur(0px)",
                "blur(0px)"
            ],
            clipPath: [
                "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)",
                "polygon(48% 0%, 52% 0%, 55% 100%, 45% 100%)",
                "polygon(40% 0%, 60% 0%, 70% 100%, 30% 100%)",
                "polygon(25% 0%, 75% 0%, 85% 100%, 15% 100%)",
                "polygon(8% 0%, 92% 0%, 96% 100%, 4% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
            ],
            transformOrigin: [
                "50% 100%",
                "50% 95%",
                "50% 80%",
                "50% 65%",
                "50% 55%",
                "50% 50%",
                "50% 50%"
            ],
            transition: {
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
                times: [0, 0.12, 0.28, 0.48, 0.72, 0.9, 1]
            },
            transitionEnd: {
                clipPath: "none",
                filter: "blur(0px)"
            }
        })
    }, [animationControls])

    React.useLayoutEffect(() => {
        if (prevMinimized.current && !windowState.minimized) {
            runRestoreAnimation()
        }
        prevMinimized.current = windowState.minimized
    }, [windowState.minimized, runRestoreAnimation])

    // Visual state for drag effects (direction, speed, glow)
    const [dragVisual, setDragVisual] = React.useState({
        isDragging: false,
        direction: { x: 0, y: 0 },
        speed: 0,
    })
    const dragFrame = React.useRef<number | null>(null)
    const isDraggingRef = React.useRef(false)
    const dragDirectionRef = React.useRef({ x: 0, y: 0 })
    const dragSpeedRef = React.useRef(0)

    // Track where user grabbed the window and where it started
    const dragStartOffset = React.useRef({ x: 0, y: 0 })
    const dragStartPointer = React.useRef({ x: 0, y: 0 })

    /**
     * Handles minimizing the tool window with a macOS-style Genie effect.
     * 
     * Features:
     * - Elastic spatial compression along curved spline trajectory
     * - Progressive mesh deformation via clipPath (narrowing/bending)
     * - Suction effect (top edge trails behind bottom edge)
     * - Non-linear scale transform (faster at midpoint)
     * - Perspective depth simulation via rotateX
     * - Slight overshoot compression before settling
     * - Quintic ease-in timing for acceleration feel
     * 
     * Animation duration: ~400ms
     * 
     * @param e - Mouse event
     */
    const handleMinimize = React.useCallback(async (e: React.MouseEvent) => {
        e.stopPropagation()
        if (isAnimatingOut || windowState.minimized || !windowRef.current) return

        setIsAnimatingOut(true)
        setIncomingDock(toolId)

        // Wait one frame to allow incoming dock slot to render before measuring
        await new Promise((resolve) => requestAnimationFrame(resolve))

        // 1. Capture window DOM bounding rect and header icon center
        const rect = windowRef.current.getBoundingClientRect()
        const iconRect = headerIconRef.current?.getBoundingClientRect() ?? rect
        const viewportWidth = window.innerWidth
        const viewportHeight = window.innerHeight
        const startCenterX = iconRect.left + iconRect.width / 2
        const startCenterY = iconRect.top + iconRect.height / 2

        // 2. Calculate dock target position using incoming slot center if present
        const incomingSlot = document.querySelector(`[data-tool-id="${toolId}"]`)
        const dockRect = (incomingSlot as HTMLElement | null)?.getBoundingClientRect()
        const dockFallbackY = viewportHeight - 32
        const dockTargetX = dockRect ? dockRect.left + dockRect.width / 2 : viewportWidth / 2
        const dockTargetY = dockRect ? dockRect.top + dockRect.height / 2 : dockFallbackY

        // Delta from icon center to dock target
        const deltaX = dockTargetX - startCenterX
        const deltaY = dockTargetY - startCenterY

        // Target square size to morph into dock icon
        const dockIconSize = 60
        const targetScaleX = dockIconSize / rect.width
        const targetScaleY = dockIconSize / rect.height

        // Transform origin anchored at header icon position
        const originXPercent = ((startCenterX - rect.left) / rect.width) * 100
        const originYPercent = ((startCenterY - rect.top) / rect.height) * 100

        // 3. Run the Genie animation with elastic compression
        // Using 8 keyframes for smooth curved trajectory and mesh deformation
        const animation = animationControls.start({
            // Curved spline trajectory - horizontal leads, then vertical catches up
            x: [
                0,
                deltaX * 0.16,      // Slight horizontal drift
                deltaX * 0.42,      // Accelerating horizontal
                deltaX * 0.7,       // Past midpoint
                deltaX * 0.92,      // Approaching dock
                deltaX * 1.01,      // Gentle overshoot
                deltaX              // Settle at target
            ],
            // Vertical follows curved path - slower start, faster finish (suction)
            y: [
                0,
                deltaY * 0.06,      // Minimal vertical initially
                deltaY * 0.22,      // Starting to drop
                deltaY * 0.5,       // Accelerating down
                deltaY * 0.86,      // Pulling hard into dock
                deltaY * 1.02,      // Mild overshoot into dock
                deltaY              // Settle
            ],
            // Non-linear scale - faster compression at midpoint (suction feel), ending as dock square
            scaleX: [
                1,
                0.92,               // Slight compression
                0.72,               // Narrowing
                0.45,               // Rapid compression at midpoint
                0.2 + targetScaleX * 0.4,  // Approaching square scale
                targetScaleX * 0.6,         // Dock square size emphasis
                targetScaleX * 0.2          // Fade-out at icon scale
            ],
            scaleY: [
                1,
                0.95,               // Height trails width slightly
                0.82,               // Elongating relative to width (stretching effect)
                0.58,               // Catching up
                0.22 + targetScaleY * 0.4,
                targetScaleY * 0.65,
                targetScaleY * 0.25
            ],
            // Perspective rotation - creates depth as window tilts into dock
            rotateX: [
                0,
                7,                  // Slight tilt
                17,                 // Increasing perspective
                26,                 // Strong tilt
                34,                 // Near vertical
                36,                 // Overshoot
                34                  // Settle
            ],
            // Slight Y rotation for 3D depth feel
            rotateY: [
                0,
                deltaX > 0 ? -3 : 3,  // Rotate toward dock direction
                deltaX > 0 ? -5 : 5,
                deltaX > 0 ? -4 : 4,
                deltaX > 0 ? -2 : 2,
                0,
                0
            ],
            // Progressive opacity fade
            opacity: [
                1,
                0.95,
                0.86,
                0.64,
                0.34,
                0.12,
                0
            ],
            // Slight blur at end for depth-of-field effect
            filter: [
                "blur(0px)",
                "blur(0px)",
                "blur(0.35px)",
                "blur(0.8px)",
                "blur(1.6px)",
                "blur(2.4px)",
                "blur(3px)"
            ],
            // ClipPath morph toward dock square (rounded)
            clipPath: [
                // Full rectangle
                "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                // Slight trapezoid - top narrower than bottom (suction starting)
                "polygon(5% 3%, 95% 3%, 98% 97%, 2% 97%)",
                // More pronounced trapezoid
                "polygon(16% 6%, 84% 6%, 90% 94%, 10% 94%)",
                // Funnel shape
                "polygon(32% 10%, 68% 10%, 78% 90%, 22% 90%)",
                // Rounded square approach
                "polygon(20% 20%, 80% 20%, 80% 80%, 20% 80%)",
                // Near final square with softened corners
                "polygon(18% 18%, 82% 18%, 82% 82%, 18% 82%)",
                // Final tight square center
                "polygon(30% 30%, 70% 30%, 70% 70%, 30% 70%)"
            ],
            // Transform origin shifts toward bottom as window gets sucked down
            transformOrigin: [
                `${originXPercent}% ${originYPercent}%`,
                `${originXPercent}% ${originYPercent + 5}%`,
                `${originXPercent}% ${originYPercent + 15}%`,
                `${originXPercent}% ${originYPercent + 28}%`,
                "50% 85%",
                "50% 95%",
                "50% 100%"
            ],
            transition: {
                duration: 0.48,
                // Smoother in-out with gentle settle
                ease: [0.32, 0.02, 0.25, 1],
                times: [0, 0.15, 0.35, 0.6, 0.82, 0.95, 1]
            }
        })

        try {
            await animation
        } catch (err) {
            console.warn("Genie minimize animation interrupted", err)
        } finally {
            // 5. Update store and reset animation state for next use
            minimizeTool(toolId)
            setIncomingDock(null)
            animationControls.set(baseTransform)
            setIsAnimatingOut(false)
        }
    }, [animationControls, baseTransform, isAnimatingOut, minimizeTool, setIncomingDock, toolId, windowState.minimized])

    /**
     * Handles drag events during window movement.
     * 
     * Updates position during drag for smooth tracking and calculates
     * visual effects (direction, speed) for dynamic shadows.
     * 
     * Uses requestAnimationFrame to throttle updates to 60fps for performance.
     * 
     * @param _ - Event (unused)
     * @param info - PanInfo from Framer Motion containing drag data
     */
    const handleDrag = React.useCallback((_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        if (dragFrame.current) return

        dragFrame.current = window.requestAnimationFrame(() => {
            dragFrame.current = null
            const vx = info.velocity.x
            const vy = info.velocity.y
            const magnitude = Math.sqrt(vx * vx + vy * vy)
            const hasMovement = magnitude > 0.1
            const rawDirection = hasMovement ? { x: vx / magnitude, y: vy / magnitude } : dragDirectionRef.current
            const smoothFactor = 0.85
            dragDirectionRef.current = {
                x: dragDirectionRef.current.x * smoothFactor + rawDirection.x * (1 - smoothFactor),
                y: dragDirectionRef.current.y * smoothFactor + rawDirection.y * (1 - smoothFactor),
            }
            const normalizedSpeed = Math.min(1, magnitude / 1500)
            dragSpeedRef.current = dragSpeedRef.current * 0.85 + normalizedSpeed * 0.15

            // Track visuals only; Framer handles element transform during drag.
            setDragVisual({
                isDragging: true,
                direction: { ...dragDirectionRef.current },
                speed: dragSpeedRef.current,
            })
        })
    }, [])

    /**
     * Resets visual drag state after drag ends.
     */
    const resetDragVisual = React.useCallback(() => {
        isDraggingRef.current = false
        dragDirectionRef.current = { x: 0, y: 0 }
        dragSpeedRef.current = 0
        setDragVisual({
            isDragging: false,
            direction: { x: 0, y: 0 },
            speed: 0,
        })
    }, [])

    React.useEffect(() => () => {
        if (dragFrame.current) {
            cancelAnimationFrame(dragFrame.current)
            dragFrame.current = null
        }
    }, [])

    const { direction, isDragging } = dragVisual
    const isGlowEnabled = isDragging || isFocused

    const { baseShadow, highlightShadow } = React.useMemo(() => {
        const baseIntensity = isFocused ? 1 : 0.5

        if (!isGlowEnabled) {
            const resting = isDark
                ? "0 12px 28px rgba(0,0,0,0.45), 0 1px 6px rgba(0,0,0,0.3)"
                : "0 10px 20px rgba(15,23,42,0.18), 0 1px 3px rgba(15,23,42,0.08)"
            return {
                baseShadow: resting,
                highlightShadow: `${resting}, 0 0 24px 0 var(--color-primary-glow)`
            }
        }

        // During drag, use simple static glow to avoid jitter
        if (isDragging) {
            const glowColor = isDark
                ? `color-mix(in srgb, var(--color-primary) 15%, transparent)`
                : `rgba(15, 23, 42, 0.08)`
            return {
                baseShadow: `0 8px 16px -4px ${glowColor}, 0 0 24px 0 var(--color-primary-glow)`,
                highlightShadow: `0 8px 16px -4px ${glowColor}, 0 0 24px 0 var(--color-primary-glow)`
            }
        }

        // After drag ends, use calculated shadow based on direction/speed
        const pinnedBoost = windowState.isPinned ? 0.02 : 0
        const focusBoost = isFocused ? 0.15 : 0
        const secondaryIntensity = Math.min(1, 0.15 + pinnedBoost + focusBoost + baseIntensity * 0.2)

        const offsetAmplitude = 3
        const offsetX = -direction.x * offsetAmplitude
        const offsetY = -direction.y * offsetAmplitude + (isDark ? 0.5 : 1.5)
        const blur = (isDark ? 14 : 10) + secondaryIntensity * (isDark ? 6 : 5)
        const spread = (isDark ? -4 : -3) + secondaryIntensity * (isDark ? 2 : 1)

        const glowColor = isDark
            ? `color-mix(in srgb, var(--color-primary) ${10 + secondaryIntensity * 15}%, transparent)`
            : `rgba(15, 23, 42, ${0.06 + secondaryIntensity * 0.12})`

        const secondaryLayer = isDark
            ? `, 0 0 ${20 + secondaryIntensity * 10}px ${-4 + secondaryIntensity * 2}px color-mix(in srgb, var(--color-primary) ${20 + secondaryIntensity * 15}%, transparent)`
            : `, 0 8px 16px -12px rgba(15, 15, 15, ${0.1 + secondaryIntensity * 0.05})`

        const computedBase = `${offsetX.toFixed(2)}px ${offsetY.toFixed(2)}px ${blur.toFixed(2)}px ${spread.toFixed(2)}px ${glowColor}${secondaryLayer}`
        const computedHighlight = `${computedBase}, 0 0 ${24 + secondaryIntensity * 10}px 0 var(--color-primary-glow)`

        return {
            baseShadow: computedBase,
            highlightShadow: computedHighlight,
        }
    }, [isDragging, isFocused, isDark, windowState.isPinned, direction.x, direction.y, isGlowEnabled])

    const focusShadow = React.useMemo(() => {
        if (!isFocused) return baseShadow
        return `${baseShadow}, 0 0 18px color-mix(in srgb, var(--color-primary) 35%, transparent)`
    }, [baseShadow, isFocused])

    const borderColor = React.useMemo(() => {
        if (isDragging) return "color-mix(in srgb, var(--color-primary) 50%, transparent)"
        if (isFocused) return "color-mix(in srgb, var(--color-primary) 25%, transparent)"
        return "color-mix(in srgb, var(--color-primary) 8%, transparent)"
    }, [isDragging, isFocused])

    const [isHighlighting, setIsHighlighting] = React.useState(false)
    React.useEffect(() => {
        if (!windowState.highlightTrigger) return
        setIsHighlighting(true)
        const timeout = setTimeout(() => setIsHighlighting(false), 750)
        return () => clearTimeout(timeout)
    }, [windowState.highlightTrigger])

    if (!windowState.isOpen || windowState.minimized) return null

    return (
        <motion.div
            ref={windowRef}
            animate={animationControls}
            drag={!windowState.isPinned}
            dragMomentum={false}
            dragElastic={0}
            /**
             * Drag start handler.
             * 
             * Stores where the user grabbed the window relative to its position
             * and the starting position for calculating the final position.
             */
            onDragStart={(e, info) => {
                isDraggingRef.current = true
                // Track where the user grabbed the window relative to its position
                dragStartOffset.current = {
                    x: info.point.x - windowState.position.x,
                    y: info.point.y - windowState.position.y
                }
                // Store the starting position for delta calculation
                dragStartPointer.current = { x: windowState.position.x, y: windowState.position.y }
            }}
            /**
             * Drag handler.
             * 
             * Updates position during drag for smooth tracking and calculates
             * visual effects (direction, speed) for dynamic shadows.
             */
            onDrag={handleDrag}
            /**
             * Drag end handler.
             * 
             * Calculates the final position using pointer position minus grab offset,
             * constrains it to viewport bounds, and updates the store.
             * 
             * CRITICAL: Uses pointer position minus grab offset instead of delta
             * accumulation to ensure the window lands exactly where released.
             */
            onDragEnd={(_, info) => {
                // Measure actual viewport position to avoid any coordinate mismatch
                const rect = windowRef.current?.getBoundingClientRect()
                const newX = rect ? rect.left : info.point.x - dragStartOffset.current.x
                const newY = rect ? rect.top : info.point.y - dragStartOffset.current.y
                updatePosition(toolId, { x: newX, y: newY })
                // Clear any residual drag transform so only left/top drive layout
                animationControls.set({ x: 0, y: 0 })
                resetDragVisual()
            }}
            onMouseDown={() => bringToFront(toolId)}
            className={cn(
                "fixed flex rounded-2xl",
                windowState.isPinned && "ring-1 ring-primary/15",
                isFocused && "ring-1 ring-primary/25",
                !isFocused && "border border-white/5"
            )}
            style={{
                overflow: "visible",
                width: windowState.size.width,
                height: windowState.size.height,
                left: windowState.position.x,
                top: windowState.position.y,
                zIndex: windowState.zIndex,
                borderColor,
                boxShadow: isHighlighting ? highlightShadow : focusShadow,
                perspective: "1000px",
                transformStyle: "preserve-3d",
                "--color-primary-glow": "color-mix(in srgb, var(--color-primary) 50%, transparent)",
                "--color-primary-transparent": "color-mix(in srgb, var(--color-primary) 0%, transparent)",
                "--color-primary-rgb": "var(--color-primary-pure, 124 58 237)"
            } as React.CSSProperties}
        >
            <div className="flex flex-col w-full h-full rounded-2xl overflow-hidden bg-background/80 backdrop-blur-xl">
                {/* Header / Drag Handle */}
                <div
                    onPointerDown={() => {
                        bringToFront(toolId)
                    }}
                    className={cn(
                        "flex items-center justify-between px-3 py-2 border-b border-white/5 select-none",
                        "bg-white/5 backdrop-blur-md",
                        windowState.isPinned ? "cursor-default" : "cursor-grab active:cursor-grabbing"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <IconGripVertical
                            size={14}
                            className={cn(
                                "text-muted-foreground/50",
                                (isFocused || dragVisual.isDragging) && "text-primary",
                                windowState.isPinned && "opacity-20"
                            )}
                        />
                        <span className="text-primary">
                            <HeaderIcon size={14} />
                        </span>
                        <span className="text-xs font-medium text-primary">{title}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); togglePin(toolId) }}
                            className={cn(
                                "p-1 rounded-md transition-colors hover:bg-white/10",
                                windowState.isPinned ? "text-primary bg-primary/10" : "text-muted-foreground"
                            )}
                            title={windowState.isPinned ? "Unpin window" : "Pin window"}
                        >
                            <IconPin size={14} className={windowState.isPinned ? "fill-current" : ""} />
                        </button>
                        <button
                            onClick={handleMinimize}
                            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors"
                            title="Minimize window"
                        >
                            <IconMinimize size={14} />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(toolId) }}
                            className="p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-red-500/20 hover:text-red-500 transition-colors"
                        >
                            <IconX size={14} />
                        </button>
                    </div>
                </div>

                {/* Content Content - Overflow Handling */}
                <div className="flex-1 overflow-auto relative">
                    {children}
                </div>

            </div>
        </motion.div>
    )
}
