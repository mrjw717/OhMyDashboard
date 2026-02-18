/**
 * Client-side check for localStorage availability.
 */
const isClient = typeof window !== 'undefined'

/**
 * Retrieves a value from localStorage.
 * Returns default value if key doesn't exist or on error.
 * 
 * @template T - Type of the stored value
 * @param key - localStorage key
 * @param defaultValue - Default value if key doesn't exist
 * @returns Stored value or default
 */
export function getLocalStorage<T>(key: string, defaultValue: T): T {
    if (!isClient) return defaultValue

    try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
    } catch {
        return defaultValue
    }
}

/**
 * Stores a value in localStorage.
 * 
 * @template T - Type of the value to store
 * @param key - localStorage key
 * @param value - Value to store
 */
export function setLocalStorage<T>(key: string, value: T): void {
    if (!isClient) return

    try {
        window.localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
        console.error(`Error saving to localStorage: ${error}`)
    }
}

/**
 * Removes a value from localStorage.
 * 
 * @param key - localStorage key to remove
 */
export function removeLocalStorage(key: string): void {
    if (!isClient) return

    try {
        window.localStorage.removeItem(key)
    } catch (error) {
        console.error(`Error removing from localStorage: ${error}`)
    }
}

/**
 * Retrieves a cookie value by name.
 * 
 * @param name - Cookie name
 * @returns Cookie value or null if not found
 */
export function getCookie(name: string): string | null {
    if (!isClient) return null

    const value = `; ${document.cookie}`
    const parts = value.split(`; ${name}=`)

    if (parts.length === 2) {
        return parts.pop()?.split(';').shift() ?? null
    }

    return null
}

/**
 * Sets a cookie value.
 * 
 * @param name - Cookie name
 * @param value - Cookie value
 * @param maxAge - Optional max age in seconds
 */
export function setCookie(name: string, value: string, maxAge?: number): void {
    if (!isClient) return

    let cookie = `${name}=${value}; path=/`
    if (maxAge) {
        cookie += `; max-age=${maxAge}`
    }
    document.cookie = cookie
}
