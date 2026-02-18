"use client"

import React from "react"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"

/**
 * @fileoverview Liquid Glass Component - Apple-style Glass Effect
 * 
 * PURPOSE: Provides Apple's Liquid Glass effect with displacement,
 * blur, saturation, and chromatic aberration.
 * 
 * WRAPPER: This wraps the `liquid-glass-react` package with project defaults.
 * 
 * SSR NOTE: This component uses next/dynamic with ssr: false because
 * the liquid-glass-react package uses `navigator` at module evaluation time.
 * 
 * PROPS PASSED THROUGH:
 * - displacementScale: Intensity of the liquid distortion (default: 0.08)
 * - blurAmount: Background blur intensity (default: 0.1)
 * - saturation: Color saturation boost (default: 1.3)
 * - aberrationIntensity: Chromatic aberration strength (default: 0.01)
 * - elasticity: How "bouncy" the effect feels (default: 0.2)
 * - cornerRadius: Rounded corners (default: 0)
 * - mode: "standard" | "polar" | "prominent" | "shader"
 */
interface LiquidGlassProps {
    children?: React.ReactNode
    className?: string
    displacementScale?: number
    blurAmount?: number
    saturation?: number
    aberrationIntensity?: number
    elasticity?: number
    cornerRadius?: number
    mode?: "standard" | "polar" | "prominent" | "shader"
    overLight?: boolean
    style?: React.CSSProperties
}

const LiquidGlassReact = dynamic(
    () => import("liquid-glass-react").then((mod) => mod.default),
    { 
        ssr: false,
        loading: () => null
    }
)

export function LiquidGlass({
    children,
    className,
    displacementScale = 0.08,
    blurAmount = 0.1,
    saturation = 1.3,
    aberrationIntensity = 0.01,
    elasticity = 0.2,
    cornerRadius = 0,
    mode = "standard",
    overLight = false,
    style,
}: LiquidGlassProps) {
    return (
        <LiquidGlassReact
            displacementScale={displacementScale}
            blurAmount={blurAmount}
            saturation={saturation}
            aberrationIntensity={aberrationIntensity}
            elasticity={elasticity}
            cornerRadius={cornerRadius}
            mode={mode}
            overLight={overLight}
            className={cn("pointer-events-none", className)}
            style={style}
            onClick={undefined}
        >
            {children}
        </LiquidGlassReact>
    )
}
