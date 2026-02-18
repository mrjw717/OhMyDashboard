/**
 * Formats a number using locale-specific formatting.
 * 
 * @param value - Number to format
 * @param options - Intl.NumberFormatOptions
 * @returns Formatted number string
 */
export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
    return new Intl.NumberFormat('en-US', options).format(value)
}

/**
 * Formats a number as currency.
 * 
 * @param value - Number to format
 * @param currency - Currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(value: number, currency = 'USD'): string {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value)
}

/**
 * Formats a number as a percentage with optional decimals.
 * 
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 1)
 * @returns Formatted percentage string
 */
export function formatPercent(value: number, decimals = 1): string {
    return `${value >= 0 ? '+' : ''}${value.toFixed(decimals)}%`
}

/**
 * Formats a date using locale-specific formatting.
 * 
 * @param date - Date or date string to format
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
    const d = typeof date === 'string' ? new Date(date) : date
    return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        ...options,
    }).format(d)
}

/**
 * Formats a number in compact notation (e.g., 1K, 1M, 1B).
 * 
 * @param value - Number to format
 * @returns Formatted compact number string
 */
export function formatCompactNumber(value: number): string {
    return new Intl.NumberFormat('en-US', {
        notation: 'compact',
        compactDisplay: 'short',
    }).format(value)
}
