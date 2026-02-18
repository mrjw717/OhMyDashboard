"use client"

import { useState } from "react"

/**
 * 12 Animated Background Variants
 * Each with unique animation style suitable for music/DAW apps
 */

const backgrounds = [
    {
        id: 1,
        name: "Subtle Gradient Flow",
        description: "Slow, elegant gradient shift - professional and calm",
        style: {
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.05) 50%, rgba(139, 92, 246, 0.08) 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 25s ease-in-out infinite',
        }
    },
    {
        id: 2,
        name: "Pulse Wave",
        description: "Radial pulse from center - rhythmic and energetic",
        style: {
            background: 'radial-gradient(circle at 50% 50%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
            backgroundSize: '200% 200%',
            animation: 'pulse 4s ease-in-out infinite',
        }
    },
    {
        id: 3,
        name: "Diagonal Sweep",
        description: "Fast diagonal movement - dynamic and modern",
        style: {
            background: 'linear-gradient(45deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.1) 25%, transparent 50%, rgba(139, 92, 246, 0.1) 75%, rgba(59, 130, 246, 0.1) 100%)',
            backgroundSize: '400% 400%',
            animation: 'diagonalSweep 15s linear infinite',
        }
    },
    {
        id: 4,
        name: "Mesh Gradient",
        description: "Multi-point gradient blend - complex and artistic",
        style: {
            background: `
        radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
        radial-gradient(at 100% 0%, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
        radial-gradient(at 100% 100%, rgba(139, 92, 246, 0.12) 0%, transparent 50%),
        radial-gradient(at 0% 100%, rgba(59, 130, 246, 0.12) 0%, transparent 50%)
      `,
            animation: 'meshRotate 30s ease-in-out infinite',
        }
    },
    {
        id: 5,
        name: "Frequency Bars",
        description: "Vertical bars like audio visualizer - music-themed",
        style: {
            background: 'repeating-linear-gradient(90deg, rgba(139, 92, 246, 0.05) 0px, rgba(139, 92, 246, 0.15) 10px, rgba(139, 92, 246, 0.05) 20px)',
            backgroundSize: '200% 100%',
            animation: 'frequencyBars 3s ease-in-out infinite',
        }
    },
    {
        id: 6,
        name: "Ambient Glow",
        description: "Soft glowing orbs - atmospheric and immersive",
        style: {
            background: `
        radial-gradient(circle at 20% 50%, rgba(139, 92, 246, 0.1) 0%, transparent 25%),
        radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 25%)
      `,
            animation: 'ambientGlow 20s ease-in-out infinite alternate',
        }
    },
    {
        id: 7,
        name: "Waveform",
        description: "Horizontal wave pattern - audio-inspired",
        style: {
            background: 'linear-gradient(0deg, transparent 48%, rgba(139, 92, 246, 0.1) 50%, transparent 52%)',
            backgroundSize: '100% 40px',
            animation: 'waveform 8s linear infinite',
        }
    },
    {
        id: 8,
        name: "Spotlight Scan",
        description: "Moving spotlight effect - dramatic and focused",
        style: {
            background: 'radial-gradient(ellipse at var(--x, 0%) 50%, rgba(139, 92, 246, 0.2) 0%, transparent 40%)',
            animation: 'spotlightScan 12s ease-in-out infinite',
        }
    },
    {
        id: 9,
        name: "Particle Field",
        description: "Subtle noise texture - technical and detailed",
        style: {
            background: 'repeating-linear-gradient(45deg, rgba(139, 92, 246, 0.02) 0px, rgba(139, 92, 246, 0.08) 1px, transparent 2px, transparent 4px)',
            backgroundSize: '200% 200%',
            animation: 'particleField 20s linear infinite',
        }
    },
    {
        id: 10,
        name: "Dual Tone Shift",
        description: "Two-color transition - bold and contrasting",
        style: {
            background: 'linear-gradient(90deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.12) 100%)',
            backgroundSize: '200% 100%',
            animation: 'dualToneShift 18s ease-in-out infinite alternate',
        }
    },
    {
        id: 11,
        name: "Circular Ripple",
        description: "Expanding circles - rhythmic and hypnotic",
        style: {
            background: `
        radial-gradient(circle, rgba(139, 92, 246, 0.1) 10%, transparent 10%, transparent 20%, rgba(139, 92, 246, 0.1) 20%, transparent 20%),
        radial-gradient(circle, transparent 10%, rgba(59, 130, 246, 0.08) 10%, transparent 20%)
      `,
            backgroundSize: '80px 80px',
            animation: 'circularRipple 10s linear infinite',
        }
    },
    {
        id: 12,
        name: "Aurora Borealis",
        description: "Northern lights effect - ethereal and flowing",
        style: {
            background: `
        linear-gradient(125deg, rgba(139, 92, 246, 0.15) 0%, transparent 40%),
        linear-gradient(225deg, rgba(59, 130, 246, 0.12) 0%, transparent 50%),
        linear-gradient(315deg, rgba(139, 92, 246, 0.1) 0%, transparent 60%)
      `,
            backgroundSize: '300% 300%',
            animation: 'aurora 35s ease-in-out infinite',
        }
    },
]

/**
 * Background test page component.
 * Displays a grid of animated background variants for testing and preview.
 */
export default function BackgroundTestPage() {
    const [selected, setSelected] = useState<number | null>(null)

    return (
        <>
            <style dangerouslySetInnerHTML={{
                __html: `
          @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
          @keyframes pulse {
            0%, 100% { background-size: 100% 100%; opacity: 0.8; }
            50% { background-size: 200% 200%; opacity: 1; }
          }
          @keyframes diagonalSweep {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes meshRotate {
            0%, 100% { transform: rotate(0deg) scale(1); }
            50% { transform: rotate(5deg) scale(1.1); }
          }
          @keyframes frequencyBars {
            0%, 100% { background-position: 0% 0%; }
            50% { background-position: 100% 0%; }
          }
          @keyframes ambientGlow {
            0% { background-position: 20% 50%, 80% 50%; }
            100% { background-position: 80% 50%, 20% 50%; }
          }
          @keyframes waveform {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 0%; }
          }
          @keyframes spotlightScan {
            0%, 100% { --x: 0%; }
            50% { --x: 100%; }
          }
          @keyframes particleField {
            0% { background-position: 0% 0%; }
            100% { background-position: 100% 100%; }
          }
          @keyframes dualToneShift {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          @keyframes circularRipple {
            0% { background-position: 0% 0%; }
            100% { background-position: 80px 80px; }
          }
          @keyframes aurora {
            0%, 100% { background-position: 0% 0%, 100% 100%, 50% 50%; }
            33% { background-position: 100% 50%, 0% 100%, 100% 0%; }
            66% { background-position: 50% 100%, 50% 0%, 0% 50%; }
          }
        `
            }} />

            <div className="min-h-screen p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-2">Animated Background Test Page</h1>
                    <p className="text-muted-foreground mb-8">
                        Click any variant to preview it fullscreen. Press ESC or click again to exit.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {backgrounds.map((bg) => (
                            <button
                                key={bg.id}
                                onClick={() => setSelected(selected === bg.id ? null : bg.id)}
                                className="relative h-48 rounded-lg border-2 border-border overflow-hidden transition-all hover:border-primary hover:scale-105"
                            >
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={bg.style}
                                />
                                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm p-4 flex flex-col justify-end">
                                    <h3 className="text-lg font-semibold mb-1">{bg.id}. {bg.name}</h3>
                                    <p className="text-sm text-muted-foreground">{bg.description}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Fullscreen Preview */}
            {selected !== null && (
                <div
                    className="fixed inset-0 z-50 cursor-pointer"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={backgrounds.find(b => b.id === selected)?.style}
                    />
                    <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-md px-6 py-3 rounded-full border border-border">
                        <p className="text-sm font-medium">
                            Previewing: {backgrounds.find(b => b.id === selected)?.name}
                        </p>
                        <p className="text-xs text-muted-foreground text-center">Click anywhere to exit</p>
                    </div>
                </div>
            )}
        </>
    )
}
