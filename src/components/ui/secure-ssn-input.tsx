"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { formatters } from "@/config/theme/input-formatters"
import { inputVariants, inputStyles, floatingLabelStyles, errorStyles } from "@/config/theme/input-styles"
import { Button } from "./button"
import { IconEye, IconEyeOff } from "@tabler/icons-react"

export interface SecureSSNInputProps extends Omit<React.ComponentProps<"input">, "size"> {
  name?: string
  label?: string
  placeholder?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  size?: "sm" | "default" | "lg"
  containerClassName?: string
  error?: string | boolean
  validated?: boolean
  onValueChange?: (value: string, masked: string) => void
  floatingLabel?: boolean
}

function SecureSSNInput({
  className,
  containerClassName,
  name,
  label,
  placeholder = " ",
  helperText,
  required = false,
  disabled = false,
  size = "default",
  error,
  validated = false,
  value: controlledValue,
  defaultValue,
  onChange,
  onBlur,
  onValueChange,
  floatingLabel = true,
  ...props
}: SecureSSNInputProps) {
  const [internalValue, setInternalValue] = React.useState<string>(
    (controlledValue as string) || (defaultValue as string) || ""
  )
  const [showFull, setShowFull] = React.useState(false)
  const [hasError, setHasError] = React.useState(!!error)

  const displayValue = formatters.ssn.format(internalValue)

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

  const showBottomRightError = hasError && typeof error === "string"

  const inputClasses = cn(
    inputVariants.default,
    sizeClasses[size],
    hasError && inputStyles.error,
    validated && !hasError && inputStyles.success,
    "pr-12 peer",
    className
  )

  const labelClasses = cn(
    floatingLabelStyles.base,
    labelSizeClasses[size],
    hasError && floatingLabelStyles.error,
    required && !validated && floatingLabelStyles.required,
    required && validated && !hasError && floatingLabelStyles.validated,
    !required && validated && !hasError && floatingLabelStyles.validatedCheck,
    "peer-focus:left-4 peer-[:not(:placeholder-shown)]:left-4"
  )

  React.useEffect(() => {
    setHasError(!!error)
  }, [error])

  React.useEffect(() => {
    if (controlledValue !== undefined) {
      setInternalValue(controlledValue as string)
    }
  }, [controlledValue])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = formatters.ssn.format(e.target.value)
    const rawValue = newValue.replace(/\D/g, '')

    // Enforce max 9 digits for SSN
    if (rawValue.length > 9) {
      return
    }

    setInternalValue(newValue)
    setHasError(false)

    if (onChange) {
      const syntheticEvent = {
        ...e,
        target: {
          ...e.target,
          value: rawValue,
          name: name || '',
        },
      }
      onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>)
    }

    if (onValueChange) {
      onValueChange(rawValue, formatters.ssn.mask(newValue))
    }
  }

  const handleToggleView = () => {
    setShowFull((prev) => !prev)
  }

  return (
    <div className={cn("space-y-0", containerClassName)}>
      <div className="relative">
        <input
          type="text"
          name={name}
          value={displayValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={handleChange}
          onBlur={onBlur}
          aria-invalid={hasError}
          aria-required={required}
          data-slot="secure-ssn-input"
          id={name}
          className={inputClasses}
          maxLength={11}
          {...props}
        />
        {label && floatingLabel && (
          <label htmlFor={name} className={labelClasses}>
            {label}
          </label>
        )}
        <Button
          type="button"
          variant="ghost"
          size="icon-sm"
          className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 z-20"
          onClick={handleToggleView}
          tabIndex={-1}
          aria-label={showFull ? "Hide SSN" : "Show SSN"}
        >
          {showFull ? (
            <IconEyeOff className="h-4 w-4 text-[hsl(var(--text-muted))]" />
          ) : (
            <IconEye className="h-4 w-4 text-[hsl(var(--text-muted))]" />
          )}
        </Button>
      </div>
      {/* Error positioned half in/half out on bottom */}
      {showBottomRightError && (
        <span className={cn(errorStyles.base, errorStyles.inline, errorStyles.animation)}>
          {error}
        </span>
      )}
      {!hasError && !validated && helperText && (
        <p className="text-xs text-[hsl(var(--text-muted))] mt-1.5">{helperText}</p>
      )}
    </div>
  )
}

SecureSSNInput.displayName = "SecureSSNInput"

export { SecureSSNInput }
