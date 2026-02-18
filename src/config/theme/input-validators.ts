/**
 * Input Validators - Zod schemas for various input types
 * 
 * Pre-built validators with sensible error messages.
 * Can be composed into larger schemas.
 */

import { z } from 'zod'

/**
 * Validates a credit card number using the Luhn algorithm.
 * 
 * The Luhn algorithm is used to validate credit card numbers.
 * It works by:
 * 1. Starting from the rightmost digit, double every second digit
 * 2. If doubling results in a number > 9, subtract 9
 * 3. Sum all digits
 * 4. If sum is divisible by 10, the number is valid
 * 
 * @param cardNumber - Credit card number to validate
 * @returns True if the card number passes Luhn validation
 */
const luhnCheck = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, '')
  if (!/^\d+$/.test(digits)) return false
  
  let sum = 0
  let isEven = false
  
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10)
    
    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }
    
    sum += digit
    isEven = !isEven
  }
  
  return sum % 10 === 0
}

/**
 * Collection of Zod validators for various input types.
 * Provides pre-built validation schemas with sensible error messages.
 */
export const validators = {
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be 50 characters or less')
    .regex(/^[a-zA-Z\s\-']+$/, 'First name contains invalid characters'),

  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be 50 characters or less')
    .regex(/^[a-zA-Z\s\-']+$/, 'Last name contains invalid characters'),

  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name must be 100 characters or less')
    .regex(/^[a-zA-Z\s\-']+$/, 'Name contains invalid characters'),

  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address')
    .max(255, 'Email must be 255 characters or less'),

  emailOptional: z.string()
    .email('Please enter a valid email address')
    .max(255, 'Email must be 255 characters or less')
    .or(z.literal('')),

  phoneUS: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid US phone number'),

  phoneUSOptional: z.string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid US phone number')
    .or(z.literal('')),

  phoneUK: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\d{5} \d{3} \d{3}$/, 'Please enter a valid UK phone number'),

  phoneCA: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid Canadian phone number'),

  phoneDE: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\d{4} \d{3} \d{4}$/, 'Please enter a valid German phone number'),

  phoneFR: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\d{2} \d{2} \d{2} \d{2} \d{2}$/, 'Please enter a valid French phone number'),

  phoneAU: z.string()
    .min(1, 'Phone number is required')
    .regex(/^\d{4} \d{3} \d{3}$/, 'Please enter a valid Australian phone number'),

  currency: z.string()
    .min(1, 'Amount is required')
    .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, 'Please enter a valid amount'),

  currencyOptional: z.string()
    .regex(/^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/, 'Please enter a valid amount')
    .or(z.literal('')),

  creditCard: z.string()
    .min(1, 'Card number is required')
    .refine(
      (val) => luhnCheck(val),
      'Please enter a valid card number'
    ),

  creditCardOptional: z.string()
    .refine(
      (val) => val === '' || luhnCheck(val),
      'Please enter a valid card number'
    ),

  ssn: z.string()
    .min(1, 'SSN is required')
    .regex(/^\d{3}-\d{2}-\d{4}$/, 'Please enter a valid SSN (XXX-XX-XXXX)')
    .refine(
      (val) => !val.startsWith('000') && !val.includes('-00-') && !val.endsWith('0000'),
      'Please enter a valid SSN'
    ),

  ssnOptional: z.string()
    .regex(/^\d{3}-\d{2}-\d{4}$/, 'Please enter a valid SSN (XXX-XX-XXXX)')
    .or(z.literal('')),

  zipCode: z.string()
    .min(1, 'ZIP code is required')
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code'),

  zipCodeOptional: z.string()
    .regex(/^\d{5}(-\d{4})?$/, 'Please enter a valid ZIP code')
    .or(z.literal('')),

  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must be 128 characters or less')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character'),

  passwordSimple: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(128, 'Password must be 128 characters or less'),

  date: z.string()
    .min(1, 'Date is required')
    .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/, 'Please enter a valid date (MM/DD/YYYY)'),

  dateOptional: z.string()
    .regex(/^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])\/\d{4}$/, 'Please enter a valid date (MM/DD/YYYY)')
    .or(z.literal('')),

  url: z.string()
    .min(1, 'URL is required')
    .url('Please enter a valid URL'),

  urlOptional: z.string()
    .url('Please enter a valid URL')
    .or(z.literal('')),

  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username must be 30 characters or less')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),

  required: z.string().min(1, 'This field is required'),

  optional: z.string(),
}

/**
 * Common schema compositions for typical use cases.
 * Combines multiple validators into reusable schemas.
 */
export const commonSchemas = {
  user: z.object({
    firstName: validators.firstName,
    lastName: validators.lastName,
    email: validators.email,
    phone: validators.phoneUSOptional,
  }),

  address: z.object({
    street1: z.string().min(1, 'Street address is required'),
    street2: z.string().optional(),
    city: z.string().min(1, 'City is required'),
    state: z.string().min(1, 'State is required'),
    zip: validators.zipCode,
  }),

  paymentCard: z.object({
    cardNumber: validators.creditCard,
    expiryDate: z.string()
      .min(1, 'Expiry date is required')
      .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Please enter a valid expiry date (MM/YY)'),
    cvv: z.string()
      .min(1, 'CVV is required')
      .regex(/^\d{3,4}$/, 'Please enter a valid CVV'),
    nameOnCard: validators.name,
  }),

  login: z.object({
    email: validators.email,
    password: z.string().min(1, 'Password is required'),
  }),

  register: z.object({
    email: validators.email,
    password: validators.password,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
}

export type FirstNameInput = z.infer<typeof validators.firstName>
export type LastNameInput = z.infer<typeof validators.lastName>
export type EmailInput = z.infer<typeof validators.email>
export type PhoneUSInput = z.infer<typeof validators.phoneUS>
export type CurrencyInput = z.infer<typeof validators.currency>
export type CreditCardInput = z.infer<typeof validators.creditCard>
export type SSNInput = z.infer<typeof validators.ssn>
export type ZipCodeInput = z.infer<typeof validators.zipCode>
export type PasswordInput = z.infer<typeof validators.password>

export type UserSchema = z.infer<typeof commonSchemas.user>
export type AddressSchema = z.infer<typeof commonSchemas.address>
export type PaymentCardSchema = z.infer<typeof commonSchemas.paymentCard>
export type LoginSchema = z.infer<typeof commonSchemas.login>
export type RegisterSchema = z.infer<typeof commonSchemas.register>

export default validators
