/**
 * Input Formatters - Auto-formatting logic for various input types
 * 
 * Features:
 * - Formats while typing (live) or on blur
 * - Credit card type detection from first 4 digits
 * - Max limits for currency, credit card, and phone per country
 * - SSN secure handling (show last 4 only)
 * - Top 6 countries for phone formatting
 */

export type PhoneCountry = 'US' | 'UK' | 'CA' | 'DE' | 'FR' | 'AU'

export type InputFormat = 
  | 'name' 
  | 'firstName' 
  | 'lastName' 
  | 'phone' 
  | 'email' 
  | 'currency' 
  | 'creditCard' 
  | 'ssn' 
  | 'zip'
  | 'date'
  | 'none'

export type CreditCardType = 'visa' | 'mastercard' | 'amex' | 'discover' | 'unknown'

export interface CreditCardInfo {
  type: CreditCardType
  formatted: string
  maxLength: number
  isValid: boolean
}

export const CREDIT_CARD_PATTERNS: Record<CreditCardType, { pattern: RegExp; maxLength: number }> = {
  visa: { pattern: /^4/, maxLength: 16 },
  mastercard: { pattern: /^(5[1-5]|2[2-7])/, maxLength: 16 },
  amex: { pattern: /^3[47]/, maxLength: 15 },
  discover: { pattern: /^6(?:011|5)/, maxLength: 16 },
  unknown: { pattern: /.*/, maxLength: 16 },
}

export const CURRENCY_LIMITS = {
  min: 0,
  max: 999999999.99,
  maxFormatted: '$999,999,999.99',
}

export const PHONE_MAX_LENGTHS: Record<PhoneCountry, number> = {
  US: 10,
  UK: 11,
  CA: 10,
  DE: 11,
  FR: 10,
  AU: 10,
}

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
 * Collection of input formatters for various data types.
 * Provides formatting and validation logic for different input formats.
 */
export const formatters = {
  /**
   * Capitalizes the first letter of each word in a name.
 * Removes extra spaces and trims whitespace.
   * 
   * @param value - Name string to capitalize
   * @returns Capitalized name string
   */
  capitalizeName: (value: string): string => {
    if (!value) return ''
    return value
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace(/\s+/g, ' ')
      .trim()
  },

  /**
   * Formats name while typing.
   * Removes invalid characters and extra spaces.
   * 
   * @param value - Name string being typed
   * @returns Formatted name string
   */
  formatNameWhileTyping: (value: string): string => {
    if (!value) return ''
    return value
      .replace(/[^a-zA-Z\s\-']/g, '')
      .replace(/\s+/g, ' ')
  },

  /**
   * Formats phone number for US format.
   * Returns format: (XXX) XXX-XXXX
   * 
   * @param value - Phone number string
   * @returns Formatted US phone number
   */
  phoneUS: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length === 0) return ''
    if (digits.length < 4) return digits
    if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
  },

  phoneUK: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length === 0) return ''
    if (digits.length < 5) return digits
    if (digits.length < 8) return `${digits.slice(0, 5)} ${digits.slice(5)}`
    return `${digits.slice(0, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`
  },

  phoneCA: (value: string): string => {
    return formatters.phoneUS(value)
  },

  phoneDE: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 11)
    if (digits.length === 0) return ''
    if (digits.length < 4) return digits
    if (digits.length < 8) return `${digits.slice(0, 4)} ${digits.slice(4)}`
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  },

  phoneFR: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length === 0) return ''
    const groups = digits.match(/.{1,2}/g) || []
    return groups.join(' ')
  },

  phoneAU: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length === 0) return ''
    if (digits.length < 4) return digits
    if (digits.length < 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`
  },

  email: (value: string): string => {
    return value.toLowerCase().trim()
  },

  currency: (value: string): string => {
    const cleanValue = value.replace(/[^0-9.]/g, '')
    if (!cleanValue) return ''
    
    let num = parseFloat(cleanValue)
    if (isNaN(num)) return ''
    
    if (num > CURRENCY_LIMITS.max) {
      num = CURRENCY_LIMITS.max
    }
    if (num < CURRENCY_LIMITS.min) {
      num = CURRENCY_LIMITS.min
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num)
  },

  currencyRaw: (value: string): string => {
    let cleanValue = value.replace(/[^0-9.]/g, '')
    if (!cleanValue) return ''
    
    const parts = cleanValue.split('.')
    if (parts.length > 2) {
      cleanValue = parts[0] + '.' + parts.slice(1).join('')
    }
    
    const num = parseFloat(cleanValue)
    if (num > CURRENCY_LIMITS.max) {
      return CURRENCY_LIMITS.max.toString()
    }
    
    return cleanValue
  },

  detectCreditCardType: (value: string): CreditCardType => {
    const digits = value.replace(/\D/g, '')
    
    for (const [type, config] of Object.entries(CREDIT_CARD_PATTERNS)) {
      if (type !== 'unknown' && config.pattern.test(digits)) {
        return type as CreditCardType
      }
    }
    
    return 'unknown'
  },

  getCreditCardInfo: (value: string): CreditCardInfo => {
    const digits = value.replace(/\D/g, '')
    const type = formatters.detectCreditCardType(digits)
    const maxLength = CREDIT_CARD_PATTERNS[type].maxLength
    const truncated = digits.slice(0, maxLength)
    
    let formatted = truncated
    if (type === 'amex') {
      if (truncated.length < 5) formatted = truncated
      else if (truncated.length < 11) formatted = `${truncated.slice(0, 4)} ${truncated.slice(4)}`
      else formatted = `${truncated.slice(0, 4)} ${truncated.slice(4, 10)} ${truncated.slice(10)}`
    } else {
      formatted = truncated.replace(/(.{4})/g, '$1 ').trim()
    }
    
    return {
      type,
      formatted,
      maxLength,
      isValid: truncated.length === maxLength && luhnCheck(truncated),
    }
  },

  creditCard: (value: string): string => {
    const info = formatters.getCreditCardInfo(value)
    return info.formatted
  },

  ssn: {
    format: (value: string): string => {
      const digits = value.replace(/\D/g, '').slice(0, 9)
      if (digits.length === 0) return ''
      if (digits.length < 4) return digits
      if (digits.length < 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
      return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`
    },
    
    mask: (value: string): string => {
      const digits = value.replace(/\D/g, '')
      if (digits.length < 4) return '***-**-' + digits.padStart(4, '*')
      return `***-**-${digits.slice(-4)}`
    },
    
    getLastFour: (value: string): string => {
      const digits = value.replace(/\D/g, '')
      return digits.slice(-4).padStart(4, '0')
    },
    
    toSecureString: (value: string): string => {
      return `[SSN: ****]`
    },
  },

  zipCode: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 9)
    if (digits.length === 0) return ''
    if (digits.length <= 5) return digits
    return `${digits.slice(0, 5)}-${digits.slice(5)}`
  },

  date: (value: string): string => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    if (digits.length === 0) return ''
    if (digits.length < 3) return digits
    if (digits.length < 5) return `${digits.slice(0, 2)}/${digits.slice(2)}`
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
  },
}

export const phoneFormatters: Record<PhoneCountry, (value: string) => string> = {
  US: formatters.phoneUS,
  UK: formatters.phoneUK,
  CA: formatters.phoneCA,
  DE: formatters.phoneDE,
  FR: formatters.phoneFR,
  AU: formatters.phoneAU,
}

export const formatPhone = (value: string, country: PhoneCountry = 'US'): string => {
  return phoneFormatters[country](value)
}

export const getFormatFunction = (
  format: InputFormat, 
  country?: PhoneCountry
): ((value: string) => string) | null => {
  switch (format) {
    case 'name':
    case 'firstName':
    case 'lastName':
      return formatters.capitalizeName
    case 'phone':
      return (v) => formatPhone(v, country || 'US')
    case 'email':
      return formatters.email
    case 'currency':
      return formatters.currency
    case 'creditCard':
      return formatters.creditCard
    case 'ssn':
      return formatters.ssn.format
    case 'zip':
      return formatters.zipCode
    case 'date':
      return formatters.date
    case 'none':
    default:
      return null
  }
}

export const getLiveFormatFunction = (
  format: InputFormat,
  country?: PhoneCountry
): ((value: string) => string) | null => {
  switch (format) {
    case 'name':
    case 'firstName':
    case 'lastName':
      return formatters.formatNameWhileTyping
    case 'phone':
      return (v) => formatPhone(v, country || 'US')
    case 'creditCard':
      return formatters.creditCard
    case 'ssn':
      return formatters.ssn.format
    case 'zip':
      return formatters.zipCode
    case 'date':
      return formatters.date
    case 'currency':
      return formatters.currencyRaw
    default:
      return null
  }
}

export const getUnformattedValue = (value: string, format: InputFormat): string => {
  switch (format) {
    case 'phone':
    case 'ssn':
    case 'creditCard':
    case 'zip':
    case 'date':
      return value.replace(/\D/g, '')
    case 'currency':
      return value.replace(/[^0-9.]/g, '')
    case 'email':
    case 'name':
    case 'firstName':
    case 'lastName':
      return value.trim()
    default:
      return value
  }
}

export default formatters
