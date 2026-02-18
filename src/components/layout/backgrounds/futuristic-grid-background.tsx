"use client"

import React, { useEffect, useRef } from "react"

import { useBackgroundStore } from "@/stores/background-store"
import { hslToRgb } from "@/lib/client-theme"
import { useTheme as useNextTheme } from "next-themes"
import { useTheme } from "@/config/theme/theme-provider"

/**
 * FuturisticGridBackground Component
 * 
 * Renders a Tron-like interactive grid with floating particles and connections.
 * Features:
 * - A perspective-warped grid floor and ceiling.
 * - Floating particles that connect when in proximity.
 * - Interactive mouse repulsion effect.
 * - Color transitions matching the active theme's chart and background colors.
 * 
 * Controlled via the `grid` settings in `BackgroundStore`.
 */
export function FuturisticGridBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const settings = useBackgroundStore((state) => state.settings.grid)
    const { repulsion, friction } = settings
    const { resolvedTheme } = useNextTheme()
    const { currentTheme } = useTheme()

    // Store current and target colors for smooth transitions
    const colorRefs = useRef({
        current: {
            background: [0, 0, 0],
            chart2: [0, 0, 0],
        },
        target: {
            background: [0, 0, 0],
            chart2: [0, 0, 0],
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
                'chart-2': 'chart2',
                'background': 'background',
            }

            const themeKey = keyMap[key] || key
            // @ts-ignore - dynamic key access
            const hslValue = activeColors[themeKey] as string

            if (!hslValue) return [0, 0, 0]

            const [h, s, l] = hslValue.split(" ").map((v) => parseFloat(v))
            const { r, g, b } = hslToRgb(h || 0, s || 0, l || 0)
            return [r, g, b]
        }

        // Update target colors
        colorRefs.current.target = {
            background: getThemeColor('background'),
            chart2: getThemeColor('chart-2'),
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

        const mouse = {
            x: width / 2,
            y: height / 2,
            radius: 150,
        }

        /**
         * Represents a single particle in the grid system.
         * Particles float, bounce off walls, and connect to nearby neighbors.
         */
        class Particle {
            x: number
            y: number
            vx: number
            vy: number
            radius: number
            opacity: number

            constructor() {
                this.x = Math.random() * width
                this.y = Math.random() * height
                this.vx = (Math.random() - 0.5) * 0.3
                this.vy = (Math.random() - 0.5) * 0.3
                this.radius = Math.random() * 2.5 + 1.5 // Even larger particles
                this.opacity = Math.random() * 0.5 + 0.5
            }

            update() {
                this.x += this.vx
                this.y += this.vy

                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                if (distance < mouse.radius) {
                    const force = (mouse.radius - distance) / mouse.radius
                    const angle = Math.atan2(dy, dx)
                    this.vx -= Math.cos(angle) * force * 0.2 * repulsion
                    this.vy -= Math.sin(angle) * force * 0.2 * repulsion
                }

                this.vx *= friction
                this.vy *= friction

                if (this.x < 0) this.x = width
                if (this.x > width) this.x = 0
                if (this.y < 0) this.y = height
                if (this.y > height) this.y = 0
            }

            draw(color: number[]) {
                if (!ctx) return
                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${this.opacity})`
                ctx.fill()
            }
        }

        const particles: Particle[] = []
        const particleCount = 100

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle())
        }

        function drawConnections(color: number[]) {
            if (!ctx) return
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x
                    const dy = particles[i].y - particles[j].y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 120) {
                        const opacity = (1 - distance / 120) * 0.3

                        const mouseDistI = Math.sqrt(
                            Math.pow(mouse.x - particles[i].x, 2) +
                            Math.pow(mouse.y - particles[i].y, 2)
                        )
                        const mouseDistJ = Math.sqrt(
                            Math.pow(mouse.x - particles[j].x, 2) +
                            Math.pow(mouse.y - particles[j].y, 2)
                        )

                        const avgMouseDist = (mouseDistI + mouseDistJ) / 2
                        const highlight =
                            avgMouseDist < mouse.radius
                                ? (1 - avgMouseDist / mouse.radius) * 0.5
                                : 0

                        ctx.beginPath()
                        ctx.moveTo(particles[i].x, particles[i].y)
                        ctx.lineTo(particles[j].x, particles[j].y)

                        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity + highlight * 0.4})`
                        ctx.lineWidth = 0.5 + highlight
                        ctx.stroke()
                    }
                }
            }
        }

        function drawGrid(color: number[]) {
            if (!ctx) return
            const gridSize = 50

            // Vertical lines
            for (let x = 0; x < width; x += gridSize) {
                ctx.beginPath()
                let firstPoint = true

                for (let y = 0; y <= height; y += 5) {
                    const dx = x - mouse.x
                    const dy = y - mouse.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let offsetX = 0
                    let offsetY = 0

                    if (distance < mouse.radius) {
                        const force = (1 - distance / mouse.radius) * 30
                        const angle = Math.atan2(dy, dx)
                        offsetX = Math.cos(angle) * force
                        offsetY = Math.sin(angle) * force
                    }

                    const finalX = x + offsetX
                    const finalY = y + offsetY

                    if (firstPoint) {
                        ctx.moveTo(finalX, finalY)
                        firstPoint = false
                    } else {
                        ctx.lineTo(finalX, finalY)
                    }
                }

                ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.15)`
                ctx.lineWidth = 1
                ctx.stroke()
            }

            // Horizontal lines
            for (let y = 0; y < height; y += gridSize) {
                ctx.beginPath()
                let firstPoint = true

                for (let x = 0; x <= width; x += 5) {
                    const dx = x - mouse.x
                    const dy = y - mouse.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let offsetX = 0
                    let offsetY = 0

                    if (distance < mouse.radius) {
                        const force = (1 - distance / mouse.radius) * 30
                        const angle = Math.atan2(dy, dx)
                        offsetX = Math.cos(angle) * force
                        offsetY = Math.sin(angle) * force
                    }

                    const finalX = x + offsetX
                    const finalY = y + offsetY

                    if (firstPoint) {
                        ctx.moveTo(finalX, finalY)
                        firstPoint = false
                    } else {
                        ctx.lineTo(finalX, finalY)
                    }
                }

                ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.15)`
                ctx.lineWidth = 1
                ctx.stroke()
            }
        }

        function animate() {
            if (!ctx) return

            // Lerp colors
            const factor = 0.05
            const { current, target } = colorRefs.current

            current.background = lerpColor(current.background, target.background, factor)
            current.chart2 = lerpColor(current.chart2, target.chart2, factor)

            const [bgR, bgG, bgB] = current.background
            // Clear canvas completely to remove ghosting
            ctx.clearRect(0, 0, width, height)
            ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
            ctx.fillRect(0, 0, width, height)

            drawGrid(current.chart2)

            particles.forEach((particle) => {
                particle.update()
                particle.draw(current.chart2)
            })

            drawConnections(current.chart2)

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.x = e.clientX
            mouse.y = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [repulsion, friction, resolvedTheme, currentTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10 bg-background"
            style={{ touchAction: "none" }}
        />
    )
}
