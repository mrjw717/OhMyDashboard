"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { inputVariants, inputStyles, floatingLabelStyles, errorStyles } from "@/config/theme/input-styles"
import {
  getFormatFunction,
  getLiveFormatFunction,
  getUnformattedValue,
  formatters,
  type InputFormat,
  type PhoneCountry,
  type CreditCardType,
  PHONE_MAX_LENGTHS,
} from "@/config/theme/input-formatters"
import { IconCreditCard, IconPhone, IconMail, IconMapPin, IconCalendar, IconCurrencyDollar, IconCheck } from "@tabler/icons-react"

const CARD_ICONS: Record<CreditCardType, React.ReactNode> = {
  visa: <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">VISA</span>,
  mastercard: <span className="text-[10px] font-bold text-red-600 dark:text-red-400">MC</span>,
  amex: <span className="text-[10px] font-bold text-blue-500 dark:text-blue-300">AMEX</span>,
  discover: <span className="text-[10px] font-bold text-orange-500 dark:text-orange-400">DISC</span>,
  unknown: <IconCreditCard className="h-4 w-4 text-[hsl(var(--text-muted))]" />,
}

const FORMAT_ICONS: Partial<Record<InputFormat, React.ReactNode>> = {
  phone: <IconPhone className="h-4 w-4" />,
  email: <IconMail className="h-4 w-4" />,
  currency: <IconCurrencyDollar className="h-4 w-4" />,
  zip: <IconMapPin className="h-4 w-4" />,
  date: <IconCalendar className="h-4 w-4" />,
}

// Formats that should always format while typing (not on blur)
const LIVE_FORMATS: InputFormat[] = ['phone', 'creditCard', 'ssn', 'date', 'zip']

export interface SmartInputBaseProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  name?: string
  label?: string
  placeholder?: string
  helperText?: string
  format?: InputFormat
  country?: PhoneCountry
  showIcon?: boolean
  required?: boolean
  disabled?: boolean
  variant?: "default" | "ghost" | "filled"
  size?: "sm" | "default" | "lg"
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  containerClassName?: string
  formatOnBlur?: boolean
  formatWhileTyping?: boolean
  onValueChange?: (value: string, rawValue: string) => void
  error?: string | boolean
  validated?: boolean
  floatingLabel?: boolean
}

interface InputCoreProps extends SmartInputBaseProps {
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  hasError: boolean
  errorMessage?: string
  cardType?: CreditCardType
  hasLeftIcon?: boolean
}

const InputCore = React.forwardRef<HTMLInputElement, InputCoreProps>(
  (
    {
      className,
      containerClassName,
      name,
      label,
      placeholder,
      helperText,
      format = "none",
      showIcon = true,
      required = false,
      disabled = false,
      variant = "default",
      size = "default",
      leftIcon,
      rightIcon,
      type = "text",
      value,
      onChange,
      onBlur,
      hasError,
      errorMessage,
      cardType,
      floatingLabel = true,
      hasLeftIcon = false,
      validated = false,
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: inputStyles.sizes.sm,
      default: inputStyles.sizes.default,
      lg: inputStyles.sizes.lg,
    }

    const labelSizeClasses = {
      sm: floatingLabelStyles.sizes.sm,
      default: floatingLabelStyles.sizes.default,
      lg: floatingLabelStyles.sizes.lg,
    }

    const iconLabelClasses = {
      sm: floatingLabelStyles.withIcon.sm,
      default: floatingLabelStyles.withIcon.default,
      lg: floatingLabelStyles.withIcon.lg,
    }

    const variantClasses = {
      default: inputVariants.default,
      ghost: inputVariants.ghost,
      filled: inputVariants.filled,
    }

    const showBottomRightError = hasError && errorMessage

    const inputClasses = cn(
      variantClasses[variant],
      sizeClasses[size],
      hasError && inputStyles.error,
      validated && !hasError && inputStyles.success,
      hasLeftIcon && inputStyles.withLeftIcon,
      (rightIcon || cardType) && inputStyles.withRightIcon,
      className
    )

    const labelClasses = cn(
      floatingLabelStyles.base,
      hasLeftIcon ? iconLabelClasses[size] : labelSizeClasses[size],
      hasError && floatingLabelStyles.error,
      required && !validated && floatingLabelStyles.required,
      required && validated && !hasError && floatingLabelStyles.validated,
      !required && validated && !hasError && floatingLabelStyles.validatedCheck
    )

    const resolvedRightIcon = cardType ? CARD_ICONS[cardType] : rightIcon

    const inputElement = (
      <div className="relative">
        {hasLeftIcon && leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[hsl(var(--text-muted))] pointer-events-none z-10">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder || " "}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-required={required}
          data-slot="smart-input"
          data-format={format}
          className={inputClasses}
          id={name}
          {...props}
        />
        {label && floatingLabel && (
          <label
            htmlFor={name}
            className={labelClasses}
          >
            {label}
          </label>
        )}
        {resolvedRightIcon && !showBottomRightError && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            {resolvedRightIcon}
          </div>
        )}
      </div>
    )

    return (
      <div className={cn("space-y-0", containerClassName)}>
        {label && !floatingLabel && (
          <label
            htmlFor={name}
            className={cn(
              "flex items-center mb-2 text-sm font-medium text-[hsl(var(--text-primary))]",
              required && !validated && "after:content-['*'] after:ml-0.5 after:text-[hsl(var(--color-error))]",
              required && validated && !hasError && "after:content-['*'] after:ml-0.5 after:text-[hsl(var(--color-success))]",
              !required && validated && !hasError && "before:content-['✓'] before:mr-1.5 before:text-[hsl(var(--color-success))]",
              disabled && "opacity-70 cursor-not-allowed"
            )}
          >
            {label}
          </label>
        )}
        {inputElement}
        {/* Error positioned half in/half out on bottom */}
        {showBottomRightError && (
          <span className={cn(errorStyles.base, errorStyles.inline, errorStyles.animation)}>
            {errorMessage}
          </span>
        )}
        {!hasError && !validated && helperText && (
          <p className="text-xs text-[hsl(var(--text-muted))] mt-1.5">{helperText}</p>
        )}
      </div>
    )
  }
)

InputCore.displayName = "InputCore"

export interface SmartInputProps extends SmartInputBaseProps {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const SmartInput = React.forwardRef<HTMLInputElement, SmartInputProps>(
  (
    {
      className,
      containerClassName,
      name,
      label,
      placeholder,
      helperText,
      format = "none",
      country = "US",
      showIcon = true,
      required = false,
      disabled = false,
      variant = "default",
      size = "default",
      leftIcon,
      rightIcon,
      formatOnBlur = true,
      formatWhileTyping = true,
      type = "text",
      onValueChange,
      onChange,
      onBlur,
      value: controlledValue,
      defaultValue,
      error,
      validated = false,
      floatingLabel = true,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      (controlledValue as string) || (defaultValue as string) || ""
    )
    const [cardType, setCardType] = React.useState<CreditCardType>("unknown")

    // Determine if this format should always format while typing
    const shouldFormatLive = LIVE_FORMATS.includes(format) || formatWhileTyping

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue as string)
      }
    }, [controlledValue])

    React.useEffect(() => {
      if (format === "creditCard") {
        const info = formatters.getCreditCardInfo(internalValue)
        setCardType(info.type)
      }
    }, [internalValue, format])

    const formatFunction = React.useMemo(() => {
      return getFormatFunction(format, country)
    }, [format, country])

    const liveFormatFunction = React.useMemo(() => {
      return getLiveFormatFunction(format, country)
    }, [format, country])

    const hasError = !!error
    const errorMessage = typeof error === "string" ? error : undefined

    const defaultIcon = FORMAT_ICONS[format]
    const resolvedLeftIcon = leftIcon || (showIcon && defaultIcon)
    const hasLeftIcon = !!resolvedLeftIcon

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newValue = e.target.value

      // Always format phone, credit card, SSN, date, zip while typing
      if (shouldFormatLive && liveFormatFunction) {
        newValue = liveFormatFunction(newValue)
      }

      // Enforce max digits for phone based on country
      if (format === 'phone' && country) {
        const maxDigits = PHONE_MAX_LENGTHS[country]
        const currentDigits = newValue.replace(/\D/g, '')
        if (currentDigits.length > maxDigits) {
          return // Don't update if exceeds max
        }
      }

      setInternalValue(newValue)

      if (format === "creditCard") {
        const info = formatters.getCreditCardInfo(newValue)
        setCardType(info.type)
      }

      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: newValue,
          },
        }
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
      }

      if (onValueChange) {
        const rawValue = getUnformattedValue(newValue, format)
        onValueChange(newValue, rawValue)
      }
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      // Only apply blur formatting for non-live formats (name, email, currency)
      if (!shouldFormatLive && formatOnBlur && formatFunction && internalValue) {
        const formattedValue = formatFunction(internalValue)
        setInternalValue(formattedValue)

        if (onValueChange) {
          const rawValue = getUnformattedValue(formattedValue, format)
          onValueChange(formattedValue, rawValue)
        }
      }

      if (onBlur) {
        onBlur(e)
      }
    }

    const showCardType = format === "creditCard"

    return (
      <InputCore
        ref={ref}
        name={name}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        format={format}
        showIcon={showIcon}
        required={required}
        disabled={disabled}
        variant={variant}
        size={size}
        leftIcon={resolvedLeftIcon}
        rightIcon={rightIcon}
        type={type}
        value={internalValue}
        onChange={handleChange}
        onBlur={handleBlur}
        hasError={hasError}
        errorMessage={errorMessage}
        cardType={showCardType ? cardType : undefined}
        floatingLabel={floatingLabel}
        hasLeftIcon={hasLeftIcon}
        validated={validated}
        containerClassName={containerClassName}
        className={className}
        {...props}
      />
    )
  }
)

SmartInput.displayName = "SmartInput"

function createSmartInputVariant(
  format: InputFormat,
  defaultProps?: Partial<SmartInputProps>
) {
  const Component = React.forwardRef<HTMLInputElement, Omit<SmartInputProps, "format">>(
    (props, ref) => (
      <SmartInput ref={ref} format={format} {...defaultProps} {...props} />
    )
  )
  Component.displayName = `SmartInput${format.charAt(0).toUpperCase() + format.slice(1)}`
  return Component
}

const SmartInputName = createSmartInputVariant("name")
const SmartInputFirstName = createSmartInputVariant("firstName")
const SmartInputLastName = createSmartInputVariant("lastName")
const SmartInputEmail = createSmartInputVariant("email", {
  type: "email",
  leftIcon: <IconMail className="h-4 w-4" />,
})
const SmartInputPhone = createSmartInputVariant("phone", {
  type: "tel",
  leftIcon: <IconPhone className="h-4 w-4" />,
})
const SmartInputCurrency = createSmartInputVariant("currency", {
  leftIcon: <IconCurrencyDollar className="h-4 w-4" />,
})
const SmartInputCreditCard = createSmartInputVariant("creditCard", {
  type: "tel",
  showIcon: false,
})
const SmartInputSSN = createSmartInputVariant("ssn", {
  type: "password",
})
const SmartInputZip = createSmartInputVariant("zip", {
  leftIcon: <IconMapPin className="h-4 w-4" />,
})
const SmartInputDate = createSmartInputVariant("date", {
  type: "tel",
  leftIcon: <IconCalendar className="h-4 w-4" />,
})

export {
  SmartInput,
  SmartInputName,
  SmartInputFirstName,
  SmartInputLastName,
  SmartInputEmail,
  SmartInputPhone,
  SmartInputCurrency,
  SmartInputCreditCard,
  SmartInputSSN,
  SmartInputZip,
  SmartInputDate,
  InputCore,
}

export type SmartInputVariantProps = {
  variant?: "default" | "ghost" | "filled"
  size?: "sm" | "default" | "lg"
}
