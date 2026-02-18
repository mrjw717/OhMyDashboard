"use client"

import * as React from "react"
import { IconCheck, IconCopy, IconRefresh } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/**
 * UUID generator tool component.
 * Generates random UUIDs using crypto.randomUUID().
 * 
 * Features:
 * - Cryptographically secure UUID generation
 * - One-click copy to clipboard
 * - History of last 5 generated UUIDs
 * - Visual feedback for copy status
 * 
 * @component
 */
export const UUIDGeneratorTool = () => {
    const [uuid, setUuid] = React.useState("")
    const [copied, setCopied] = React.useState(false)
    const [history, setHistory] = React.useState<string[]>([])

    /**
     * Generates a new random UUID using crypto.randomUUID().
     * Updates current UUID and maintains history of last 5 UUIDs.
     */
    const generate = () => {
        const newUuid = crypto.randomUUID()
        setUuid(newUuid)
        setHistory(prev => [newUuid, ...prev].slice(0, 5))
        setCopied(false)
    }

    // Generate initial UUID on mount
    React.useEffect(() => generate(), [])

    /**
     * Copies text to clipboard and shows confirmation for current UUID.
     * 
     * @param text - Text to copy
     */
    const copy = (text: string) => {
        navigator.clipboard.writeText(text)
        if (text === uuid) {
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    return (
        <div className="p-8 flex flex-col items-center gap-8 h-full bg-background/50">
            <div className="w-full space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider ml-1">Current UUID</label>
                <div className="relative group">
                    <div
                        onClick={() => copy(uuid)}
                        className="w-full bg-primary/5 rounded-xl p-6 text-center text-xl md:text-2xl font-mono break-all select-all outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer hover:bg-primary/10 transition-all border border-white/5 shadow-sm"
                    >
                        {uuid}
                    </div>
                </div>
            </div>

            <div className="flex gap-3 w-full max-w-sm">
                <button
                    onClick={generate}
                    className="h-12 flex-1 rounded-xl bg-primary/10 text-primary font-medium hover:bg-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                    <IconRefresh size={18} /> Generate
                </button>
                <button
                    onClick={() => copy(uuid)}
                    className={cn(
                        "h-12 flex-1 rounded-xl font-medium active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg",
                        copied ? "bg-green-500 text-white shadow-green-500/20" : "bg-primary text-primary-foreground hover:opacity-90 shadow-primary/20"
                    )}
                >
                    {copied ? <IconCheck size={18} /> : <IconCopy size={18} />}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>

            {history.length > 1 && (
                <div className="w-full max-w-sm space-y-2 pt-4 border-t border-white/5">
                    <label className="text-xs font-medium text-muted-foreground">Recent</label>
                    <div className="space-y-1">
                        {history.slice(1).map((h, i) => (
                            <div
                                key={i}
                                onClick={() => copy(h)}
                                className="text-xs font-mono text-muted-foreground hover:text-primary hover:bg-primary/5 p-2 rounded cursor-pointer transition-colors truncate flex items-center justify-between group"
                            >
                                {h}
                                <IconCopy size={12} className="opacity-0 group-hover:opacity-100" />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
