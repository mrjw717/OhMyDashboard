"use client"

import React, { useEffect, useRef } from "react"
import { useBackgroundStore } from "@/stores/background-store"
import { hslToRgb } from "@/lib/client-theme"
import { useTheme } from "@/config/theme/theme-provider"
import { useTheme as useNextTheme } from "next-themes"

/**
 * GeometricShapesBackground Component
 * 
 * Renders a 3D geometric shapes visualization using HTML5 Canvas.
 * This component simulates 3D space with:
 * - Floating polyhedra (Cubes, Pyramids, Octahedrons).
 * - Perspective projection and focal length simulation.
 * - Interactive physics including mouse repulsion and collision detection.
 * - Dynamic color transitions based on current theme settings.
 * 
 * Configured via the `geometric` settings in `BackgroundStore`.
 */
export function GeometricShapesBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const settings = useBackgroundStore((state) => state.settings.geometric) || { speed: 1, count: 20 }
    const { speed, count } = settings
    const { resolvedTheme } = useNextTheme()
    const { currentTheme } = useTheme()

    // Store current and target colors for smooth transitions
    const colorRefs = useRef({
        current: {
            background: [0, 0, 0],
            foreground: [0, 0, 0],
            chart1: [0, 0, 0],
            chart2: [0, 0, 0],
            chart3: [0, 0, 0],
        },
        target: {
            background: [0, 0, 0],
            foreground: [0, 0, 0],
            chart1: [0, 0, 0],
            chart2: [0, 0, 0],
            chart3: [0, 0, 0],
        }
    })

    // Linear interpolation helper
    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
    }

    const lerpColor = (current: number[], target: number[], factor: number) => {
        return current.map((c, i) => lerp(c, target[i], factor))
    }

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas) return

        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // 1. Determine active theme colors from React State
        const isDark = resolvedTheme === 'dark'
        const activeColors = isDark ? currentTheme.dark : currentTheme.light

        // Helper to get RGB from the active theme object
        const getThemeColor = (key: string): [number, number, number] => {
            const keyMap: Record<string, string> = {
                'background': 'background',
                'foreground': 'foreground',
                'chart-1': 'chart1',
                'chart-2': 'chart2',
                'chart-3': 'chart3',
            }
            const themeKey = (keyMap[key] || key) as keyof typeof activeColors
            const hslValue = activeColors[themeKey] as string

            if (!hslValue) return [0, 0, 0]

            const [h, s, l] = hslValue.split(" ").map((v) => parseFloat(v))
            const { r, g, b } = hslToRgb(h || 0, s || 0, l || 0)
            return [r, g, b]
        }

        // Update target colors
        colorRefs.current.target = {
            background: getThemeColor('background'),
            foreground: getThemeColor('foreground'),
            chart1: getThemeColor('chart-1'),
            chart2: getThemeColor('chart-2'),
            chart3: getThemeColor('chart-3'),
        }

        // Initialize current if it's the first run
        if (colorRefs.current.current.background[0] === 0 &&
            colorRefs.current.current.background[1] === 0 &&
            colorRefs.current.current.background[2] === 0) {
            colorRefs.current.current = { ...colorRefs.current.target }
        }

        let width = (canvas.width = window.innerWidth)
        let height = (canvas.height = window.innerHeight)
        let animationFrameId: number

        // 3D Point class
        /**
         * Represents a point in 3D space.
         * Contains helper methods for applying 3D rotation matrices.
         */
        class Point3D {
            x: number
            y: number
            z: number

            constructor(x: number, y: number, z: number) {
                this.x = x
                this.y = y
                this.z = z
            }

            /** Rotates the point around the X axis */
            rotateX(angle: number) {
                const y = this.y * Math.cos(angle) - this.z * Math.sin(angle)
                const z = this.y * Math.sin(angle) + this.z * Math.cos(angle)
                return new Point3D(this.x, y, z)
            }

            /** Rotates the point around the Y axis */
            rotateY(angle: number) {
                const x = this.x * Math.cos(angle) - this.z * Math.sin(angle)
                const z = this.x * Math.sin(angle) + this.z * Math.cos(angle)
                return new Point3D(x, this.y, z)
            }

            /** Rotates the point around the Z axis */
            rotateZ(angle: number) {
                const x = this.x * Math.cos(angle) - this.y * Math.sin(angle)
                const y = this.x * Math.sin(angle) + this.y * Math.cos(angle)
                return new Point3D(x, y, this.z)
            }
        }

        /**
         * Represents a 3D polyhedron shape.
         * Manages its own vertices, rotation state, velocity, and boundary physics.
         */
        class Shape {
            x: number
            y: number
            z: number
            size: number
            vertices!: Point3D[]
            edges!: number[][]
            drift: { x: number; y: number }
            rotation: { x: number; y: number; z: number }
            rotationSpeed: { x: number; y: number; z: number }
            velocity: { x: number; y: number }
            colorIndex: 0 | 1 | 2
            type: "cube" | "pyramid" | "octahedron"
            opacity: number

            constructor() {
                this.x = Math.random() * width - width / 2
                this.y = Math.random() * height - height / 2
                this.z = Math.random() * 500
                this.size = 20 + Math.random() * 40
                this.rotation = {
                    x: Math.random() * Math.PI * 2,
                    y: Math.random() * Math.PI * 2,
                    z: Math.random() * Math.PI * 2,
                }
                this.rotationSpeed = {
                    x: (Math.random() - 0.5) * 0.02 * speed,
                    y: (Math.random() - 0.5) * 0.02 * speed,
                    z: (Math.random() - 0.5) * 0.02 * speed,
                }
                this.velocity = {
                    x: (Math.random() - 0.5) * 0.5 * speed,
                    y: (Math.random() - 0.5) * 0.5 * speed,
                }
                // Ambient drift (smooth, constant motion)
                this.drift = {
                    x: (Math.random() - 0.5) * 0.2 * speed,
                    y: (Math.random() - 0.5) * 0.2 * speed,
                }
                this.opacity = 0.1 + Math.random() * 0.2

                this.colorIndex = Math.floor(Math.random() * 3) as 0 | 1 | 2

                const types: ("cube" | "pyramid" | "octahedron")[] = ["cube", "pyramid", "octahedron"]
                this.type = types[Math.floor(Math.random() * types.length)]

                this.initGeometry()
            }

            initGeometry() {
                if (this.type === "cube") {
                    this.vertices = [
                        new Point3D(-1, -1, -1), new Point3D(1, -1, -1),
                        new Point3D(1, 1, -1), new Point3D(-1, 1, -1),
                        new Point3D(-1, -1, 1), new Point3D(1, -1, 1),
                        new Point3D(1, 1, 1), new Point3D(-1, 1, 1),
                    ]
                    this.edges = [
                        [0, 1], [1, 2], [2, 3], [3, 0], // Front
                        [4, 5], [5, 6], [6, 7], [7, 4], // Back
                        [0, 4], [1, 5], [2, 6], [3, 7], // Connecting
                    ]
                } else if (this.type === "pyramid") {
                    this.vertices = [
                        new Point3D(0, -1, 0), // Top
                        new Point3D(-1, 1, -1), new Point3D(1, 1, -1),
                        new Point3D(1, 1, 1), new Point3D(-1, 1, 1),
                    ]
                    this.edges = [
                        [0, 1], [0, 2], [0, 3], [0, 4], // Sides
                        [1, 2], [2, 3], [3, 4], [4, 1], // Base
                    ]
                } else {
                    // Octahedron
                    this.vertices = [
                        new Point3D(0, -1, 0), new Point3D(0, 1, 0),
                        new Point3D(-1, 0, 0), new Point3D(1, 0, 0),
                        new Point3D(0, 0, -1), new Point3D(0, 0, 1),
                    ]
                    this.edges = [
                        [0, 2], [0, 3], [0, 4], [0, 5], // Top pyramid
                        [1, 2], [1, 3], [1, 4], [1, 5], // Bottom pyramid
                        [2, 4], [4, 3], [3, 5], [5, 2], // Mid
                    ]
                }

            }

            update() {
                this.rotation.x += this.rotationSpeed.x
                this.rotation.y += this.rotationSpeed.y
                this.rotation.z += this.rotationSpeed.z

                this.x += this.velocity.x
                this.y += this.velocity.y

                // Boundary check (Bounce)
                // Calculate approximate visual radius for collision
                const scale = 300 / (500 + this.z)
                const radius = this.size * scale

                const rightBound = width / 2 - radius
                const leftBound = -width / 2 + radius
                const bottomBound = height / 2 - radius
                const topBound = -height / 2 + radius

                if (this.x > rightBound) {
                    this.x = rightBound
                    this.velocity.x *= -1
                } else if (this.x < leftBound) {
                    this.x = leftBound
                    this.velocity.x *= -1
                }

                if (this.y > bottomBound) {
                    this.y = bottomBound
                    this.velocity.y *= -1
                } else if (this.y < topBound) {
                    this.y = topBound
                    this.velocity.y *= -1
                }
            }

            draw(palette: number[][]) {
                if (!ctx) return

                const projectedVertices = this.vertices.map((v) => {
                    let p = v
                        .rotateX(this.rotation.x)
                        .rotateY(this.rotation.y)
                        .rotateZ(this.rotation.z)

                    // Simple perspective projection
                    const scale = 300 / (300 + this.z + 200) // fake depth
                    return {
                        x: this.x + p.x * this.size * scale + width / 2,
                        y: this.y + p.y * this.size * scale + height / 2,
                    }
                })

                ctx.beginPath()
                this.edges.forEach(([i, j]) => {
                    const p1 = projectedVertices[i]
                    const p2 = projectedVertices[j]
                    ctx.moveTo(p1.x, p1.y)
                    ctx.lineTo(p2.x, p2.y)
                })

                const c = palette[this.colorIndex]
                ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${this.opacity})`
                ctx.lineWidth = 1.5
                ctx.stroke()
            }
        }

        const shapes: Shape[] = []
        for (let i = 0; i < (count || 30); i++) {
            shapes.push(new Shape())
        }

        let mouse = { x: -1000, y: -1000 }

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect()
            mouse = {
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
            }
        }

        window.addEventListener("mousemove", handleMouseMove)

        function animate() {
            if (!ctx) return

            // Lerp colors
            const factor = 0.05
            const { current, target } = colorRefs.current

            current.background = lerpColor(current.background, target.background, factor)
            current.foreground = lerpColor(current.foreground, target.foreground, factor)
            current.chart1 = lerpColor(current.chart1, target.chart1, factor)
            current.chart2 = lerpColor(current.chart2, target.chart2, factor)
            current.chart3 = lerpColor(current.chart3, target.chart3, factor)

            // Safe access to colors for indexed usage
            const palette = [current.chart1, current.chart2, current.chart3]

            const [bgR, bgG, bgB] = current.background
            // Clear canvas completely to remove ghosting
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
            ctx.fillRect(0, 0, width, height)

            // Global Gravity Wave (Ripple from center)
            const time = Date.now() * 0.001

            // Physics updates
            shapes.forEach((shape) => {
                // Radial Ripple Force
                const distanceFromCenter = Math.sqrt(shape.x * shape.x + shape.y * shape.y)
                // Wave function: sin(distance - time) creates outward ripple
                const wave = Math.sin(distanceFromCenter * 0.005 - time)

                // Subtle force based on wave height
                // If wave > 0 pushes out, < 0 pulls in (or vice versa depending on phase)
                const rippleForce = wave * 0.05 * speed

                if (distanceFromCenter > 1) { // Avoid divide by zero
                    const nx = shape.x / distanceFromCenter
                    const ny = shape.y / distanceFromCenter
                    shape.velocity.x += nx * rippleForce
                    shape.velocity.y += ny * rippleForce
                }

                // Mouse repulsion
                const dx = shape.x - (mouse.x - width / 2)
                const dy = shape.y - (mouse.y - height / 2)
                const dist = Math.sqrt(dx * dx + dy * dy)
                const interactionRadius = 50 // Cursor size interaction

                if (dist < interactionRadius) {
                    const force = (interactionRadius - dist) / interactionRadius
                    const angle = Math.atan2(dy, dx)
                    const push = force * 1.5 * speed

                    shape.velocity.x += Math.cos(angle) * push
                    shape.velocity.y += Math.sin(angle) * push
                }

                // Friction
                shape.velocity.x *= 0.95
                shape.velocity.y *= 0.95

                // Smooth drift per shape (personality)
                shape.velocity.x += shape.drift.x * 0.05
                shape.velocity.y += shape.drift.y * 0.05
            })

            // Collision Detection
            for (let i = 0; i < shapes.length; i++) {
                for (let j = i + 1; j < shapes.length; j++) {
                    const s1 = shapes[i]
                    const s2 = shapes[j]

                    const dx = s1.x - s2.x
                    const dy = s1.y - s2.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Perspective-aware collision scaling
                    // Visual scale formula: 300 / (300 + z + 200) = 300 / (500 + z)
                    const scale1 = 300 / (500 + s1.z)
                    const scale2 = 300 / (500 + s2.z)
                    const r1 = s1.size * scale1
                    const r2 = s2.size * scale2

                    const minDist = r1 + r2

                    if (distance < minDist) {
                        // Resolve collision
                        const angle = Math.atan2(dy, dx)
                        const targetX = s2.x + Math.cos(angle) * minDist
                        const targetY = s2.y + Math.sin(angle) * minDist

                        // Move apart - Softer bounce
                        const ax = (targetX - s1.x) * 0.05
                        const ay = (targetY - s1.y) * 0.05

                        s1.velocity.x += ax
                        s1.velocity.y += ay
                        s2.velocity.x -= ax
                        s2.velocity.y -= ay
                    }
                }
            }

            shapes.forEach((shape) => {
                shape.update()
                shape.draw(palette)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        window.addEventListener("resize", handleResize)
        animate()

        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
            window.removeEventListener("resize", handleResize)
            cancelAnimationFrame(animationFrameId)
        }
    }, [speed, count, resolvedTheme, currentTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10 bg-background"
        />
    )
}
