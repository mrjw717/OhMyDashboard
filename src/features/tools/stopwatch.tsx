"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { IconPlayerPlay, IconPlayerPause, IconRefresh, IconFlag } from "@tabler/icons-react"

/**
 * Stopwatch tool component.
 * Provides a simple stopwatch with start/stop, lap, and reset functionality.
 * 
 * Features:
 * - Start/stop/pause timer
 * - Lap time recording
 * - Reset functionality
 * - Large, readable time display
 * 
 * @component
 */
export const StopwatchTool = () => {
    const [time, setTime] = React.useState(0)
    const [running, setRunning] = React.useState(false)
    const [laps, setLaps] = React.useState<number[]>([])

    /**
     * Timer interval effect.
     * Updates time every 10ms when running.
     * Uses startTime to account for pauses.
     */
    React.useEffect(() => {
        let interval: NodeJS.Timeout
        let startTime = Date.now() - time

        if (running) {
            interval = setInterval(() => {
                setTime(Date.now() - startTime)
            }, 10)
        }
        return () => clearInterval(interval)
    }, [running])

    /**
     * Formats milliseconds into a readable time display.
     * Shows minutes:seconds.milliseconds.
     */
    const formatTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const milliseconds = Math.floor((ms % 1000) / 10)
        return (
            <div className="flex items-baseline gap-1 font-mono tabular-nums leading-none">
                <span className="text-6xl font-light text-foreground">{minutes.toString().padStart(2, '0')}</span>
                <span className="text-2xl text-muted-foreground">:</span>
                <span className="text-6xl font-light text-foreground">{seconds.toString().padStart(2, '0')}</span>
                <span className="text-2xl text-muted-foreground">.</span>
                <span className="text-4xl text-primary font-medium">{milliseconds.toString().padStart(2, '0')}</span>
            </div>
        )
    }

    /**
     * Formats milliseconds into a lap time string.
     * Returns format: MM:SS.ms
     */
    const formatLapTime = (ms: number) => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        const milliseconds = Math.floor((ms % 1000) / 10)
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    }

    /**
     * Records current time as a lap.
     * Adds lap to beginning of laps array for reverse chronological order.
     */
    const lap = () => {
        setLaps(prev => [time, ...prev])
    }

    return (
        <div className="p-8 flex flex-col items-center gap-8 h-full bg-background/50">
            <div className="flex-1 flex items-center justify-center">
                {formatTime(time)}
            </div>

            <div className="flex gap-4 w-full max-w-sm">
                <button
                    onClick={() => setRunning(!running)}
                    className={cn(
                        "h-14 flex-1 rounded-xl font-medium text-lg transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg",
                        running ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 shadow-red-500/10" : "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20"
                    )}
                >
                    {running ? <><IconPlayerPause size={20} /> Stop</> : <><IconPlayerPlay size={20} /> Start</>}
                </button>
                {running ? (
                    <button
                        onClick={lap}
                        className="h-14 w-32 rounded-xl bg-secondary text-secondary-foreground font-medium text-lg hover:bg-secondary/80 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <IconFlag size={20} /> Lap
                    </button>
                ) : (
                    <button
                        onClick={() => { setRunning(false); setTime(0); setLaps([]) }}
                        className="h-14 w-32 rounded-xl bg-secondary text-secondary-foreground font-medium text-lg hover:bg-secondary/80 transition-all active:scale-95 flex items-center justify-center gap-2"
                    >
                        <IconRefresh size={20} /> Reset
                    </button>
                )}
            </div>

            {laps.length > 0 && (
                <div className="w-full max-w-sm h-32 overflow-y-auto border-t border-white/5 pt-2">
                    {laps.map((lapTime, i) => (
                        <div key={i} className="flex justify-between items-center py-2 px-3 border-b border-white/5 last:border-0 text-sm font-mono hover:bg-white/5 rounded">
                            <span className="text-muted-foreground">Lap {laps.length - i}</span>
                            <span>{formatLapTime(lapTime)}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
