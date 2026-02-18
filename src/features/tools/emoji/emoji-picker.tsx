"use client"

import * as React from "react"
import { IconSearch } from "@tabler/icons-react"
import { EMOJI_DATA, EMOJI_CATEGORIES } from "./emoji-data"
import { EmojiCategory } from "./emoji-category"
import { Input } from "@/components/ui/input"

/**
 * Props for the EmojiPicker component.
 */
interface EmojiPickerProps {
    onSelect: (emoji: string) => void
    externalSearch?: string
    context?: 'menu' | 'window'
}

/**
 * Emoji picker component.
 * Provides searchable emoji selection with category grouping.
 * 
 * Features:
 * - Search by emoji name or keywords
 * - Category-based grouping
 * - External search sync (for Command Menu integration)
 * - Empty state handling
 * 
 * @param onSelect - Callback when emoji is selected
 * @param externalSearch - Optional external search query
 * @param context - Context for styling (menu or window)
 */
export function EmojiPicker({ onSelect, externalSearch, context }: EmojiPickerProps) {
    const [search, setSearch] = React.useState("")

    // Sync with external search if provided (e.g., from Command Menu)
    React.useEffect(() => {
        if (externalSearch !== undefined) {
            setSearch(externalSearch)
        }
    }, [externalSearch])

    /**
     * Filters emojis based on search query.
     * Searches emoji name and keywords.
     */
    const filteredEmojis = React.useMemo(() => {
        if (!search) return EMOJI_DATA

        const lowerSearch = search.toLowerCase()
        return EMOJI_DATA.filter(emoji =>
            emoji.name.toLowerCase().includes(lowerSearch) ||
            emoji.keywords.some(k => k.toLowerCase().includes(lowerSearch))
        )
    }, [search])

    /**
     * Groups filtered emojis by category.
     * Creates a mapping of category to emojis.
     */
    const groupedEmojis = React.useMemo(() => {
        const groups: Record<string, typeof EMOJI_DATA> = {}

        EMOJI_CATEGORIES.forEach(cat => {
            const inCat = filteredEmojis.filter(e => e.category === cat)
            if (inCat.length > 0) {
                groups[cat] = inCat
            }
        })
        return groups
    }, [filteredEmojis])

    return (
        <div className="flex flex-col h-full w-full bg-background/50">
            {context !== 'menu' && (
                <div className="p-2 border-b border-border/40">
                    <div className="relative">
                        <IconSearch className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search emojis..."
                            className="pl-8 h-9 bg-muted/30 border-transparent focus:bg-background transition-colors"
                            autoFocus
                        />
                    </div>
                </div>
            )}

            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin">
                {Object.entries(groupedEmojis).map(([category, emojis]) => (
                    <EmojiCategory
                        key={category}
                        category={category}
                        emojis={emojis}
                        onSelect={onSelect}
                    />
                ))}
                {filteredEmojis.length === 0 && (
                    <div className="flex flex-col items-center justify-center p-8 text-center text-muted-foreground">
                        <span className="text-2xl mb-2">😵</span>
                        <p className="text-sm">No emojis found</p>
                    </div>
                )}
            </div>
        </div>
    )
}
