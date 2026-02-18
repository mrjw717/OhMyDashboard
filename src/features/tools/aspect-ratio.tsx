"use client"

import * as React from "react"

/**
 * Aspect ratio calculator tool component.
 * Calculates and displays aspect ratios from width/height dimensions.
 * 
 * Features:
 * - Real-time ratio calculation
 * - Visual preview of aspect ratio
 * - Preset buttons for common ratios (FHD, HD, Square, Story)
 * - GCD calculation for simplified ratios
 * 
 * @component
 */
export const AspectRatioTool = () => {
    const [width, setWidth] = React.useState(1920)
    const [height, setHeight] = React.useState(1080)

    /**
     * Calculates the greatest common divisor using Euclidean algorithm.
     * Used to simplify aspect ratios to their lowest terms.
     * 
     * @param a - First number
     * @param b - Second number
     * @returns GCD of a and b
     */
    const gcd = (a: number, b: number): number => {
        return b === 0 ? a : gcd(b, a % b)
    }

    const divisor = gcd(Math.round(width), Math.round(height))
    const ratioW = Math.round(width) / divisor
    const ratioH = Math.round(height) / divisor

    return (
        <div className="p-8 flex flex-col items-center gap-6 h-full bg-background/50 justify-center">
            <div className="flex items-center gap-4">
                <div className="text-center">
                    <div className="text-4xl font-mono text-primary font-bold">{ratioW}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Ratio W</div>
                </div>
                <div className="text-2xl text-muted-foreground/30 font-light">:</div>
                <div className="text-center">
                    <div className="text-4xl font-mono text-primary font-bold">{ratioH}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest mt-1">Ratio H</div>
                </div>
            </div>

            <div className="w-full max-w-[240px] aspect-video border border-white/10 rounded-xl bg-black/20 relative overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full relative flex items-center justify-center">
                    <div
                        className="bg-primary/20 border border-primary/30 rounded shadow-[0_0_30px_-5px_rgba(var(--primary),0.3)] transition-all duration-300"
                        style={{
                            aspectRatio: `${width}/${height}`,
                            width: width >= height ? '100%' : 'auto',
                            height: height > width ? '100%' : 'auto',
                            maxHeight: '100%',
                            maxWidth: '100%'
                        }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-primary/70 font-mono">
                            {ratioW}:{ratioH}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex gap-4 w-full max-w-sm">
                <div className="flex-1 space-y-2 group">
                    <label className="text-xs font-medium text-muted-foreground ml-1 group-focus-within:text-primary transition-colors">Width (px)</label>
                    <input
                        type="number"
                        value={width || ''}
                        onChange={(e) => setWidth(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-primary/5 rounded-xl px-4 py-2.5 text-center font-mono outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/10 transition-all shadow-inner"
                    />
                </div>
                <div className="flex-1 space-y-2 group">
                    <label className="text-xs font-medium text-muted-foreground ml-1 group-focus-within:text-primary transition-colors">Height (px)</label>
                    <input
                        type="number"
                        value={height || ''}
                        onChange={(e) => setHeight(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-full bg-primary/5 rounded-xl px-4 py-2.5 text-center font-mono outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/10 transition-all shadow-inner"
                    />
                </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center w-full max-w-sm">
                {[
                    { w: 1920, h: 1080, l: 'FHD' },
                    { w: 1280, h: 720, l: 'HD' },
                    { w: 1080, h: 1080, l: 'Sq' },
                    { w: 1080, h: 1920, l: 'Story' }
                ].map(p => (
                    <button
                        key={p.l}
                        onClick={() => { setWidth(p.w); setHeight(p.h) }}
                        className="px-3 py-1.5 rounded-lg bg-white/5 text-[10px] font-medium hover:bg-primary/10 hover:text-primary transition-colors border border-white/5"
                    >
                        {p.l}
                    </button>
                ))}
            </div>
        </div>
    )
}
