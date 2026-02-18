/**
 * Input Styles - Centralized styling for input components
 * 
 * Uses CSS variables from theme system for consistent colors.
 * - 1px focus ring with bottom glow when active (uses primary theme color)
 * - Floating label intersects top border (outline style)
 * - Proper light/dark mode text colors via theme tokens
 * - Distinct size and style variants
 */

export const inputStyles = {
  base: [
    'flex w-full rounded-lg bg-transparent text-base outline-none',
    'file:text-foreground file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-transparent',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'transition-all duration-200',
    'text-[hsl(var(--text-primary))]',
    'peer',
  ].join(' '),

  sizes: {
    sm: 'h-11 px-3 pt-3 pb-2 text-sm rounded-md',
    default: 'h-13 px-4 pt-4 pb-2.5 text-sm rounded-lg',
    lg: 'h-15 px-5 pt-5 pb-3 text-base rounded-lg',
  },

  border: [
    'border border-transparent',
    'bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/92%,hsl(var(--bg-primary))/72%)]',
    'shadow-[inset_0_0_0_1px_hsl(var(--border)/0.5),0_10px_30px_-26px_hsl(var(--ring)/0.4)]',
    'backdrop-blur-[3px]',
    'dark:bg-[radial-gradient(circle_at_30%_10%,hsl(var(--bg-primary))/60%,hsl(var(--bg-secondary))/35%)]',
    'dark:shadow-[inset_0_0_0_1px_hsl(var(--border)/0.35),0_14px_36px_-30px_hsl(var(--ring)/0.6)]',
  ].join(' '),
  
  focus: [
    'focus:bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/100%,hsl(var(--bg-primary))/85%)]',
    'dark:focus:bg-[radial-gradient(circle_at_28%_18%,hsl(var(--bg-primary))/75%,hsl(var(--bg-secondary))/45%)]',
    'focus:-translate-y-0.5',
    'focus:shadow-[inset_0_0_0_1px_hsl(var(--ring)/0.55),0_20px_52px_-26px_hsl(var(--ring)/0.55),0_0_34px_-12px_hsl(var(--ring)/0.45)]',
    'dark:focus:shadow-[inset_0_0_0_1px_hsl(var(--ring)/0.5),0_22px_56px_-28px_hsl(var(--ring)/0.65),0_0_38px_-14px_hsl(var(--ring)/0.5)]',
    'focus:ring-0 focus:ring-offset-0',
  ].join(' '),

  error: [
    'border-[hsl(var(--color-error))]',
    'ring-1 ring-[hsl(var(--color-error))]/20',
    'shadow-[0_8px_20px_-4px_hsl(var(--color-error)/0.15)]',
    'focus:border-[hsl(var(--color-error))]',
    'focus:ring-[hsl(var(--color-error))]/30',
    'focus:shadow-[0_8px_20px_-4px_hsl(var(--color-error)/0.25)]',
  ].join(' '),

  success: [
    'border-[hsl(var(--color-success))]',
    'ring-1 ring-[hsl(var(--color-success))]/20',
    'shadow-[0_8px_20px_-4px_hsl(var(--color-success)/0.15)]',
  ].join(' '),

  hover: [
    'hover:bg-[radial-gradient(circle_at_18%_0%,hsl(var(--bg-secondary))/98%,hsl(var(--bg-primary))/78%)]',
    'dark:hover:bg-[radial-gradient(circle_at_25%_10%,hsl(var(--bg-primary))/70%,hsl(var(--bg-secondary))/40%)]',
    'hover:shadow-[inset_0_0_0_1px_hsl(var(--border)/0.75),0_18px_38px_-28px_hsl(var(--ring)/0.45)]',
  ].join(' '),
  
  withLeftIcon: 'pl-11',
  withRightIcon: 'pr-11',
}

export const floatingLabelStyles = {
  base: [
    'absolute text-base font-normal transition-all duration-300 ease-out pointer-events-none z-20',
    'text-[hsl(var(--text-muted))]',
    'top-1/2 -translate-y-1/2',
    'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:font-medium',
    'peer-focus:text-[hsl(var(--ring))]',
    'peer-focus:px-1 peer-focus:bg-[hsl(var(--bg-primary))] peer-focus:rounded-md peer-focus:z-30',
    'peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:font-medium',
    'peer-[:not(:placeholder-shown)]:text-[hsl(var(--ring))] peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:rounded-md peer-[:not(:placeholder-shown)]:bg-[hsl(var(--bg-primary))]',
    'peer-[:not(:placeholder-shown)]:z-30',
    'peer-autofill:top-0 peer-autofill:-translate-y-1/2 peer-autofill:text-xs peer-autofill:font-medium',
    'peer-autofill:px-1 peer-autofill:rounded-md peer-autofill:bg-[hsl(var(--bg-primary))]',
  ].join(' '),
  
  sizes: {
    sm: 'left-3',
    default: 'left-4',
    lg: 'left-5',
  },
  
  withIcon: {
    sm: 'left-10 peer-focus:left-3 peer-[:not(:placeholder-shown)]:left-3',
    default: 'left-12 peer-focus:left-4 peer-[:not(:placeholder-shown)]:left-4',
    lg: 'left-13 peer-focus:left-5 peer-[:not(:placeholder-shown)]:left-5',
  },
  
  required: 'after:content-["*"] after:ml-0.5 after:text-[hsl(var(--color-error))]',
  validated: 'after:content-["*"] after:ml-0.5 after:text-[hsl(var(--color-success))]',
  validatedCheck: 'before:content-["✓"] before:mr-1.5 before:text-[hsl(var(--color-success))]',
  error: [
    'text-[hsl(var(--color-error))]!',
    'peer-focus:text-[hsl(var(--color-error))]!',
    'after:text-[hsl(var(--color-error))]!',
  ].join(' '),
}

export const labelStyles = {
  base: 'text-sm font-medium text-[hsl(var(--text-primary))] leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
  required: 'after:content-["*"] after:ml-0.5 after:text-[hsl(var(--color-success))]',
  error: 'text-[hsl(var(--color-error))]',
}

export const errorStyles = {
  base: 'text-[10px] font-medium text-[hsl(var(--color-error))]',
  inline: 'absolute left-4 bottom-0 translate-y-1/2 z-10 bg-[hsl(var(--bg-primary))] px-1',
  container: 'flex items-center justify-end gap-1 mt-2',
  icon: 'h-3 w-3',
  animation: 'animate-in fade-in duration-200',
}

export const validatedStyles = {
  base: 'text-[10px] font-medium text-[hsl(var(--color-success))]',
  inline: 'absolute bottom-1.5 right-3 z-10',
  container: 'flex items-center justify-end gap-1 mt-2',
  icon: 'h-3 w-3',
  animation: 'animate-in fade-in duration-200',
}

export const helperStyles = {
  base: 'text-xs text-[hsl(var(--text-muted))] mt-2',
}

export const formFieldStyles = {
  container: 'space-y-2',
  inline: 'flex items-center gap-3',
  grid: 'grid gap-4',
}

export const inputVariants = {
  default: [
    inputStyles.base,
    inputStyles.border,
    inputStyles.focus,
    inputStyles.hover,
    'bg-[hsl(var(--bg-primary))] dark:bg-[hsl(var(--bg-primary))]/50',
    inputStyles.sizes.default,
  ].join(' '),

  ghost: [
    inputStyles.base,
    'border border-transparent',
    'bg-transparent',
    'hover:bg-[hsl(var(--bg-secondary))] hover:border-[hsl(var(--border))]',
    'focus:bg-[hsl(var(--bg-primary))] focus:border-[hsl(var(--ring))]',
    inputStyles.focus,
    inputStyles.sizes.default,
  ].join(' '),

  filled: [
    inputStyles.base,
    'border border-transparent',
    'bg-[hsl(var(--bg-secondary))]',
    'hover:bg-[hsl(var(--bg-tertiary))]',
    'focus:bg-[hsl(var(--bg-primary))] focus:border-[hsl(var(--ring))]',
    inputStyles.focus,
    inputStyles.sizes.default,
  ].join(' '),
}

export const getInputClasses = (
  variant: 'default' | 'ghost' | 'filled' = 'default',
  size: 'sm' | 'default' | 'lg' = 'default',
  state: 'default' | 'error' | 'success' = 'default'
): string => {
  const baseVariant = inputVariants[variant] || inputVariants.default
  const sizeClass = inputStyles.sizes[size] || inputStyles.sizes.default
  
  let stateClasses = ''
  if (state === 'error') {
    stateClasses = inputStyles.error
  } else if (state === 'success') {
    stateClasses = inputStyles.success
  }
  
  return `${baseVariant} ${sizeClass} ${stateClasses}`.replace(inputStyles.sizes.default, '')
}

/**
 * Textarea component styles.
 */
export const textareaStyles = {
  base: [
    inputStyles.base,
    inputStyles.border,
    inputStyles.focus,
    inputStyles.hover,
    'min-h-[80px] py-3',
  ].join(' '),
}

/**
 * Select component styles.
 */
export const selectStyles = {
  trigger: [
    inputStyles.base,
    inputStyles.border,
    inputStyles.focus,
    inputStyles.hover,
    'justify-between',
    inputStyles.sizes.default,
  ].join(' '),
}

export default inputStyles
