"use client"

import * as React from "react"
import { Controller, type ControllerProps, type FieldPath, type FieldValues } from "react-hook-form"
import { type SmartInputBaseProps, InputCore } from "./smart-input"
import { getFormatFunction, getUnformattedValue, type InputFormat, type PhoneCountry } from "@/config/theme/input-formatters"

export interface SmartInputFieldProps<TFieldValues extends FieldValues = FieldValues>
  extends Omit<ControllerProps<TFieldValues>, "render">,
  Omit<SmartInputBaseProps, "name" | "value" | "onChange" | "onBlur" | "defaultValue"> {
  name: FieldPath<TFieldValues>
  format?: InputFormat
  country?: PhoneCountry
  formatOnBlur?: boolean
  onValueChange?: (value: string, rawValue: string) => void
}

function SmartInputField<TFieldValues extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  shouldUnregister,
  defaultValue,
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
  type = "text",
  containerClassName,
  className,
  formatOnBlur = true,
  onValueChange,
  ...props
}: SmartInputFieldProps<TFieldValues>) {
  const formatFunction = React.useMemo(() => {
    return getFormatFunction(format, country)
  }, [format, country])

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      shouldUnregister={shouldUnregister}
      defaultValue={defaultValue}
      render={({ field, fieldState }) => {
        const hasError = !!fieldState.error
        const errorMessage = fieldState.error?.message

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value
          field.onChange(newValue)

          if (onValueChange) {
            const rawValue = getUnformattedValue(newValue, format)
            onValueChange(newValue, rawValue)
          }
        }

        const handleBlur = () => {
          if (formatOnBlur && formatFunction && field.value) {
            const formattedValue = formatFunction(field.value)
            field.onChange(formattedValue)

            if (onValueChange) {
              const rawValue = getUnformattedValue(formattedValue, format)
              onValueChange(formattedValue, rawValue)
            }
          }
          field.onBlur()
        }

        return (
          <InputCore
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
            leftIcon={leftIcon}
            rightIcon={rightIcon}
            type={type}
            value={field.value || ""}
            onChange={handleChange}
            onBlur={handleBlur}
            hasError={hasError}
            errorMessage={errorMessage}
            containerClassName={containerClassName}
            className={className}
            {...props}
          />
        )
      }}
    />
  )
}

function createSmartInputFieldVariant<TFieldValues extends FieldValues = FieldValues>(
  format: InputFormat,
  defaultProps?: Partial<SmartInputFieldProps<TFieldValues>>
) {
  const Component = (props: Omit<SmartInputFieldProps<TFieldValues>, "format">) => (
    <SmartInputField format={format} {...defaultProps} {...props} />
  )
  Component.displayName = `SmartInputField${format.charAt(0).toUpperCase() + format.slice(1)}`
  return Component
}

const SmartInputFieldName = createSmartInputFieldVariant("name")
const SmartInputFieldFirstName = createSmartInputFieldVariant("firstName")
const SmartInputFieldLastName = createSmartInputFieldVariant("lastName")
const SmartInputFieldEmail = createSmartInputFieldVariant("email", { type: "email" })
const SmartInputFieldPhone = createSmartInputFieldVariant("phone", { type: "tel" })
const SmartInputFieldCurrency = createSmartInputFieldVariant("currency", {
  leftIcon: <span className="text-sm">$</span>
})
const SmartInputFieldCreditCard = createSmartInputFieldVariant("creditCard", {
  type: "tel",
  placeholder: "1234 5678 9012 3456"
})
const SmartInputFieldSSN = createSmartInputFieldVariant("ssn", {
  type: "password",
  placeholder: "XXX-XX-XXXX"
})
const SmartInputFieldZip = createSmartInputFieldVariant("zip", {
  placeholder: "12345 or 12345-6789"
})
const SmartInputFieldDate = createSmartInputFieldVariant("date", {
  type: "tel",
  placeholder: "MM/DD/YYYY"
})

export {
  SmartInputField,
  SmartInputFieldName,
  SmartInputFieldFirstName,
  SmartInputFieldLastName,
  SmartInputFieldEmail,
  SmartInputFieldPhone,
  SmartInputFieldCurrency,
  SmartInputFieldCreditCard,
  SmartInputFieldSSN,
  SmartInputFieldZip,
  SmartInputFieldDate,
}
