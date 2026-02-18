"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Emoji } from "./emoji-data"
import { cn } from "@/lib/utils"

/**
 * Props for the EmojiCategory component.
 */
interface EmojiCategoryProps {
    category: string
    emojis: Emoji[]
    onSelect: (emoji: string) => void
}

/**
 * Emoji category component.
 * Displays a category of emojis in a grid layout.
 * 
 * Features:
 * - Sticky category header
 * - Hover and tap animations
 * - Grid layout (7 columns)
 * 
 * @param category - Category name
 * @param emojis - Array of emojis to display
 * @param onSelect - Callback when emoji is selected
 */
export function EmojiCategory({ category, emojis, onSelect }: EmojiCategoryProps) {
    if (emojis.length === 0) return null

    return (
        <div className="mb-4">
            <h3 className="text-xs font-medium text-muted-foreground mb-2 px-2 sticky top-0 bg-background/95 backdrop-blur-sm py-1 z-10 w-full">
                {category}
            </h3>
            <div className="grid grid-cols-7 gap-1 px-1">
                {emojis.map((emoji) => (
                    <motion.button
                        key={emoji.name}
                        whileHover={{ scale: 1.2, zIndex: 20 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => onSelect(emoji.emoji)}
                        className={cn(
                            "aspect-square flex items-center justify-center text-xl rounded-md transition-colors",
                            "hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-1 focus:ring-primary/50"
                        )}
                        title={emoji.name}
                    >
                        {emoji.emoji}
                    </motion.button>
                ))}
            </div>
        </div>
    )
}
