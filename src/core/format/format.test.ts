import { describe, it, expect } from 'vitest'
import {
    formatNumber,
    formatCurrency,
    formatPercent,
    formatDate,
    formatCompactNumber,
} from '@/core/format'

describe('formatNumber', () => {
    it('formats integers with commas', () => {
        expect(formatNumber(1000)).toBe('1,000')
        expect(formatNumber(1000000)).toBe('1,000,000')
    })

    it('formats with options', () => {
        expect(formatNumber(1234.5, { minimumFractionDigits: 2 })).toBe('1,234.50')
    })
})

describe('formatCurrency', () => {
    it('formats USD by default', () => {
        expect(formatCurrency(99.99)).toBe('$99.99')
    })

    it('formats other currencies', () => {
        const result = formatCurrency(1000, 'EUR')
        expect(result).toContain('1,000.00')
    })
})

describe('formatPercent', () => {
    it('formats positive values with +', () => {
        expect(formatPercent(5.25)).toBe('+5.3%')
    })

    it('formats negative values', () => {
        expect(formatPercent(-3.14)).toBe('-3.1%')
    })

    it('respects decimal places', () => {
        expect(formatPercent(5.256, 2)).toBe('+5.26%')
    })
})

describe('formatDate', () => {
    it('formats Date objects', () => {
        // Use a date that avoids timezone boundary issues
        const date = new Date(2024, 0, 15) // Jan 15, 2024 local time
        const result = formatDate(date)
        expect(result).toContain('Jan')
        expect(result).toContain('15')
    })

    it('formats date strings', () => {
        // Use T12:00 to avoid timezone shift across midnight
        const result = formatDate('2024-06-01T12:00:00')
        expect(result).toContain('Jun')
    })
})

describe('formatCompactNumber', () => {
    it('compacts thousands', () => {
        expect(formatCompactNumber(1500)).toBe('1.5K')
    })

    it('compacts millions', () => {
        expect(formatCompactNumber(2000000)).toBe('2M')
    })
})
