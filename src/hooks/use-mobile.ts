import * as React from "react"

/** Mobile breakpoint width in pixels */
const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to detect if the current viewport is mobile-sized.
 * Returns true if the viewport width is less than 768px.
 * 
 * Useful for:
 * - Responsive UI adjustments
 * - Conditional rendering based on device type
 * - Mobile-specific feature toggles
 * 
 * @returns Boolean indicating if viewport is mobile-sized
 * 
 * @example
 * ```tsx
 * const isMobile = useIsMobile()
 * if (isMobile) {
 *   // Show mobile layout
 * }
 * ```
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
