import { describe, it, expect } from 'vitest'
import { cn } from '@/core/utils'

describe('cn', () => {
    it('merges class names', () => {
        expect(cn('foo', 'bar')).toBe('foo bar')
    })

    it('handles conditional classes', () => {
        expect(cn('base', false && 'hidden', 'end')).toBe('base end')
    })

    it('resolves tailwind conflicts', () => {
        const result = cn('px-4', 'px-6')
        expect(result).toBe('px-6')
    })

    it('handles undefined and null', () => {
        expect(cn('base', undefined, null, 'end')).toBe('base end')
    })

    it('handles empty inputs', () => {
        expect(cn()).toBe('')
    })
})
