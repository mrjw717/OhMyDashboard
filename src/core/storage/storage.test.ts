import { describe, it, expect, beforeEach, vi } from 'vitest'
import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage,
} from '@/core/storage'

describe('localStorage helpers', () => {
    beforeEach(() => {
        localStorage.clear()
    })

    it('getLocalStorage returns default when key not found', () => {
        expect(getLocalStorage('missing', 'default')).toBe('default')
    })

    it('setLocalStorage stores and getLocalStorage retrieves values', () => {
        setLocalStorage('key', { name: 'test' })
        expect(getLocalStorage('key', null)).toEqual({ name: 'test' })
    })

    it('handles non-JSON gracefully', () => {
        localStorage.setItem('bad', 'not-json{')
        expect(getLocalStorage('bad', 'fallback')).toBe('fallback')
    })

    it('removeLocalStorage removes the key', () => {
        setLocalStorage('key', 'value')
        removeLocalStorage('key')
        expect(getLocalStorage('key', null)).toBeNull()
    })
})
