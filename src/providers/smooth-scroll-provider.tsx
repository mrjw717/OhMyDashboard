"use client"

import { createContext, useContext, useEffect, useRef, useState } from "react"
import type { ReactNode } from "react"
import type Lenis from "lenis"

type Direction = -1 | 0 | 1

const clamp = (value: number, min = 0, max = 1) => {
  if (value < min) return min
  if (value > max) return max
  return value
}

interface SmoothScrollMetrics {
  lenis: Lenis | null
  isEnabled: boolean
  scrollY: number
  limit: number
  velocity: number
  progress: number
  direction: Direction
}

interface SmoothScrollProviderProps {
  children: ReactNode
  containerSelector?: string
}

interface LenisScrollEvent {
  scroll: number
  limit: number
  velocity: number
  direction: Direction
  progress: number
}

const INITIAL_METRICS: SmoothScrollMetrics = {
  lenis: null,
  isEnabled: false,
  scrollY: 0,
  limit: 0,
  velocity: 0,
  progress: 0,
  direction: 0,
}

const SmoothScrollContext = createContext<SmoothScrollMetrics>(INITIAL_METRICS)

const DEFAULT_EASING = (t: number) => 1 - Math.pow(1 - t, 2.4)
const DEFAULT_SELECTOR = ".scrollable-container"
const CONTENT_SELECTOR = "[data-scroll-content]"

export function SmoothScrollProvider({
  children,
  containerSelector = DEFAULT_SELECTOR,
}: SmoothScrollProviderProps) {
  const [metrics, setMetrics] = useState<SmoothScrollMetrics>(INITIAL_METRICS)
  const containerSelectorRef = useRef(containerSelector)

  useEffect(() => {
    containerSelectorRef.current = containerSelector
  }, [containerSelector])

  useEffect(() => {
    if (typeof window === "undefined") return

    let lenisInstance: Lenis | null = null
    let rafId: number | null = null
    let seekerId: number | null = null
    let wrapper: HTMLElement | null = null
    let content: HTMLElement | null = null
    let isMounted = true

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)")

    const reset = () => {
      setMetrics(INITIAL_METRICS)
    }

    const handleScroll = (event: LenisScrollEvent) => {
      if (!isMounted) return
      setMetrics({
        lenis: lenisInstance,
        isEnabled: true,
        scrollY: event.scroll,
        limit: event.limit,
        velocity: event.velocity,
        progress: event.progress,
        direction: event.direction,
      })
    }

    const cleanup = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
        rafId = null
      }

      if (seekerId !== null) {
        window.clearTimeout(seekerId)
        seekerId = null
      }

      if (lenisInstance) {
        lenisInstance.off("scroll", handleScroll)
        lenisInstance.destroy()
        lenisInstance = null
      }

      if (wrapper) {
        wrapper.removeAttribute("data-lenis-wrapper")
        wrapper = null
      }

      if (content) {
        content.removeAttribute("data-lenis-content")
        content = null
      }
    }

    function queuePollRetry() {
      seekerId = window.setTimeout(() => {
        void pollForElements()
      }, 250)
    }

    async function pollForElements(): Promise<void> {
      if (!isMounted || motionQuery.matches) return

      wrapper = document.querySelector<HTMLElement>(containerSelectorRef.current)

      if (!wrapper) {
        queuePollRetry()
        return
      }

      content = wrapper.querySelector<HTMLElement>(CONTENT_SELECTOR) ?? (wrapper.firstElementChild as HTMLElement | null)

      if (!content) {
        queuePollRetry()
        return
      }

      const { default: Lenis } = await import("lenis")
      if (!isMounted || motionQuery.matches) return

      wrapper.dataset.lenisWrapper = "true"
      content.dataset.lenisContent = "true"

      lenisInstance = new Lenis({
        wrapper,
        content,
        duration: 1.15,
        easing: DEFAULT_EASING,
        smoothWheel: true,
        touchMultiplier: 1.05,
        wheelMultiplier: 1,
        gestureOrientation: "vertical",
      })

      const limit = lenisInstance.limit ?? Math.max((content.scrollHeight ?? 0) - (wrapper.clientHeight ?? 0), 0)
      const scrollTop = wrapper.scrollTop ?? 0
      const progress = limit === 0 ? 0 : clamp(scrollTop / limit, 0, 1)

      handleScroll({
        scroll: scrollTop,
        limit,
        velocity: 0,
        direction: 0,
        progress,
      })

      lenisInstance.on("scroll", handleScroll)

      const run = (time: number) => {
        if (!lenisInstance) return
        lenisInstance.raf(time)
        rafId = requestAnimationFrame(run)
      }

      rafId = requestAnimationFrame(run)
    }

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      if (event.matches) {
        cleanup()
        reset()
      } else {
        cleanup()
        pollForElements()
      }
    }

    if (!motionQuery.matches) {
      pollForElements()
    } else {
      reset()
    }

    motionQuery.addEventListener("change", handleMotionPreference)

    return () => {
      isMounted = false
      motionQuery.removeEventListener("change", handleMotionPreference)
      cleanup()
    }
  }, [])

  return <SmoothScrollContext.Provider value={metrics}>{children}</SmoothScrollContext.Provider>
}

export function useSmoothScrollContext(): SmoothScrollMetrics {
  return useContext(SmoothScrollContext)
}
