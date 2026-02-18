import * as React from 'react'
import { getLocalStorage, setLocalStorage } from '@/lib/storage'

/**
 * Custom hook for managing state in localStorage.
 * Persists state to localStorage and keeps it in sync with React state.
 * 
 * Features:
 * - Automatic persistence to localStorage
 * - Type-safe state management
 * - Supports both direct values and updater functions
 * - Handles SSR gracefully (uses initialValue if localStorage is unavailable)
 * 
 * @template T - Type of the stored value
 * @param key - localStorage key to use
 * @param initialValue - Initial value if key doesn't exist
 * @returns Tuple of [storedValue, setValue]
 * 
 * @example
 * ```tsx
 * const [theme, setTheme] = useLocalStorage('theme', 'light')
 * // theme is persisted to localStorage under key 'theme'
 * ```
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = React.useState<T>(() => {
    return getLocalStorage(key, initialValue)
  })

  /**
   * Updates both React state and localStorage.
   * Accepts either a direct value or an updater function.
   */
  const setValue = React.useCallback(
    (value: T | ((prev: T) => T)) => {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      setLocalStorage(key, valueToStore)
    },
    [key, storedValue]
  )

  return [storedValue, setValue]
}
