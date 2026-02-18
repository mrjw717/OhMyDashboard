import { create } from 'zustand'
import { ReactNode } from 'react'

/**
 * Zustand store state for secondary sidebar management.
 */
interface SecondarySidebarState {
    component: ReactNode | null
    title: string | null
    setComponent: (component: ReactNode, title?: string) => void
    clearComponent: () => void
}

/**
 * Zustand store for managing secondary sidebar content.
 */
export const useSecondarySidebarStore = create<SecondarySidebarState>((set) => ({
    component: null,
    title: null,
    /**
     * Sets the component and optional title for the secondary sidebar.
     */
    setComponent: (component, title) => set({ component, title: title || null }),
    /**
     * Clears the secondary sidebar component and title.
     */
    clearComponent: () => set({ component: null, title: null }),
}))
