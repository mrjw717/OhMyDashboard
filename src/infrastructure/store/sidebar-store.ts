import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface SidebarState {
    isOpen: boolean
    isCollapsed: boolean
    setOpen: (open: boolean) => void
    setCollapsed: (collapsed: boolean) => void
    toggle: () => void
}

export const useSidebarStore = create<SidebarState>()(
    persist(
        (set, get) => ({
            isOpen: true,
            isCollapsed: false,
            setOpen: (open) => set({ isOpen: open }),
            setCollapsed: (collapsed) => set({ isCollapsed: collapsed }),
            toggle: () => set({ isCollapsed: !get().isCollapsed }),
        }),
        {
            name: 'sidebar-storage',
        }
    )
)
