"use client"

import * as React from "react"
import { IconCheck, IconCopy } from "@tabler/icons-react"
import { cn } from "@/lib/utils"

/**
 * Lorem Ipsum generator tool component.
 * Generates placeholder text for design and testing purposes.
 * 
 * Features:
 * - Generate paragraphs or sentences
 * - Adjustable count (1-50)
 * - One-click copy to clipboard
 * * Visual feedback for copy status
 * 
 * @component
 */
export const LoremIpsumTool = () => {
    const [count, setCount] = React.useState(1)
    const [type, setType] = React.useState<'paragraphs' | 'sentences'>('paragraphs')
    const [result, setResult] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    /**
     * Generates Lorem Ipsum text based on current settings.
     * Creates paragraphs or sentences depending on selected type.
     */
    const generate = React.useCallback(() => {
        const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        const sentences = text.split('. ')

        let output = ""
        if (type === 'paragraphs') {
            output = Array(count).fill(text).join('\n\n')
        } else {
            // Randomize sentences for variety if we have enough source material, otherwise just repeat cyclic
            output = Array(count).fill(null).map((_, i) => sentences[i % sentences.length]).join('. ') + '.'
        }
        setResult(output)
        setCopied(false)
    }, [count, type])

    // Generate text on mount and when settings change
    React.useEffect(() => generate(), [generate])

    /**
     * Copies generated text to clipboard and shows confirmation.
     */
    const copy = () => {
        navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="flex flex-col h-full overflow-hidden bg-background/50">
            <div className="flex items-center gap-4 p-4 border-b border-primary/5 bg-white/5">
                <div className="flex items-center gap-1 bg-black/20 rounded-lg p-1 border border-white/5">
                    <button onClick={() => setType('paragraphs')} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", type === 'paragraphs' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5")}>Paragraphs</button>
                    <button onClick={() => setType('sentences')} className={cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all", type === 'sentences' ? "bg-primary/20 text-primary shadow-sm" : "text-muted-foreground hover:text-foreground hover:bg-white/5")}>Sentences</button>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden sm:inline">Count:</span>
                    <input
                        type="number"
                        min="1"
                        max="50"
                        value={count}
                        onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
                        className="w-14 bg-black/20 rounded-md px-2 py-1.5 text-center font-medium outline-none focus:ring-1 focus:ring-primary/50 text-sm border border-white/5"
                    />
                </div>

                <button
                    onClick={copy}
                    className={cn(
                        "ml-auto h-8 px-4 rounded-md text-xs font-medium transition-all flex items-center gap-1.5 shadow-sm active:scale-95",
                        copied ? "bg-green-500 text-white" : "bg-primary text-primary-foreground hover:opacity-90"
                    )}
                >
                    {copied ? <IconCheck size={14} /> : <IconCopy size={14} />} {copied ? "Copied" : "Copy"}
                </button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto">
                <div className="max-w-prose mx-auto font-serif text-muted-foreground leading-relaxed whitespace-pre-wrap text-base selection:bg-primary/20 selection:text-primary">
                    {result}
                </div>
            </div>
        </div>
    )
}
