import { z } from 'zod'

/**
 * Email validation schema.
 * Validates email format.
 */
export const emailSchema = z.string().email('Invalid email address')

/**
 * Password validation schema.
 * Requires:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 */
export const passwordSchema = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')

/**
 * Phone number validation schema.
 * Accepts phone numbers with optional + prefix and common separators.
 */
export const phoneSchema = z
    .string()
    .regex(/^\+?[\d\s-()]+$/, 'Invalid phone number')

/**
 * URL validation schema.
 * Validates URL format.
 */
export const urlSchema = z.string().url('Invalid URL')

/**
 * Validates an email address.
 * 
 * @param email - Email string to validate
 * @returns True if valid, false otherwise
 */
export function isValidEmail(email: string): boolean {
    return emailSchema.safeParse(email).success
}

/**
 * Validates a URL.
 * 
 * @param url - URL string to validate
 * @returns True if valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
    return urlSchema.safeParse(url).success
}

/**
 * Validates a phone number.
 * 
 * @param phone - Phone number string to validate
 * @returns True if valid, false otherwise
 */
export function isValidPhone(phone: string): boolean {
    return phoneSchema.safeParse(phone).success
}
