import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ThemeState {
    colorScheme: string
    setColorScheme: (scheme: string) => void
}

export const useThemeStore = create<ThemeState>()(
    persist(
        (set) => ({
            colorScheme: 'neutral',
            setColorScheme: (scheme) => set({ colorScheme: scheme }),
        }),
        {
            name: 'theme-storage',
        }
    )
)
