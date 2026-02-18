"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface NetworkNode {
    id: string
    x: number
    y: number
    status: 'active' | 'warning' | 'inactive'
}

interface NetworkConnection {
    from: string
    to: string
}

const nodes: NetworkNode[] = [
    { id: 'SRV-01', x: 50, y: 22, status: 'active' },
    { id: 'SRV-02', x: 25, y: 55, status: 'active' },
    { id: 'SRV-03', x: 75, y: 50, status: 'warning' },
    { id: 'GW-01', x: 50, y: 82, status: 'active' },
]

const connections: NetworkConnection[] = [
    { from: 'SRV-01', to: 'SRV-02' },
    { from: 'SRV-01', to: 'SRV-03' },
    { from: 'SRV-02', to: 'GW-01' },
    { from: 'SRV-03', to: 'GW-01' },
]

export function NetworkView() {
    const getNodeById = (id: string) => nodes.find(n => n.id === id)
    
    return (
        <div className="relative h-full w-full p-3">
            <svg 
                className="absolute inset-0 w-full h-full" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet"
            >
                {connections.map((conn, i) => {
                    const from = getNodeById(conn.from)
                    const to = getNodeById(conn.to)
                    if (!from || !to) return null
                    return (
                        <line
                            key={i}
                            x1={from.x} 
                            y1={from.y}
                            x2={to.x} 
                            y2={to.y}
                            stroke="hsl(var(--fx-tech-line))"
                            strokeWidth="0.5"
                            strokeDasharray="2,1"
                            opacity="0.6"
                        />
                    )
                })}
            </svg>
            
            {nodes.map((node) => (
                <div
                    key={node.id}
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
                    style={{ left: `${node.x}%`, top: `${node.y}%` }}
                >
                    <div 
                        className={cn(
                            "w-4 h-4 rounded-full border-2 border-[hsl(var(--fx-tech-border))]",
                            "shadow-[0_0_10px_hsl(var(--fx-tech-glow)/0.5)]",
                            node.status === 'active' && "bg-[hsl(var(--color-success))]",
                            node.status === 'warning' && "bg-[hsl(var(--color-warning))] animate-pulse",
                            node.status === 'inactive' && "bg-[hsl(var(--text-muted))]"
                        )}
                    />
                    <span className="text-[9px] font-mono font-bold text-[hsl(var(--text-muted))]">
                        {node.id}
                    </span>
                </div>
            ))}
        </div>
    )
}
