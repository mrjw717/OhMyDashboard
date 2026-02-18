/**
 * Button System - Variants and Sizes
 */
export const buttons = {
    variants: {
        primary: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all active:scale-[0.98]',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm transition-all active:scale-[0.98]',
        outline: 'border border-input bg-transparent hover:bg-accent hover:text-accent-foreground transition-all active:scale-[0.98]',
        ghost: 'hover:bg-accent hover:text-accent-foreground transition-all active:scale-[0.98]',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm transition-all active:scale-[0.98]',
        link: 'text-primary underline-offset-4 hover:underline',
        // Custom vibrant variant
        glow: 'bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.5)] hover:shadow-[0_0_25px_hsl(var(--primary)/0.7)] transition-all active:scale-95',
    },
    sizes: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        xs: 'h-7 rounded-sm px-2 text-[10px]',
    },
} as const;

export default buttons;
