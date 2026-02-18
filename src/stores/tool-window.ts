import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Available tool types for tool windows.
 */
export type ToolType =
    | 'emoji'
    | 'calculator'
    | 'unit-converter'
    | 'password-gen'
    | 'uuid-gen'
    | 'lorem-ipsum'
    | 'stopwatch'
    | 'text-case'
    | 'aspect-ratio'

/**
 * Represents a single tool window state.
 */
interface ToolWindow {
    id: ToolType
    isOpen: boolean
    isPinned: boolean
    minimized: boolean
    position: { x: number; y: number }
    size: { width: number; height: number }
    lastPosition: { x: number; y: number } | null
    lastSize: { width: number; height: number } | null
    title: string
    icon: string | null
    zIndex: number
    aspectRatio?: number
    highlightTrigger?: number
}

/**
 * Zustand store for managing tool windows.
 */
interface ToolWindowStore {
    windows: Record<ToolType, ToolWindow>
    activeWindow: ToolType | null
    focusedWindow: ToolType | null
    nextZIndex: number
    incomingDockId: ToolType | null
    dockFlashId: ToolType | null
    dockFlashTs: number | null

    openWindow: (tool: ToolType) => void
    closeWindow: (tool: ToolType) => void
    togglePin: (tool: ToolType) => void
    bringToFront: (tool: ToolType) => void
    triggerHighlight: (tool: ToolType) => void
    updatePosition: (tool: ToolType, pos: { x: number; y: number }) => void
    updateSize: (tool: ToolType, size: { width: number; height: number }) => void
    minimizeTool: (tool: ToolType) => void
    restoreTool: (tool: ToolType) => void
    focusTool: (tool: ToolType) => void
    removeTool: (tool: ToolType) => void
    setIncomingDock: (tool: ToolType | null) => void
    triggerDockFlash: (tool: ToolType) => void
}

/**
 * Default window configurations for each tool type.
 */
const defaultWindows: Record<ToolType, ToolWindow> = {
    'emoji': {
        id: 'emoji',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 100, y: 100 },
        size: { width: 360, height: 420 },
        lastPosition: null,
        lastSize: null,
        title: 'Emoji Picker',
        icon: null,
        zIndex: 1,
        aspectRatio: 360 / 420,
    },
    'calculator': {
        id: 'calculator',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 150, y: 150 },
        size: { width: 360, height: 420 },
        lastPosition: null,
        lastSize: null,
        title: 'Calculator',
        icon: null,
        zIndex: 1,
        aspectRatio: 360 / 420,
    },
    'unit-converter': {
        id: 'unit-converter',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 200, y: 200 },
        size: { width: 760, height: 540 },
        lastPosition: null,
        lastSize: null,
        title: 'Unit Converter',
        icon: null,
        zIndex: 1,
    },
    'password-gen': {
        id: 'password-gen',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 300, y: 300 },
        size: { width: 840, height: 720 },
        lastPosition: null,
        lastSize: null,
        title: 'Password Generator',
        icon: null,
        zIndex: 1,
    },
    'uuid-gen': {
        id: 'uuid-gen',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 350, y: 350 },
        size: { width: 520, height: 320 },
        lastPosition: null,
        lastSize: null,
        title: 'UUID Generator',
        icon: null,
        zIndex: 1,
    },
    'lorem-ipsum': {
        id: 'lorem-ipsum',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 400, y: 400 },
        size: { width: 720, height: 420 },
        lastPosition: null,
        lastSize: null,
        title: 'Lorem Ipsum',
        icon: null,
        zIndex: 1,
    },
    'stopwatch': {
        id: 'stopwatch',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 450, y: 450 },
        size: { width: 420, height: 300 },
        lastPosition: null,
        lastSize: null,
        title: 'Stopwatch',
        icon: null,
        zIndex: 1,
    },
    'text-case': {
        id: 'text-case',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 500, y: 500 },
        size: { width: 640, height: 360 },
        lastPosition: null,
        lastSize: null,
        title: 'Text Case',
        icon: null,
        zIndex: 1,
    },
    'aspect-ratio': {
        id: 'aspect-ratio',
        isOpen: false,
        isPinned: false,
        minimized: false,
        position: { x: 550, y: 550 },
        size: { width: 520, height: 360 },
        lastPosition: null,
        lastSize: null,
        title: 'Aspect Ratio',
        icon: null,
        zIndex: 1,
    },
}

/**
 * Zustand store for managing tool windows with persistence.
 */
export const useToolWindowStore = create<ToolWindowStore>()(
    persist(
        (set) => ({
            windows: defaultWindows,
            activeWindow: null,
            focusedWindow: null,
            nextZIndex: 100,
            incomingDockId: null,
            dockFlashId: null,
            dockFlashTs: null,

            /**
             * Opens a tool window.
             */
            openWindow: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]

                // If already minimized, restore from dock with focus and flash
                if (current.minimized) {
                    const restoredPosition = current.lastPosition ?? current.position
                    const restoredSize = current.lastSize ?? current.size
                    const nextWindow = {
                        ...current,
                        minimized: false,
                        isOpen: true,
                        position: restoredPosition,
                        size: restoredSize,
                        zIndex: state.nextZIndex,
                        highlightTrigger: Date.now(),
                    }
                    return {
                        windows: {
                            ...state.windows,
                            [tool]: nextWindow,
                        },
                        activeWindow: tool,
                        focusedWindow: tool,
                        nextZIndex: state.nextZIndex + 1,
                        incomingDockId: null,
                        dockFlashId: tool,
                        dockFlashTs: Date.now(),
                    }
                }

                const nextWindows = {
                    ...state.windows,
                    [tool]: {
                        ...current,
                        isOpen: true,
                        // Reset to default dimensions to avoid stale oversized persisted sizes
                        size: defaultWindows[tool].size,
                        lastSize: null,
                        zIndex: state.nextZIndex,
                        highlightTrigger: Date.now(),
                    },
                }
                return {
                    windows: nextWindows,
                    activeWindow: tool,
                    focusedWindow: tool,
                    nextZIndex: state.nextZIndex + 1,
                }
            }),

            /**
             * Marks which tool is on its way to the dock (for anticipation placeholder).
             */
            setIncomingDock: (tool) => set(() => ({ incomingDockId: tool })),

            /**
             * Triggers a flash highlight on dock item.
             */
            triggerDockFlash: (tool) => set(() => ({ dockFlashId: tool, dockFlashTs: Date.now() })),

            /**
             * Closes a tool window.
             */
            closeWindow: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: { ...current, isOpen: false },
                    },
                    focusedWindow: state.focusedWindow === tool ? null : state.focusedWindow,
                }
            }),

            /**
             * Toggles the pin state of a tool window.
             */
            togglePin: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: { ...current, isPinned: !current.isPinned }
                    },
                    focusedWindow: tool
                }
            }),

            /**
             * Brings a tool window to the front.
             */
            bringToFront: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            zIndex: state.nextZIndex,
                        }
                    },
                    activeWindow: tool,
                    focusedWindow: tool,
                    nextZIndex: state.nextZIndex + 1,
                }
            }),

            /**
             * Triggers a highlight animation on a tool window.
             */
            triggerHighlight: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            highlightTrigger: Date.now(),
                        }
                    },
                    focusedWindow: tool,
                }
            }),

            /**
             * Updates the position of a tool window.
             */
            updatePosition: (tool, pos) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            position: pos,
                        }
                    },
                    focusedWindow: tool
                }
            }),

            /**
             * Updates the size of a tool window.
             */
            updateSize: (tool, size) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                const minWidth = 200
                const minHeight = 150
                const nextSize = {
                    width: Math.max(minWidth, size.width),
                    height: Math.max(minHeight, size.height),
                }
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            size: nextSize,
                        }
                    },
                    focusedWindow: tool
                }
            }),

            /**
             * Minimizes a tool window to the dock.
             */
            minimizeTool: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                if (!current.isOpen || current.minimized) return state

                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            minimized: true,
                            lastPosition: current.position,
                            lastSize: current.size,
                        },
                    },
                    focusedWindow: state.focusedWindow === tool ? null : state.focusedWindow,
                }
            }),

            /**
             * Restores a minimized tool window from the dock.
             */
            restoreTool: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                if (!current.minimized) return state

                const restoredPosition = current.lastPosition ?? current.position
                const restoredSize = current.lastSize ?? current.size

                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            minimized: false,
                            position: restoredPosition,
                            size: restoredSize,
                            zIndex: state.nextZIndex,
                        },
                    },
                    activeWindow: tool,
                    focusedWindow: tool,
                    nextZIndex: state.nextZIndex + 1,
                }
            }),

            /**
             * Focuses a tool window (brings to front and sets as active).
             */
            focusTool: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            zIndex: state.nextZIndex,
                        }
                    },
                    activeWindow: tool,
                    focusedWindow: tool,
                    nextZIndex: state.nextZIndex + 1,
                }
            }),

            /**
             * Removes a tool window (closes and clears state).
             */
            removeTool: (tool) => set((state) => {
                const current = state.windows[tool] ?? defaultWindows[tool]
                return {
                    windows: {
                        ...state.windows,
                        [tool]: {
                            ...current,
                            isOpen: false,
                            minimized: false,
                            lastPosition: null,
                            lastSize: null,
                        },
                    },
                    focusedWindow: state.focusedWindow === tool ? null : state.focusedWindow,
                }
            }),
        }),
        {
            name: "tool-window-storage",
            partialize: (state) => ({
                windows: state.windows,
                activeWindow: state.activeWindow,
                nextZIndex: state.nextZIndex
            })
        }
    )
)
