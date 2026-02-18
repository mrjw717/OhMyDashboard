"use client"

import { useSmoothScrollContext } from "@/providers/smooth-scroll-provider"

/**
 * Options for smooth scroll behavior.
 */
interface UseSmoothScrollOptions {
  offset?: number
}

/**
 * Custom hook for smooth scrolling functionality.
 * Provides access to the Lenis smooth scroll instance and scroll-to methods.
 * 
 * Features:
 * - Smooth scrolling to any target (number, element, or selector)
 * - Configurable offset for scroll position
 * - Integration with Lenis scroll library
 * 
 * @param options - Configuration options
 * @param options.offset - Default offset from target in pixels
 * @returns Object containing lenis instance and scrollTo function
 * 
 * @example
 * ```tsx
 * const { scrollTo } = useSmoothScroll({ offset: 80 })
 * scrollTo('#section')
 * scrollTo(500)
 * scrollTo(document.getElementById('target'))
 * ```
 */
export function useSmoothScroll(options: UseSmoothScrollOptions = {}) {
  const { lenis } = useSmoothScrollContext()
  const { offset = 0 } = options

  /**
   * Smoothly scrolls to a target position.
   * 
   * @param target - Scroll target (pixel value, element, or CSS selector)
   * @param opts - Override options for this scroll
   * @param opts.offset - Offset from target in pixels
   */
  const scrollTo = (target: number | HTMLElement | string, opts?: { offset?: number }) => {
    if (!lenis) return

    const finalOffset = opts?.offset ?? offset

    lenis.scrollTo(target, {
      offset: finalOffset,
      lock: false,
      force: false,
    })
  }

  return { lenis, scrollTo }
}
