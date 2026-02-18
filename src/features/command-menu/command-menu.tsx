"use client"

import * as React from "react"
import {
    IconCalendar,
    IconMoodSmile,
    IconCommand,
    IconSearch,
    IconCalculator,
    IconRuler,
    IconLock,
    IconClock,
    IconTypography,
    IconAspectRatio,
    IconHash,
    IconFileText,
} from "@tabler/icons-react"
import { Command } from "cmdk"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useToolWindowStore } from "@/stores"


/**
 * Main command menu component that provides a searchable interface for tools and navigation.
 * @[/documentcode]
 * 
 * Features:
 * - Keyboard shortcut (Cmd/Ctrl + K) to open/close
 * - Search functionality across tools
 * - Popout tools into floating windows
 * - Animated transitions with Framer Motion
 * 
 * Implementation detail:
 * - The floating window coordinates align with `/master-workflow` header rules,
 *   so the component expects to live inside a pointer-events-none overlay.
 * 
 * @component
 * @example
 * ```tsx
 * <CommandMenu />
 * ```
 */
export function CommandMenu() {
    const router = useRouter()
    const [open, setOpen] = React.useState(false)
    const [searchValue, setSearchValue] = React.useState("")
    const containerRef = React.useRef<HTMLDivElement>(null)
    const inputRef = React.useRef<HTMLInputElement>(null)

    const { openWindow, triggerHighlight } = useToolWindowStore()

    /**
     * Reset tool state when menu closes to ensure clean state on next open.
     * Clears active tool and search value.
     */
    React.useEffect(() => {
        // Whenever the surface closes, clear the input so next open starts fresh.
        if (!open) {
            setSearchValue("")
        }
    }, [open])

    /**
     * Keyboard event handler for command menu shortcuts.
     * 
     * Shortcuts:
     * - Cmd/Ctrl + K: Toggle menu open/close
     * - Escape: Close menu or return to tool list
     * 
     * @param e - Keyboard event
     */
    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                setOpen((open) => !open)
            }
            if (e.key === "Escape") {
                setOpen(false)
            }
        }

        /**
         * Close menu when clicking outside the container.
         * Provides a better UX than relying solely on Escape key.
         */
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false)
            }
        }

        document.addEventListener("keydown", down)
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("keydown", down)
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    /**
     * Auto-focus input field when menu opens.
     * Delay ensures DOM is ready and animation has started.
     */
    React.useEffect(() => {
        if (open) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 100)
        }
    }, [open])

    /**
     * Executes a command and closes the menu.
     * 
     * @param command - Function to execute before closing
     */
    const runCommand = React.useCallback((command: () => unknown) => {
        setOpen(false)
        command()
    }, [])

    return (
        <div className="pointer-events-none relative flex h-full w/full items-center justify-center">
            <motion.div
                ref={containerRef}
                layout
                initial={false}
                animate={{
                    width: open ? "min(600px, 90vw)" : "min(480px, 90vw)",
                    height: open ? "min(450px, 60vh)" : "40px",
                    borderRadius: open ? "16px" : "12px"
                }}
                transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                }}
                className={cn(
                    "absolute left-1/2 flex flex-col overflow-hidden bg-background/20 backdrop-blur-md border border-white/10 shadow-lg transition-colors pointer-events-auto",
                    !open
                        ? "hover:bg-background/40 hover:ring-2 hover:ring-primary/20 cursor-pointer items-center justify-center"
                        : "z-[2147483000] bg-background/95 shadow-xl ring-1 ring-white/10"
                )}
                style={{
                    ["--width-closed" as string]: "320px",
                    zIndex: 2147483000,
                    top: "calc(50% - 20px)",
                    transform: "translateX(-50%)"
                } as React.CSSProperties}
                onClick={(e) => {
                    if (!open) {
                        setOpen(true)
                        e.stopPropagation()
                    } else {
                        inputRef.current?.focus()
                    }
                }}
            >
                {!open && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex w-full items-center gap-3 px-4 h-full"
                    >
                        <IconSearch className="h-4 w-4 text-primary" />
                        <span className="hidden lg:inline-flex text-sm text-muted-foreground">Search tools...</span>
                        <span className="inline-flex lg:hidden text-sm text-muted-foreground">Search...</span>
                        <div className="ml-auto pointer-events-none flex h-5 select-none items-center gap-1.5 rounded bg-primary/5 px-2 font-mono text-[10px] font-medium text-primary opacity-80">
                            <span className="text-xs">⌘</span>K
                        </div>
                    </motion.div>
                )}

                {open && (
                    <Command
                        className="flex flex-col h-full w-full relative z-[2147483000]"
                        style={{ zIndex: 2147483000 }}
                        onValueChange={setSearchValue}
                    >
                        <div className="flex items-center px-4 py-2 border-b border-primary/5 relative z-20 hover:cursor-default" onClick={(e) => e.stopPropagation()}>
                            <IconSearch className="mr-3 h-5 w-5 shrink-0 text-primary opacity-60" />
                            <div className="flex-1 flex items-center justify-between gap-4 min-w-0">
                                <div className="flex items-center gap-3 min-w-0 flex-1 self-stretch">
                                    <Command.Input
                                        ref={inputRef}
                                        placeholder="Type a command or search..."
                                        autoFocus
                                        value={searchValue}
                                        onValueChange={setSearchValue}
                                        className="flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground/40 font-medium"
                                        onMouseDown={(e) => e.stopPropagation()}
                                    />
                                </div>
                                <div className="flex items-center gap-2 shrink-0 pr-1">
                                    <button
                                        onMouseDown={(e) => e.stopPropagation()}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setOpen(false)
                                        }}
                                        className="h-7 px-3 flex items-center justify-center gap-1 rounded-md bg-primary/10 text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-primary/20 transition-all shadow-sm active:scale-95"
                                    >
                                        ESC
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin p-3 sm:p-4">
                            <Command.List>
                                <Command.Empty className="py-12 text-center text-sm">
                                    <div className="flex flex-col items-center gap-2 opacity-50">
                                        <IconCommand className="h-8 w-8" />
                                        <p>No results found.</p>
                                    </div>
                                </Command.Empty>

                                <Command.Group heading="Navigation" className="px-2 py-2">
                                    <CommandItem
                                        onSelect={() => runCommand(() => router.push("/"))}
                                        icon={<IconCalendar />}
                                        label="Back to Overview"
                                    />
                                </Command.Group>

                                <div className="px-2 py-2">
                                    <div className="text-xs font-medium text-muted-foreground px-2 mb-2">Tools</div>
                                    <div className="grid grid-cols-6 gap-2">
                                        <ToolItem
                                            icon={<IconMoodSmile />}
                                            label="Emoji"
                                            onClick={() => {
                                                openWindow('emoji')
                                                triggerHighlight('emoji')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconCalculator />}
                                            label="Calc"
                                            onClick={() => {
                                                openWindow('calculator')
                                                triggerHighlight('calculator')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconRuler />}
                                            label="Units"
                                            onClick={() => {
                                                openWindow('unit-converter')
                                                triggerHighlight('unit-converter')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconLock />}
                                            label="Pass"
                                            onClick={() => {
                                                openWindow('password-gen')
                                                triggerHighlight('password-gen')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconHash />}
                                            label="UUID"
                                            onClick={() => {
                                                openWindow('uuid-gen')
                                                triggerHighlight('uuid-gen')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconFileText />}
                                            label="Lorem"
                                            onClick={() => {
                                                openWindow('lorem-ipsum')
                                                triggerHighlight('lorem-ipsum')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconClock />}
                                            label="Timer"
                                            onClick={() => {
                                                openWindow('stopwatch')
                                                triggerHighlight('stopwatch')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconTypography />}
                                            label="Case"
                                            onClick={() => {
                                                openWindow('text-case')
                                                triggerHighlight('text-case')
                                                setOpen(false)
                                            }}
                                        />
                                        <ToolItem
                                            icon={<IconAspectRatio />}
                                            label="Ratio"
                                            onClick={() => {
                                                openWindow('aspect-ratio')
                                                triggerHighlight('aspect-ratio')
                                                setOpen(false)
                                            }}
                                        />
                                    </div>
                                </div>
                            </Command.List>
                        </div>

                        <div className="flex items-center justify-between bg-primary/5 px-4 py-2 text-[10px] text-muted-foreground border-t border-primary/5">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-1"><kbd className="px-1 border rounded">ENTER</kbd> select</span>
                                <span className="flex items-center gap-1"><kbd className="px-1 border rounded">↑↓</kbd> navigate</span>
                            </div>
                            <span className="flex items-center gap-1 text-primary/60">
                                <IconCommand className="h-3 w-3" /> Powered by OMD!
                            </span>
                        </div>
                    </Command>
                )}
            </motion.div>
        </div>
    )
}

/**
 * Command item component for navigation menu items.
 * Displays an icon, label, and keyboard shortcut indicator.
 * 
 * @param icon - Icon element to display
 * @param label - Text label for the command
 * @param onSelect - Callback when item is selected
 * @returns Command item component
 */
function CommandItem({ icon, label, onSelect }: { icon: React.ReactNode, label: string, onSelect: () => void }) {
    return (
        <Command.Item
            onSelect={onSelect}
            className="group flex cursor-pointer select-none items-center rounded-lg px-3 py-2.5 text-sm outline-none transition-all aria-selected:bg-primary/10 aria-selected:text-primary hover:bg-primary/5"
        >
            <div className="mr-3 flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary transition-transform group-aria-selected:scale-110">
                {icon}
            </div>
            <span className="flex-1 font-medium">{label}</span>
            <div className="opacity-0 transition-opacity group-aria-selected:opacity-100">
                <kbd className="rounded border-primary/20 bg-primary/5 px-1.5 text-[10px]">⏎</kbd>
            </div>
        </Command.Item>
    )
}

/**
 * Tool item component for the tools grid.
 * Displays an icon, label, and optional popout button.
 * 
 * Features:
 * - Hover effects with scale and color transitions
 * - Popout button visible on hover or selection
 * - Keyboard navigation support
 * 
 * @param icon - Icon element to display
 * @param label - Text label for the tool
 * @param onClick - Callback when item is clicked (opens tool in menu)
 * @returns Tool item component
 */
function ToolItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <Command.Item
            onSelect={onClick}
            className="group relative flex flex-col items-center justify-center aspect-square rounded-xl bg-primary/5 hover:bg-primary/10 cursor-pointer transition-all outline-none aria-selected:bg-primary/20 aria-selected:ring-2 aria-selected:ring-primary/20 overflow-hidden"
        >
            <div className="text-primary/70 group-hover:text-primary group-aria-selected:text-primary transition-colors mb-1 pointer-events-none">
                {React.cloneElement(icon as React.ReactElement<{ size?: number, stroke?: number }>, { size: 24, stroke: 1.5 })}
            </div>
            <span className="text-[10px] font-medium text-muted-foreground group-hover:text-foreground group-aria-selected:text-foreground transition-colors px-1 text-center truncate w-full pointer-events-none">
                {label}
            </span>
        </Command.Item>
    )
}
