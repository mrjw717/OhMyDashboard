"use client"

import React from "react"

export function NoiseOverlay() {
    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
        .noise-overlay {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: -1;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
          opacity: 0.05;
          mix-blend-mode: overlay;
        }
        .dark .noise-overlay {
          opacity: 0.08; 
          mix-blend-mode: overlay;
        }
      `}} />
            <div className="noise-overlay" />
        </>
    )
}
