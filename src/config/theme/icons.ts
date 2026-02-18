export const consoleTokens = {
    // Base sizes
    buttonSize: '2.5rem', // 40px
    iconSize: '1.25rem', // 20px

    // Animation scales
    hoverScale: 1.1,
    activeScale: 1.2,
} as const

export type ConsoleIconConfig = typeof consoleTokens
