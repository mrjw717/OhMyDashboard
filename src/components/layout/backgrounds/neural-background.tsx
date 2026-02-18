"use client"

import React, { useEffect, useRef } from "react"

import { useBackgroundStore } from "@/stores/background-store"
import { hslToRgb } from "@/lib/client-theme"
import { useTheme as useNextTheme } from "next-themes"
import { useTheme } from "@/config/theme/theme-provider"

/**
 * NeuralBackground Component
 * 
 * Renders a complex, animated neural network visualization using HTML5 Canvas.
 * This component features:
 * - Interactive particles (Orbs) that react to mouse movement.
 * - Connected wave patterns simulating neural activity.
 * - Dynamic color transitions that smoothly interpolate between theme states (light/dark).
 * - Performance optimized animations using requestAnimationFrame.
 * 
 * The visual style is controlled via the `BackgroundStore`, allowing for real-time
 * adjustments to speed, turbulence, and other physics parameters.
 */
export function NeuralBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const { resolvedTheme } = useNextTheme()
    const { currentTheme } = useTheme()

    // Retrieve neural-specific physics settings from the global store
    const { speed, turbulence } = useBackgroundStore((state) => state.settings.neural)

    /**
     * refs to store current and target color states for manual interpolation.
     * We use refs instead of state to avoid triggering React re-renders during
     * the high-frequency animation loop.
     */
    const colorRefs = useRef({
        current: {
            background: [0, 0, 0], // will be set on init
            foreground: [0, 0, 0],
            primary: [0, 0, 0],
            secondary: [0, 0, 0],
            accent: [0, 0, 0],
            grid: [0, 0, 0],
        },
        target: {
            background: [0, 0, 0],
            foreground: [0, 0, 0],
            primary: [0, 0, 0],
            secondary: [0, 0, 0],
            accent: [0, 0, 0],
            grid: [0, 0, 0],
        }
    })

    /**
     * Linearly interpolates between two values.
     * @param start - The starting value.
     * @param end - The target value.
     * @param factor - The interpolation factor (0-1).
     */
    const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor
    }

    /**
     * Linearly interpolates between two RGB color arrays.
     * @param current - Current RGB color array [r, g, b].
     * @param target - Target RGB color array [r, g, b].
     * @param factor - Interpolation speed factor.
     */
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

        /**
         * Resolves a theme token to its RGB numeric representation.
         * Handles mapping between component-specific keys (e.g., 'chart-1')
         * and the theme provider's camelCase keys (e.g., 'chart1').
         * 
         * @param key - The kebab-case theme token key.
         * @returns [r, g, b] array.
         */
        const getThemeColor = (key: string): [number, number, number] => {
            const keyMap: Record<string, string> = {
                'background': 'background',
                'foreground': 'foreground',
                'chart-1': 'chart1',
                'chart-2': 'chart2',
                'chart-3': 'chart3',
                'border': 'border',
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
            primary: getThemeColor('chart-1'),
            secondary: getThemeColor('chart-2'),
            accent: getThemeColor('chart-3'),
            grid: getThemeColor('border'),
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
        let time = 0

        const mouse = {
            x: width / 2,
            y: height / 2,
            targetX: width / 2,
            targetY: height / 2,
            radius: 200,
        }

        /**
         * Represents a sine-wave based line in the background.
         * These waves create the flowing "liquid" feel of the network.
         */
        class Wave {
            index: number
            offset: number
            speed: number
            amplitude: number
            frequency: number
            y: number
            // Removed internal color storage to use global state

            constructor(index: number) {
                this.index = index
                this.offset = Math.random() * Math.PI * 2
                this.speed = 0.02 + Math.random() * 0.01
                this.amplitude = (30 + Math.random() * 20) * turbulence
                this.frequency = 0.003 + Math.random() * 0.002
                this.y = (index / 8) * height
            }

            draw(time: number, color: number[]) {
                if (!ctx) return
                ctx.beginPath()

                for (let x = 0; x <= width; x += 3) {
                    const waveY =
                        Math.sin(x * this.frequency + time * this.speed + this.offset) *
                        this.amplitude

                    const dx = x - mouse.x
                    const dy = this.y + waveY - mouse.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let mouseEffect = 0
                    if (distance < mouse.radius) {
                        const force = 1 - distance / mouse.radius
                        mouseEffect = Math.sin(force * Math.PI) * 60
                    }

                    const finalY = this.y + waveY + mouseEffect

                    if (x === 0) {
                        ctx.moveTo(x, finalY)
                    } else {
                        ctx.lineTo(x, finalY)
                    }
                }

                const centerDist = Math.abs(this.y - mouse.y)
                const baseOpacity = 0.08
                const highlight =
                    centerDist < mouse.radius * 1.5
                        ? (1 - centerDist / (mouse.radius * 1.5)) * 0.2
                        : 0

                ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${baseOpacity + highlight})`
                ctx.lineWidth = 1.5 + highlight * 1.5
                ctx.stroke()
            }
        }

        /**
         * Represents a floating particle (Orb) that interacts with the mouse cursor.
         * Orbs have a "life" cycle, random velocities, and repulsive interaction logic.
         */
        class Orb {
            x: number = 0
            y: number = 0
            vx: number = 0
            vy: number = 0
            radius: number = 0
            life: number = 0
            maxLife: number = 0
            colorType: 'primary' | 'secondary' // Store which color type to use

            constructor() {
                this.reset()
                this.y = Math.random() * height
                this.life = Math.random()
                this.colorType = Math.random() > 0.5 ? 'primary' : 'secondary'
            }

            /**
             * Resets the orb's properties to a random starting state.
             * Called when the orb dies or goes out of bounds.
             */
            reset() {
                this.x = Math.random() * width
                this.y = -20
                this.vx = (Math.random() - 0.5) * 0.5
                this.vy = 0.5 + Math.random() * 0.5
                this.radius = 1 + Math.random() * 2
                this.life = 0
                this.maxLife = 0.8 + Math.random() * 0.2
                this.colorType = Math.random() > 0.5 ? 'primary' : 'secondary'
            }

            /**
             * Updates the orb's position, physics (friction, repulsion), and lifecycle.
             */
            update() {
                this.x += this.vx
                this.y += this.vy
                this.life += 0.003

                const dx = mouse.x - this.x
                const dy = mouse.y - this.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                // Mouse interaction: push away if too close
                if (distance < mouse.radius * 1.2) {
                    const force = (1 - distance / (mouse.radius * 1.2)) * 0.3
                    const angle = Math.atan2(dy, dx)
                    this.vx += Math.cos(angle) * force
                    this.vy += Math.sin(angle) * force
                }

                // Friction
                this.vx *= 0.98
                this.vy *= 0.98

                if (this.y > height + 20 || this.life > this.maxLife) {
                    this.reset()
                }
            }

            draw(primary: number[], secondary: number[], foreground: number[]) {
                if (!ctx) return
                const opacity = Math.sin((this.life / this.maxLife) * Math.PI) * 0.3

                const color = this.colorType === 'primary' ? primary : secondary

                const gradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.radius * 4
                )
                gradient.addColorStop(
                    0,
                    `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
                )
                gradient.addColorStop(
                    1,
                    `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0)`
                )

                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius * 4, 0, Math.PI * 2)
                ctx.fillStyle = gradient
                ctx.fill()

                ctx.beginPath()
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(${foreground[0]}, ${foreground[1]}, ${foreground[2]}, ${opacity * 0.5})`
                ctx.fill()
            }
        }

        const waves: Wave[] = []
        for (let i = 0; i < 8; i++) {
            waves.push(new Wave(i))
        }

        const orbs: Orb[] = []
        for (let i = 0; i < 50; i++) {
            orbs.push(new Orb())
        }

        function drawScanlines(color: number[]) {
            if (!ctx) return
            for (let y = 0; y < height; y += 4) {
                const distanceFromMouse = Math.abs(y - mouse.y)
                let opacity = 0.02

                if (distanceFromMouse < mouse.radius) {
                    opacity += (1 - distanceFromMouse / mouse.radius) * 0.03
                }

                ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`
                ctx.fillRect(0, y, width, 1)
            }
        }

        function drawHexagon(x: number, y: number, size: number) {
            if (!ctx) return
            ctx.beginPath()
            for (let i = 0; i < 6; i++) {
                const angle = (Math.PI / 3) * i
                const hx = x + size * Math.cos(angle)
                const hy = y + size * Math.sin(angle)
                if (i === 0) {
                    ctx.moveTo(hx, hy)
                } else {
                    ctx.lineTo(hx, hy)
                }
            }
            ctx.closePath()
            ctx.stroke()
        }

        function drawHexPattern(color1: number[], color2: number[]) {
            if (!ctx) return
            const hexSize = 40
            const hexHeight = hexSize * Math.sqrt(3)

            for (let row = 0; row < height / hexHeight + 2; row++) {
                for (let col = 0; col < width / (hexSize * 1.5) + 2; col++) {
                    const x = col * hexSize * 1.5
                    const y = row * hexHeight + (col % 2) * (hexHeight / 2)

                    const dx = x - mouse.x
                    const dy = y - mouse.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < mouse.radius) {
                        const highlight = 1 - distance / mouse.radius
                        const color = highlight > 0.5 ? color2 : color1

                        ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${highlight * 0.08})`
                        ctx.lineWidth = 1 + highlight

                        drawHexagon(x, y, hexSize * 0.8)
                    }
                }
            }
        }

        function updateMouse() {
            mouse.x += (mouse.targetX - mouse.x) * 0.1
            mouse.y += (mouse.targetY - mouse.y) * 0.1
        }

        const animate = () => {
            if (!ctx || !canvas) return
            time += 0.1 * speed

            // Lerp colors
            const factor = 0.05
            const { current, target } = colorRefs.current

            current.background = lerpColor(current.background, target.background, factor)
            current.foreground = lerpColor(current.foreground, target.foreground, factor)
            current.primary = lerpColor(current.primary, target.primary, factor)
            current.secondary = lerpColor(current.secondary, target.secondary, factor)
            current.accent = lerpColor(current.accent, target.accent, factor)
            current.grid = lerpColor(current.grid, target.grid, factor)

            const [bgR, bgG, bgB] = current.background
            ctx.fillStyle = `rgb(${bgR}, ${bgG}, ${bgB})`
            ctx.fillRect(0, 0, width, height)

            updateMouse()
            drawScanlines(current.accent)
            drawHexPattern(current.accent, current.secondary)

            waves.forEach((wave, i) => {
                const color = i % 3 === 0 ? current.primary :
                    i % 3 === 1 ? current.secondary :
                        current.accent
                wave.draw(time, color)
            })

            orbs.forEach((orb) => {
                orb.update()
                orb.draw(current.primary, current.secondary, current.foreground)
            })

            animationFrameId = requestAnimationFrame(animate)
        }

        const handleResize = () => {
            width = canvas.width = window.innerWidth
            height = canvas.height = window.innerHeight
        }

        const handleMouseMove = (e: MouseEvent) => {
            mouse.targetX = e.clientX
            mouse.targetY = e.clientY
        }

        window.addEventListener("resize", handleResize)
        window.addEventListener("mousemove", handleMouseMove)

        animate()

        return () => {
            window.removeEventListener("resize", handleResize)
            window.removeEventListener("mousemove", handleMouseMove)
            cancelAnimationFrame(animationFrameId)
        }
    }, [speed, turbulence, resolvedTheme, currentTheme])

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none -z-10 bg-background"
            style={{ touchAction: "none" }}
        />
    )
}
