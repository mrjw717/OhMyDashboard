"use client"

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'

interface ScrollBlurProps {
  containerSelector?: string
  topBlurHeight?: string
  bottomBlurHeight?: string
  strength?: number
  className?: string
  style?: React.CSSProperties
}

/**
 * ScrollBlur Component
 * DO NOT MODIFY: tuned to avoid blurring shell backgrounds while heavily distorting scrolling content.
 * - Uses backdrop-filter with transparent mask gradients (no visible fills) to control falloff.
 * - Expects to be absolutely inset over the scroll container with matching radius; z-index set by parent.
 * - Detects overflow to toggle visibility and keeps blur active whenever content can scroll.
 *
 * @param containerSelector - CSS selector to find the scrollable parent (default: '.scrollable-container').
 * @param topBlurHeight - Height of the top blur zone.
 * @param bottomBlurHeight - Height of the bottom blur zone.
 * @param strength - Blur intensity multiplier (higher = more distortion).
 */
export function ScrollBlur({
  containerSelector = '.scrollable-container',
  topBlurHeight = '3rem',
  bottomBlurHeight = '3rem',
  strength = 1.5,
  className,
  style,
}: ScrollBlurProps) {
  const [showTopBlur, setShowTopBlur] = useState(false)
  const [showBottomBlur, setShowBottomBlur] = useState(false)
  const containerRef = useRef<HTMLElement | null>(null)

  const checkScroll = useCallback(() => {
    const container = containerRef.current
    if (!container) return

    const { scrollTop, scrollHeight, clientHeight } = container
    const hasOverflow = scrollHeight > clientHeight + 1
    const isAtTop = scrollTop <= 10
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10

    // Keep blur active whenever there's overflow; fade only when truly at bounds.
    setShowTopBlur(hasOverflow && !isAtTop ? true : hasOverflow)
    setShowBottomBlur(hasOverflow && !isAtBottom ? true : hasOverflow)
  }, [])

  useEffect(() => {
    const findContainer = () => {
      containerRef.current = document.querySelector(containerSelector)
      if (containerRef.current) {
        checkScroll()
        containerRef.current.addEventListener('scroll', checkScroll, { passive: true })
        window.addEventListener('resize', checkScroll)
      } else {
        setTimeout(findContainer, 100)
      }
    }

    findContainer()

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', checkScroll)
      }
      window.removeEventListener('resize', checkScroll)
    }
  }, [containerSelector, checkScroll])

  return (
    <div
      className={cn("pointer-events-none", className)}
      style={{
        ...{
          position: 'absolute',
          inset: 0,
          zIndex: 5,
          overflow: 'hidden',
          isolation: 'isolate',
        },
        ...style
      }}
      aria-hidden="true"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          top: 0,
          height: topBlurHeight,
          backdropFilter: `blur(${(strength * 8).toFixed(2)}px)`,
          WebkitBackdropFilter: `blur(${(strength * 8).toFixed(2)}px)`,
          background: 'transparent',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.2) 75%, rgba(0,0,0,0) 100%)',
          opacity: showTopBlur ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: bottomBlurHeight,
          backdropFilter: `blur(${(strength * 8).toFixed(2)}px)`,
          WebkitBackdropFilter: `blur(${(strength * 8).toFixed(2)}px)`,
          background: 'transparent',
          maskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1) 0%, rgba(0,0,0,0.45) 35%, rgba(0,0,0,0.18) 65%, rgba(0,0,0,0) 100%)',
          opacity: showBottomBlur ? 1 : 0,
          transition: 'opacity 0.25s ease-out',
        }}
      />
    </div>
  )
}

export default ScrollBlur
