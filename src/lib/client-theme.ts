"use client"

/**
 * Gets the HSL values of a CSS variable.
 * Expects the variable to contain space-separated HSL values (e.g. "220 70% 50%")
 */
export function getThemeColorValue(variableName: string): string {
    if (typeof window === "undefined") return "0 0% 0%"
    const style = getComputedStyle(document.documentElement)
    const name = variableName.startsWith("--") ? variableName : `--${variableName}`
    const value = style.getPropertyValue(name).trim()
    return value || "0 0% 0%"
}

/**
 * Parses HSL string ("220 70% 50%") into RGB object {r,g,b}
 * Approximation for canvas manipulation
 */
export function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
    s /= 100
    l /= 100
    const k = (n: number) => (n + h / 30) % 12
    const a = s * Math.min(l, 1 - l)
    const f = (n: number) =>
        l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)))
    return {
        r: Math.round(255 * f(0)),
        g: Math.round(255 * f(8)),
        b: Math.round(255 * f(4)),
    }
}

export function getTokenRgb(token: string): { r: number; g: number; b: number } {
    const hslString = getThemeColorValue(token)
    const [h, s, l] = hslString.split(" ").map((v) => parseFloat(v))
    return hslToRgb(h || 0, s || 0, l || 0)
}
