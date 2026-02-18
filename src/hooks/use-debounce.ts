import * as React from 'react'

/**
 * Custom hook for debouncing a value.
 * Delays updating the returned value until after a specified delay has elapsed
 * since the last time the value changed.
 * 
 * Useful for:
 * - Search input debouncing
 * - API call throttling
 * - Performance optimization in event handlers
 * 
 * @template T - Type of the value to debounce
 * @param value - Value to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced value
 * 
 * @example
 * ```tsx
 * const [searchTerm, setSearchTerm] = useState('')
 * const debouncedSearch = useDebounce(searchTerm, 300)
 * // debouncedSearch updates 300ms after searchTerm stops changing
 * ```
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)

  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
