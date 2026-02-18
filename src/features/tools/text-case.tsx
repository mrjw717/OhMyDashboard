"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { IconCopy, IconCheck, IconTrash } from "@tabler/icons-react"

/**
 * Text case transformation tool.
 * Provides various text case conversions including uppercase, lowercase,
 * title case, camelCase, PascalCase, snake_case, kebab-case, and sentence case.
 * 
 * Features:
 * - Multiple case transformations
 * - Copy to clipboard functionality
 * - Clear text option
 * - Real-time transformation
 * 
 * @component
 */
export const TextCaseTool = () => {
    const [text, setText] = React.useState("")
    const [copied, setCopied] = React.useState(false)

    /**
     * Transforms text to the specified case format.
     * 
     * Supported transformations:
     * - upper: UPPERCASE
     * - lower: lowercase
     * - title: Title Case (first letter of each word capitalized)
     * - camel: camelCase (first word lowercase, subsequent words capitalized)
     * - pascal: PascalCase (all words capitalized)
     * - snake: snake_case (words separated by underscores)
     * - kebab: kebab-case (words separated by hyphens)
     * - sentence: Sentence case (first letter of sentences capitalized)
     * 
     * @param type - Transformation type
     */
    const transform = (type: 'upper' | 'lower' | 'title' | 'camel' | 'snake' | 'kebab' | 'pascal' | 'sentence') => {
        let res = text
        if (!text) return

        const words = text.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g) || [text]

        switch (type) {
            case 'upper': res = text.toUpperCase(); break;
            case 'lower': res = text.toLowerCase(); break;
            case 'title': res = text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); break;
            case 'camel':
                res = words.map((word, index) => {
                    const low = word.toLowerCase()
                    return index === 0 ? low : low.charAt(0).toUpperCase() + low.slice(1)
                }).join('');
                break;
            case 'pascal':
                res = words.map(word => {
                    const low = word.toLowerCase()
                    return low.charAt(0).toUpperCase() + low.slice(1)
                }).join('');
                break;
            case 'snake': res = words.map(x => x.toLowerCase()).join('_'); break;
            case 'kebab': res = words.map(x => x.toLowerCase()).join('-'); break;
            case 'sentence':
                res = text.toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
                break;
        }
        setText(res)
    }

    /**
     * Copies current text to clipboard and shows confirmation.
     */
    const copy = () => {
        if (!text) return
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="p-4 h-full flex flex-col gap-4 bg-background/50">
            <div className="relative flex-1 group">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste text here to transform..."
                    className="w-full h-full bg-primary/5 rounded-xl p-4 resize-none outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-muted-foreground/50 border border-white/5 font-mono text-sm"
                />
                <div className="absolute bottom-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {text && (
                        <button onClick={() => setText("")} className="p-2 rounded-lg bg-background/80 text-muted-foreground hover:text-red-400 hover:bg-background shadow-sm border border-white/5 backdrop-blur-sm transition-colors">
                            <IconTrash size={16} />
                        </button>
                    )}
                    <button
                        onClick={copy}
                        disabled={!text}
                        className="p-2 rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-95"
                    >
                        {copied ? <IconCheck size={16} /> : <IconCopy size={16} />}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <TransformBtn label="UPPERCASE" onClick={() => transform('upper')} />
                <TransformBtn label="lowercase" onClick={() => transform('lower')} />
                <TransformBtn label="Title Case" onClick={() => transform('title')} />
                <TransformBtn label="Sentence case" onClick={() => transform('sentence')} />
                <TransformBtn label="camelCase" onClick={() => transform('camel')} />
                <TransformBtn label="PascalCase" onClick={() => transform('pascal')} />
                <TransformBtn label="snake_case" onClick={() => transform('snake')} />
                <TransformBtn label="kebab-case" onClick={() => transform('kebab')} />
            </div>
        </div>
    )
}

/**
 * Transform button component for text case transformations.
 * 
 * @param label - Button label text
 * @param onClick - Click handler
 * @returns Button component
 */
const TransformBtn = ({ label, onClick }: { label: string, onClick: () => void }) => (
    <button
        onClick={onClick}
        className="px-3 py-2.5 rounded-lg bg-white/5 text-xs font-medium hover:bg-white/10 hover:text-primary transition-colors border border-white/5 hover:border-primary/20 text-muted-foreground"
    >
        {label}
    </button>
)
