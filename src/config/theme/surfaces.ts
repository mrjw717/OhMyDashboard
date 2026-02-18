/**
 * Surface System - Elevations and Glassmorphism
 * Provides surface styling utilities for UI elements including cards, popovers, and glassmorphism effects.
 */
export const surfaces = {
    /** Base surface styling */
    base: 'bg-background text-foreground',
    /** Card surface with border and shadow */
    card: 'bg-card text-card-foreground border border-border/50 shadow-sm rounded-lg',
    /** Vibrant card surface with gradient and glow */
    'card-vibrant': 'bg-card text-card-foreground border border-primary/30 bg-gradient-to-br from-card via-card to-primary/15 shadow-lg rounded-2xl relative overflow-hidden after:absolute after:inset-0 after:bg-gradient-to-br after:from-primary/10 after:to-transparent after:pointer-events-none',
    /** Popover surface with border and shadow */
    popover: 'bg-popover text-popover-foreground border border-border shadow-md rounded-md',
    /** Muted surface for subtle content */
    muted: 'bg-muted text-muted-foreground rounded-sm',
    /** Accent surface for highlighted content */
    accent: 'bg-accent text-accent-foreground rounded-sm',
    // Glassmorphism variants
    /** Glass surface with gradient overlay */
    glass: 'bg-background/80 border border-primary/20 shadow-2xl relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/20 before:to-transparent before:pointer-events-none',
    /** Dark glass surface */
    'glass-dark': 'bg-black/90 border border-white/10 shadow-3xl',
    /** Light glass surface */
    'glass-light': 'bg-white/90 border border-primary/20 shadow-xl',
    // Brand Surfaces
    'primary-gradient': 'bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-xl shadow-primary/30',
} as const;

export default surfaces;
