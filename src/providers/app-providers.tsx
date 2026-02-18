'use client'

import type { ReactNode } from 'react'
import { QueryProvider } from './query-provider'
import { ThemeHydrator } from '@/app/theme-hydrator'

interface AppProvidersProps {
    children: ReactNode
    initialColorScheme: string
}

export function AppProviders({ children, initialColorScheme }: AppProvidersProps) {
    return (
        <QueryProvider>
            <ThemeHydrator initialColorScheme={initialColorScheme}>
                {children}
            </ThemeHydrator>
        </QueryProvider>
    )
}
