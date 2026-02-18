"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const metrics = [
    { label: 'CPU', value: 73, colorKey: 'success' },
    { label: 'MEM', value: 58, colorKey: 'info' },
    { label: 'NET', value: 42, colorKey: 'warning' },
    { label: 'DSK', value: 89, colorKey: 'error' },
] as const

export function MetricsView() {
    return (
        <div className="flex flex-col gap-3 h-full w-full p-3">
            <div className="grid grid-cols-4 gap-2 shrink-0">
                {metrics.map((metric) => (
                    <div 
                        key={metric.label}
                        className={cn(
                            "flex flex-col gap-1 p-2 rounded-lg",
                            "border border-[hsl(var(--fx-tech-border)/0.3)]",
                            "bg-[hsl(var(--fx-tech-glow)/0.03)]"
                        )}
                    >
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono font-bold text-[hsl(var(--text-muted))]">
                                {metric.label}
                            </span>
                            <span className={cn(
                                "text-xs font-mono font-bold",
                                metric.colorKey === 'success' && "text-[hsl(var(--color-success))]",
                                metric.colorKey === 'info' && "text-[hsl(var(--color-info))]",
                                metric.colorKey === 'warning' && "text-[hsl(var(--color-warning))]",
                                metric.colorKey === 'error' && "text-[hsl(var(--color-error))]"
                            )}>
                                {metric.value}%
                            </span>
                        </div>
                        <div className="h-1.5 rounded-full bg-[hsl(var(--sidebar-border)/0.3)] overflow-hidden">
                            <div 
                                className={cn(
                                    "h-full rounded-full transition-all duration-1000",
                                    metric.colorKey === 'success' && "bg-[hsl(var(--color-success))]",
                                    metric.colorKey === 'info' && "bg-[hsl(var(--color-info))]",
                                    metric.colorKey === 'warning' && "bg-[hsl(var(--color-warning))]",
                                    metric.colorKey === 'error' && "bg-[hsl(var(--color-error))]"
                                )}
                                style={{ 
                                    width: `${metric.value}%`,
                                    boxShadow: `0 0 6px hsl(var(--color-${metric.colorKey}))`
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <div className={cn(
                "flex-1 min-h-0 relative rounded-lg overflow-hidden",
                "border border-[hsl(var(--fx-tech-border)/0.3)]",
                "bg-[hsl(var(--fx-tech-glow)/0.02)]"
            )}>
                <MetricGraph />
            </div>
        </div>
    )
}

function MetricGraph() {
    const canvasRef = React.useRef<HTMLCanvasElement>(null)
    const animationRef = React.useRef<number | null>(null)
    const dataRef = React.useRef<number[]>([])
    const isInitializedRef = React.useRef(false)
    
    React.useEffect(() => {
        if (!isInitializedRef.current) {
            dataRef.current = Array(50).fill(0).map(() => Math.random() * 60 + 20)
            isInitializedRef.current = true
        }
    }, [])
    
    React.useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !isInitializedRef.current) return
        const ctx = canvas.getContext('2d')
        if (!ctx) return
        
        const draw = () => {
            const rect = canvas.getBoundingClientRect()
            const width = rect.width
            const height = rect.height
            if (width === 0 || height === 0) return
            
            const dpr = window.devicePixelRatio || 1
            canvas.width = width * dpr
            canvas.height = height * dpr
            ctx.scale(dpr, dpr)
            
            ctx.clearRect(0, 0, width, height)
            
            dataRef.current.shift()
            dataRef.current.push(Math.random() * 60 + 20)
            
            ctx.beginPath()
            ctx.strokeStyle = 'hsl(var(--fx-tech-line))'
            ctx.lineWidth = 2
            ctx.shadowColor = 'hsl(var(--fx-tech-glow))'
            ctx.shadowBlur = 8
            
            const step = width / (dataRef.current.length - 1)
            dataRef.current.forEach((value, i) => {
                const x = i * step
                const y = height - (value / 100) * height
                if (i === 0) ctx.moveTo(x, y)
                else ctx.lineTo(x, y)
            })
            ctx.stroke()
            
            ctx.beginPath()
            ctx.lineTo(width, height)
            ctx.lineTo(0, height)
            ctx.closePath()
            const gradient = ctx.createLinearGradient(0, 0, 0, height)
            gradient.addColorStop(0, 'hsl(var(--fx-tech-glow) / 0.3)')
            gradient.addColorStop(1, 'hsl(var(--fx-tech-glow) / 0.0)')
            ctx.fillStyle = gradient
            ctx.fill()
            
            animationRef.current = requestAnimationFrame(draw)
        }
        
        draw()
        return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current) }
    }, [])
    
    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
}
