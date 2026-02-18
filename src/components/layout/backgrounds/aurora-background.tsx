"use client"

import React from "react"

import { useBackgroundStore } from "@/stores/background-store"

/**
 * AuroraBackground Component
 * 
 * Renders a pure CSS-based animated gradient background simulating the Aurora Borealis.
 * Features:
 * - High-performance CSS keyframe animations.
 * - Reduced motion support.
 * - Theme-aware opacity modulation.
 * - Dynamic color stops utilizing CSS variables for gradient smoothing.
 * 
 * Controlled via the `aurora` settings in `BackgroundStore`.
 */
export function AuroraBackground() {
  const settings = useBackgroundStore((state) => state.settings.aurora)
  const { speed, intensity } = settings

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
        .aurora-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          background: 
            linear-gradient(125deg, 
              hsl(var(--gradient-bg-1)) 0%, 
              hsl(var(--gradient-bg-2)) 25%, 
              hsl(var(--gradient-bg-3)) 50%, 
              hsl(var(--gradient-bg-4)) 75%, 
              hsl(var(--gradient-bg-1)) 100%
            );
          background-size: 300% 300%;
          animation: aurora ${30 / speed}s ease-in-out infinite;
          opacity: ${0.15 * intensity};
          transition: background 1.5s ease-in-out, opacity 1s ease-in-out;
        }
        .dark .aurora-bg {
          opacity: ${0.06 * intensity};
        }
        @keyframes aurora {
          0% { background-position: 0% 100%; }
          25% { background-position: 100% 0%; }
          50% { background-position: 0% 0%; }
          75% { background-position: 100% 100%; }
          100% { background-position: 0% 100%; }
        }
        @media (prefers-reduced-motion: reduce) {
          .aurora-bg {
            animation: none;
            background-position: 50% 50%;
          }
        }
      `}} />
      <div className="aurora-bg" data-aurora-bg="true" />
    </>
  )
}
