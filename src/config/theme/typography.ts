/**
 * Typography System - Centralized Typography Configuration
 * 
 * This module provides a scalable, consistent typography system for the entire application.
 * Designed to handle 100× scale (10,000+ students, 1,000+ instructors) without redesign.
 * 
 * Features:
 * - Semantic heading hierarchy (h1-h6)
 * - Body text variants (large, base, small, xs)
 * - Muted text variants for secondary content
 * - Currency-specific styling with dark mode support
 * - Badge and link styling
 * - WCAG AA compliant color contrast
 * - Tree-shakeable exports
 * - TypeScript autocomplete support
 * 
 * Usage:
 * ```tsx
 * import { typography } from '@/config/theme/typography'
 * 
 * <h1 className={typography.headings.h1}>Page Title</h1>
 * <p className={typography.body.base}>Body text</p>
 * <span className={typography.currency}>$1,234.56</span>
 * ```
 * 
 * @module typography
 */

/**
 * Heading styles - Use for page titles, section headers, and content hierarchy
 * All headings use semantic sizing and proper line-height for readability
 */
export const headings = {
  /**
   * H1 - Page titles, main headings
   * Uses primary brand color for prominence
   * Font size: 1.875rem (30px) on mobile, 2.25rem (36px) on desktop
   */
  h1: 'text-3xl font-bold text-primary leading-tight tracking-tight',
  
  /**
   * H2 - Section titles, major subsections
   * Uses foreground color for hierarchy
   * Font size: 1.5rem (24px)
   */
  h2: 'text-2xl font-bold text-foreground leading-tight',
  
  /**
   * H3 - Subsection titles, card headers
   * Font size: 1.25rem (20px)
   */
  h3: 'text-xl font-semibold text-foreground leading-snug',
  
  /**
   * H4 - Minor section titles, list headers
   * Font size: 1.125rem (18px)
   */
  h4: 'text-lg font-semibold text-foreground leading-snug',
  
  /**
   * H5 - Small section titles
   * Font size: 1rem (16px)
   */
  h5: 'text-base font-semibold text-foreground',
  
  /**
   * H6 - Smallest heading level
   * Font size: 0.875rem (14px)
   */
  h6: 'text-sm font-semibold text-foreground',
} as const;

/**
 * Body text styles - Use for main content, paragraphs, and descriptions
 * Optimized for readability with proper line-height
 */
export const body = {
  /**
   * Large body text - Use for introductory paragraphs, important content
   * Font size: 1.125rem (18px)
   */
  large: 'text-lg text-foreground leading-relaxed',
  
  /**
   * Base body text - Default for most content
   * Font size: 1rem (16px)
   */
  base: 'text-base text-foreground leading-normal',
  
  /**
   * Small body text - Use for secondary content, captions
   * Font size: 0.875rem (14px)
   */
  small: 'text-sm text-foreground leading-normal',
  
  /**
   * Extra small text - Use for labels, metadata
   * Font size: 0.75rem (12px)
   */
  xs: 'text-xs text-foreground leading-tight',
} as const;

/**
 * Muted text styles - Use for secondary, less prominent content
 * Same sizes as body text but with muted foreground color
 */
export const muted = {
  /**
   * Large muted text
   * Font size: 1.125rem (18px)
   */
  large: 'text-lg text-muted-foreground leading-relaxed',
  
  /**
   * Base muted text - Use for descriptions, helper text
   * Font size: 1rem (16px)
   */
  base: 'text-base text-muted-foreground leading-normal',
  
  /**
   * Small muted text - Use for metadata, timestamps
   * Font size: 0.875rem (14px)
   */
  small: 'text-sm text-muted-foreground leading-normal',
  
  /**
   * Extra small muted text - Use for fine print, labels
   * Font size: 0.75rem (12px)
   */
  xs: 'text-xs text-muted-foreground leading-tight',
} as const;

/**
 * Currency text style - Use for all monetary values
 * Features:
 * - Uses theme success color for positive association
 * - Dark mode support via CSS variables
 * - Tabular numbers for alignment
 * - Semibold weight for emphasis
 * - WCAG AA compliant contrast
 */
export const currency = 'text-[hsl(var(--color-success))] font-semibold tabular-nums' as const;

/**
 * Badge text style - Use for status badges, labels, tags
 * Font size: 0.75rem (12px)
 */
export const badge = 'text-xs font-medium' as const;

/**
 * Link text style - Use for clickable links
 * Features:
 * - Primary color with hover state
 * - Underline offset for better readability
 */
export const link = 'text-primary hover:text-primary/80 underline-offset-4 transition-colors' as const;

/**
 * Label text style - Use for form labels, input labels
 * Font size: 0.875rem (14px)
 */
export const label = 'text-sm font-medium text-foreground' as const;

/**
 * Error text style - Use for error messages, validation feedback
 * Font size: 0.875rem (14px)
 */
export const error = 'text-sm text-destructive font-medium' as const;

/**
 * Success text style - Use for success messages, confirmations
 * Font size: 0.875rem (14px)
 */
export const success = 'text-sm text-[hsl(var(--color-success))] font-medium' as const;

/**
 * Warning text style - Use for warning messages, alerts
 * Font size: 0.875rem (14px)
 */
export const warning = 'text-sm text-[hsl(var(--color-warning))] font-medium' as const;

/**
 * Info text style - Use for informational messages
 * Font size: 0.875rem (14px)
 */
export const info = 'text-sm text-[hsl(var(--color-info))] font-medium' as const;

/**
 * Code text style - Use for inline code, technical content
 * Features:
 * - Monospace font
 * - Subtle background
 * - Proper padding
 */
export const code = 'font-mono text-sm bg-muted px-1.5 py-0.5 rounded' as const;

/**
 * Complete typography configuration object
 * Export this for convenient access to all typography styles
 */
export const typography = {
  headings,
  body,
  muted,
  currency,
  badge,
  link,
  label,
  error,
  success,
  warning,
  info,
  code,
} as const;

/**
 * TypeScript type for typography configuration
 * Provides autocomplete and type safety
 */
export type Typography = typeof typography;

/**
 * TypeScript type for heading keys
 */
export type HeadingKey = keyof typeof headings;

/**
 * TypeScript type for body text keys
 */
export type BodyKey = keyof typeof body;

/**
 * TypeScript type for muted text keys
 */
export type MutedKey = keyof typeof muted;

/**
 * Default export for convenience
 */
export default typography;

