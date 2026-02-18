import * as React from 'react'

/**
 * Custom hook for listening to CSS media queries.
 * Returns whether the media query currently matches.
 * 
 * Useful for:
 * - Responsive design breakpoints
 * - Dark mode detection
 * - Device-specific styling
 * - Adaptive UI based on screen size
 * 
 * @param query - CSS media query string (e.g., '(max-width: 768px)')
 * @returns Boolean indicating if the media query matches
 * 
 * @example
 * ```tsx
 * const isMobile = useMediaQuery('(max-width: 768px)')
 * const isDark = useMediaQuery('(prefers-color-scheme: dark)')
 * ```
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = React.useState(false)

  React.useEffect(() => {
    const media = window.matchMedia(query)
    
    // Initial check to avoid stale state
    if (media.matches !== matches) {
      setMatches(media.matches)
    }
    
    /**
     * Media query change listener.
     * Updates matches state when query result changes.
     */
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }
    
    media.addEventListener('change', listener)
    
    return () => {
      media.removeEventListener('change', listener)
    }
  }, [matches, query])

  return matches
}
