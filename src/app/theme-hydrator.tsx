'use client'

import { useEffect, useCallback, createContext, useContext, useState, useRef } from 'react'
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from 'next-themes'
import { themes, defaultTheme, getThemeByName } from '@/config/theme/themes'
import { type Theme } from '@/config/theme/types'

/**
 * Theme context interface for theme hydration.
 * Provides theme-related state and methods to child components.
 */
interface ThemeContextType {
  colorScheme: string
  setColorScheme: (scheme: string) => void
  availableThemes: Theme[]
  currentTheme: Theme
  isLoading: boolean
}

/** Theme context for managing theme state */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/** Local storage key for color scheme */
const THEME_STORAGE = 'color-scheme'
/** Local storage key for dark mode */
const DARK_MODE_STORAGE_KEY = 'theme'

/**
 * CSS variable names that need to be set for theme colors.
 * Includes all color tokens used throughout the application.
 */
const CSS_VARIABLE_NAMES = [
  'background', 'foreground', 'card', 'card-foreground', 'popover', 'popover-foreground',
  'primary', 'primary-foreground', 'secondary', 'secondary-foreground',
  'muted', 'muted-foreground', 'accent', 'accent-foreground',
  'destructive', 'destructive-foreground', 'border', 'input', 'ring',
  'sidebar', 'sidebar-foreground', 'sidebar-primary', 'sidebar-primary-foreground',
  'sidebar-accent', 'sidebar-accent-foreground', 'sidebar-border', 'sidebar-ring',
  'radius', 'scrollbar-thumb', 'scrollbar-track', 'scrollbar-thumb-hover', 'scrollbar-thumb-active',
  'gradient-bg-1', 'gradient-bg-2', 'gradient-bg-3', 'gradient-bg-4',
  'gradient-from', 'gradient-to',
  'section', 'section-border',
  'chart-1', 'chart-2', 'chart-3', 'chart-4', 'chart-5',
  'chart-6', 'chart-7', 'chart-8', 'chart-9', 'chart-10',
  'chart-11', 'chart-12',
  'chart-inst-1', 'chart-inst-2', 'chart-inst-3', 'chart-inst-4',
  'chart-inst-5', 'chart-inst-6', 'chart-inst-7', 'chart-inst-8',
  'chart-inst-9', 'chart-inst-10', 'chart-inst-11', 'chart-inst-12',
  'chart-inst-13', 'chart-inst-14', 'chart-inst-15', 'chart-inst-16',
  'text-primary', 'text-secondary', 'text-muted', 'text-disabled', 'text-inverse',
  'bg-primary', 'bg-secondary', 'bg-tertiary', 'bg-elevated',
  'border-hover', 'border-focus',
  'color-success', 'color-warning', 'color-error', 'color-info',
  // Console size tokens (FX colors reference --primary via CSS)
  'console-button-size', 'console-icon-size', 'console-spread-radius',
]

/**
 * Applies a color scheme to the document by setting CSS variables.
 * 
 * This function:
 * 1. Retrieves the theme by name
 * 2. Gets the appropriate color palette (light or dark)
 * 3. Sets CSS variables on the root element
 * 4. Updates the theme inline style tag
 * 
 * @param schemeName - Name of the color scheme to apply
 * @param isDark - Whether to use dark mode palette
 */
function applyColorScheme(schemeName: string, isDark: boolean) {
  const theme = getThemeByName(schemeName)
  if (!theme) {
    console.warn(`Theme not found: ${schemeName}`)
    return
  }

  const colors = isDark ? theme.dark : theme.light
  const colorsMap = colors as unknown as Record<string, string>
  const root = document.documentElement

  const cssVars: string[] = []

  for (const varName of CSS_VARIABLE_NAMES) {
    const camelKey = varName.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase())
    const value = colorsMap[camelKey]
    if (value !== undefined) {
      root.style.setProperty(`--${varName}`, value)
      cssVars.push(`--${varName}:${value}`)
    }
  }

  const themeInlineStyle = document.getElementById('theme-inline')
  if (themeInlineStyle && cssVars.length > 0) {
    // CRITICAL: Must preserve these rules to keep background transparent
    // so the animated background (z-index: -1) can show through
    const baseStyles = 'html { background: transparent !important; } body { margin: 0; padding: 0; }'
    themeInlineStyle.textContent = `:root{${cssVars.join(';')}} ${baseStyles}`
  }

  root.setAttribute('data-color-scheme', schemeName)
}

/**
 * Sets the color scheme cookie via API route.
 * 
 * @param scheme - Color scheme name to store
 * @returns True if successful, false otherwise
 */
async function setColorSchemeCookie(scheme: string): Promise<boolean> {
  try {
    const response = await fetch('/api/theme', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ colorScheme: scheme })
    })
    return response.ok
  } catch (e) {
    console.error('Failed to set theme cookie:', e)
    return false
  }
}

/**
 * Retrieves the stored color scheme from localStorage.
 * 
 * @returns Color scheme name or null if not found
 */
function getLocalStorageScheme(): string | null {
  if (typeof window === 'undefined') return null
  try {
    return localStorage.getItem(THEME_STORAGE)
  } catch {
    return null
  }
}

function resolveInitialScheme(serverScheme: string): string {
  const localScheme = getLocalStorageScheme()
  if (localScheme && getThemeByName(localScheme)) {
    return localScheme
  }
  return serverScheme
}

function ColorSchemeProvider({
  children,
  initialColorScheme
}: {
  children: React.ReactNode
  initialColorScheme: string
}) {
  const { resolvedTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  const [colorScheme, setColorSchemeState] = useState<string>(() =>
    resolveInitialScheme(initialColorScheme)
  )
  const pendingCookieRef = useRef<string | null>(null)
  const currentSchemeRef = useRef<string>(colorScheme)
  const currentTheme = getThemeByName(colorScheme) || defaultTheme
  const isDark = resolvedTheme === 'dark'

  const setLocalStorageScheme = useCallback((scheme: string) => {
    if (typeof window === 'undefined') return
    try {
      localStorage.setItem(THEME_STORAGE, scheme)
    } catch (e) {
      console.error('Failed to save theme to localStorage:', e)
    }
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (pendingCookieRef.current) {
      setColorSchemeCookie(pendingCookieRef.current)
      pendingCookieRef.current = null
    }
  }, [colorScheme])

  useEffect(() => {
    if (!mounted) return
    applyColorScheme(colorScheme, isDark)
    currentSchemeRef.current = colorScheme
  }, [colorScheme, isDark, mounted])

  const setColorScheme = useCallback((scheme: string) => {
    const theme = getThemeByName(scheme)
    if (!theme) {
      console.warn(`Invalid color scheme: ${scheme}`)
      return
    }

    if (scheme === currentSchemeRef.current) return

    currentSchemeRef.current = scheme
    setColorSchemeState(scheme)
    setLocalStorageScheme(scheme)
    pendingCookieRef.current = scheme

    const currentIsDark = document.documentElement.classList.contains('dark')
    applyColorScheme(scheme, currentIsDark)
  }, [setLocalStorageScheme])

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === THEME_STORAGE && e.newValue) {
        if (getThemeByName(e.newValue)) {
          setColorSchemeState(e.newValue)
          currentSchemeRef.current = e.newValue
        }
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setColorScheme,
        availableThemes: themes,
        currentTheme,
        isLoading: !mounted,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

export function ThemeHydrator({
  children,
  initialColorScheme
}: {
  children?: React.ReactNode
  initialColorScheme: string
}) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey={DARK_MODE_STORAGE_KEY}
    >
      <ColorSchemeProvider initialColorScheme={initialColorScheme}>
        {children}
      </ColorSchemeProvider>
    </NextThemesProvider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeHydrator')
  }
  return context
}
