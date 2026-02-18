"use client"

import React, { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useBackgroundStore } from "@/stores"
import { AuroraBackground } from "./aurora-background"
import { GeometricShapesBackground } from "./geometric-background"
import { FuturisticGridBackground } from "./futuristic-grid-background"
import { NeuralBackground } from "./neural-background"

/**
 * GlobalBackgroundManager Component
 * 
 * Orchestrates the rendering of background visualizations across the application.
 * Responsibilities:
 * - Monitors the `activeVariant` from the `BackgroundStore`.
 * - Handles smooth cross-fade transitions between different background types using Framer Motion.
 * - Manages mounting/unmounting of heavy canvas components.
 * - Prevents rendering on specific test routes.
 * 
 * This component acts as the single source of truth for which background is currently visible.
 */
export function GlobalBackgroundManager() {
    const pathname = usePathname()
    const activeVariant = useBackgroundStore((state) => state.activeVariant)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null
    if (pathname === '/bg-test') return null

    return (
        <AnimatePresence mode="popLayout">
            <motion.div
                key={activeVariant}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 -z-10"
            >
                {renderBackground()}
            </motion.div>
        </AnimatePresence>
    )

    function renderBackground() {
        switch (activeVariant) {
            case 'geometric':
                return <GeometricShapesBackground />
            case 'grid':
                return <FuturisticGridBackground />
            case 'neural':
                return <NeuralBackground />
            case 'aurora':
            default:
                return <AuroraBackground />
        }
    }
}
