import { describe, it, expect } from 'vitest'
import {
    emailSchema,
    passwordSchema,
    phoneSchema,
    urlSchema,
    isValidEmail,
    isValidUrl,
    isValidPhone,
} from '@/core/validation'

describe('emailSchema', () => {
    it('accepts valid emails', () => {
        expect(emailSchema.safeParse('user@example.com').success).toBe(true)
    })

    it('rejects invalid emails', () => {
        expect(emailSchema.safeParse('not-an-email').success).toBe(false)
    })
})

describe('passwordSchema', () => {
    it('accepts valid passwords', () => {
        expect(passwordSchema.safeParse('Passw0rd').success).toBe(true)
    })

    it('rejects too short', () => {
        expect(passwordSchema.safeParse('Ab1').success).toBe(false)
    })

    it('rejects without uppercase', () => {
        expect(passwordSchema.safeParse('password1').success).toBe(false)
    })

    it('rejects without number', () => {
        expect(passwordSchema.safeParse('Password').success).toBe(false)
    })
})

describe('phoneSchema', () => {
    it('accepts valid phone numbers', () => {
        expect(phoneSchema.safeParse('+1 (555) 123-4567').success).toBe(true)
    })

    it('rejects letters', () => {
        expect(phoneSchema.safeParse('abc-def-ghij').success).toBe(false)
    })
})

describe('urlSchema', () => {
    it('accepts valid URLs', () => {
        expect(urlSchema.safeParse('https://example.com').success).toBe(true)
    })

    it('rejects invalid URLs', () => {
        expect(urlSchema.safeParse('not a url').success).toBe(false)
    })
})

describe('helper functions', () => {
    it('isValidEmail returns boolean', () => {
        expect(isValidEmail('user@test.com')).toBe(true)
        expect(isValidEmail('invalid')).toBe(false)
    })

    it('isValidUrl returns boolean', () => {
        expect(isValidUrl('https://test.com')).toBe(true)
        expect(isValidUrl('nope')).toBe(false)
    })

    it('isValidPhone returns boolean', () => {
        expect(isValidPhone('555-1234')).toBe(true)
        expect(isValidPhone('abc')).toBe(false)
    })
})
