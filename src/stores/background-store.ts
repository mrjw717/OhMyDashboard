import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Available background animation variants.
 */
export type BackgroundVariant = 'aurora' | 'geometric' | 'grid' | 'neural'

/**
 * Settings for each background variant.
 */
interface BackgroundSettings {
    aurora: { speed: number; intensity: number }
    geometric: { speed: number; count: number }
    grid: { repulsion: number; friction: number }
    neural: { speed: number; turbulence: number }
}

/**
 * Zustand store state for background management.
 */
interface BackgroundState {
    activeVariant: BackgroundVariant
    settings: BackgroundSettings
    setVariant: (variant: BackgroundVariant) => void
    updateSettings: <K extends BackgroundVariant>(
        variant: K,
        settings: Partial<BackgroundSettings[K]>
    ) => void
}

/**
 * Zustand store for managing animated backgrounds with persistence.
 */
export const useBackgroundStore = create<BackgroundState>()(
    persist(
        (set) => ({
            activeVariant: 'aurora',
            settings: {
                aurora: { speed: 1, intensity: 1 },
                geometric: { speed: 1, count: 20 },
                grid: { repulsion: 1, friction: 0.9 },
                neural: { speed: 1, turbulence: 1 },
            },
            /**
             * Sets the active background variant.
             */
            setVariant: (variant) => set({ activeVariant: variant }),
            /**
             * Updates settings for a specific background variant.
             */
            updateSettings: (variant, newSettings) =>
                set((state) => ({
                    settings: {
                        ...state.settings,
                        [variant]: { ...state.settings[variant], ...newSettings },
                    },
                })),
        }),
        {
            name: 'background-storage',
            version: 2,
        }
    )
)
