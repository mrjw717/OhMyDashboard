import { QueryClient } from '@tanstack/react-query'

export function createQueryClient() {
    return new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 1000 * 60 * 5, // 5 minutes
                retry: 2,
                refetchOnWindowFocus: false,
            },
        },
    })
}

// Singleton for client-side use
let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
    if (typeof window === 'undefined') {
        // Server: always create a new QueryClient
        return createQueryClient()
    }
    // Browser: reuse singleton
    if (!browserQueryClient) {
        browserQueryClient = createQueryClient()
    }
    return browserQueryClient
}
