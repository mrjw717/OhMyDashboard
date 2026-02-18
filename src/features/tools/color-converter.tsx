"use client"

import * as React from "react"
import { IconCopy, IconCheck, IconColorPicker, IconAlertTriangle } from "@tabler/icons-react"

import { useAppTheme } from "@/config/theme/use-theme"
import { defaultTheme } from "@/config/theme/themes"
import { hslToRgb } from "@/lib/client-theme"

/**
 * Theme swatch token names for color display.
 * Maps to color tokens in the theme system.
 */
const swatchTokens = [
    "primary",
    "secondary",
    "accent",
    "chart1",
    "chart2",
    "chart3",
    "chart4",
    "chart5",
] as const

/**
 * Converts an HSL string to a hex color code.
 * 
 * @param value - HSL string in format "hsl(h, s%, l%)"
 * @returns Hex color string or null if invalid
 */
const hslStringToHex = (value?: string | null) => {
    if (!value) return null
    const numericParts = value.match(/[\d.]+/g)
    if (!numericParts || numericParts.length < 3) return null

    const [h, s, l] = numericParts.map(Number)
    if ([h, s, l].some((part) => Number.isNaN(part))) return null

    const { r, g, b } = hslToRgb(h, s, l)
    const toHex = (component: number) => component.toString(16).padStart(2, "0")
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/** Default primary hex color from theme */
const DEFAULT_PRIMARY_HEX = hslStringToHex(defaultTheme.light.primary) as string

/**
 * Normalizes a hex color string to a valid 6-digit hex code.
 * Handles 3-digit shorthand and removes invalid characters.
 * 
 * @param value - Hex color string (may be malformed)
 * @returns Normalized 6-digit hex color code
 */
const normalizeHex = (value: string) => {
    if (!value) return DEFAULT_PRIMARY_HEX
    let next = value.trim().replace(/[^0-9a-fA-F]/g, '')
    if (next.length === 3) {
        next = next.split('').map((ch) => ch + ch).join('')
    }
    if (next.length !== 6) {
        return DEFAULT_PRIMARY_HEX
    }
    return `#${next}`
}

/**
 * Converts a hex color string to an RGB object.
 * 
 * @param hex - Hex color string
 * @returns RGB object with r, g, b values (0-255) or null if invalid
 */
const hexToRgbObject = (hex: string) => {
    const normalized = normalizeHex(hex)
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized)
    if (!result) return null
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
    }
}

/**
 * Converts RGB values to HSL color space.
 * 
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns HSL object with h (0-360), s (0-100), l (0-100)
 */
const rgbToHslObject = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const rNorm = r / 255
    const gNorm = g / 255
    const bNorm = b / 255
    const max = Math.max(rNorm, gNorm, bNorm)
    const min = Math.min(rNorm, gNorm, bNorm)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case rNorm:
                h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0)
                break
            case gNorm:
                h = (bNorm - rNorm) / d + 2
                break
            case bNorm:
                h = (rNorm - gNorm) / d + 4
                break
        }
        h /= 6
    }

    return {
        h: Math.round(h * 360),
        s: Math.round(s * 100),
        l: Math.round(l * 100),
    }
}

/**
 * Converts RGB values to a hex string.
 * 
 * @param r - Red component (0-255)
 * @param g - Green component (0-255)
 * @param b - Blue component (0-255)
 * @returns Hex color string
 */
const toHexString = ({ r, g, b }: { r: number; g: number; b: number }) => {
    const toHex = (component: number) => component.toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Formats a hex color string according to the specified mode.
 * 
 * @param hex - Hex color string
 * @param mode - Format mode: 'lower', 'upper', or 'short'
 * @returns Formatted hex color string
 */
const formatHex = (hex: string, mode: 'lower' | 'upper' | 'short') => {
    const normalized = normalizeHex(hex)
    if (mode === 'short') {
        const body = normalized.replace('#', '')
        if (body[0] === body[1] && body[2] === body[3] && body[4] === body[5]) {
            return `#${body[0]}${body[2]}${body[4]}`.toUpperCase()
        }
        return normalized.toUpperCase()
    }
    return mode === 'lower' ? normalized.toLowerCase() : normalized.toUpperCase()
}

/**
 * Calculates the contrast ratio between two hex colors.
 * Follows WCAG 2.1 guidelines for accessibility.
 * 
 * @param hexA - First hex color
 * @param hexB - Second hex color
 * @returns Contrast ratio (1-21) or null if invalid colors
 */
const contrastRatio = (hexA: string, hexB: string) => {
    const rgbA = hexToRgbObject(hexA)
    const rgbB = hexToRgbObject(hexB)
    if (!rgbA || !rgbB) return null

    /**
     * Calculates relative luminance of a color.
     * Used for determining contrast ratios.
     */
    const luminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
        const convert = (channel: number) => {
            const c = channel / 255
            return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
        }
        const R = convert(r)
        const G = convert(g)
        const B = convert(b)
        return 0.2126 * R + 0.7152 * G + 0.0722 * B
    }

    const lumA = luminance(rgbA)
    const lumB = luminance(rgbB)
    const lighter = Math.max(lumA, lumB)
    const darker = Math.min(lumA, lumB)
    return (lighter + 0.05) / (darker + 0.05)
}

export const ColorConverterTool = () => {
    const { currentTheme, isDark } = useAppTheme()
    const palette = (isDark ? currentTheme?.dark : currentTheme?.light) ?? defaultTheme.light
    const derivedPrimaryHex = React.useMemo(() => hslStringToHex(palette.primary) ?? DEFAULT_PRIMARY_HEX, [palette])

    const [hex, setHex] = React.useState(derivedPrimaryHex)
    const [copied, setCopied] = React.useState<string | null>(null)
    const [isEyeDropperSupported, setIsEyeDropperSupported] = React.useState(false)
    const [isPicking, setIsPicking] = React.useState(false)
    const [pickError, setPickError] = React.useState<string | null>(null)
    const [hexFormat, setHexFormat] = React.useState<'upper' | 'lower' | 'short'>('upper')

    React.useEffect(() => {
        setHex(derivedPrimaryHex)
    }, [derivedPrimaryHex])

    React.useEffect(() => {
        if (typeof window !== "undefined" && "EyeDropper" in window) {
            setIsEyeDropperSupported(true)
        }
    }, [])

    const handleHexChange = (val: string) => {
        setHex(val)
    }

    const handleViewportPick = React.useCallback(async () => {
        if (!isEyeDropperSupported || isPicking || typeof window === "undefined") return

        setPickError(null)
        setIsPicking(true)

        try {
            const EyeDropperConstructor = (window as unknown as { EyeDropper?: new () => { open: () => Promise<{ sRGBHex: string }> } }).EyeDropper
            if (!EyeDropperConstructor) {
                setPickError("Your browser doesn't support the EyeDropper API.")
                return
            }

            const eyeDropper = new EyeDropperConstructor()
            const { sRGBHex } = await eyeDropper.open()
            if (sRGBHex) {
                setHex(sRGBHex)
            }
        } catch (error) {
            const abortError = error as DOMException
            if (abortError?.name !== "AbortError") {
                setPickError("Couldn't pick color. Please try again.")
                console.error("EyeDropper error", error)
            }
        } finally {
            setIsPicking(false)
        }
    }, [isEyeDropperSupported, isPicking])

    const safeHex = React.useMemo(() => normalizeHex(hex), [hex])
    const rgbObject = React.useMemo(() => hexToRgbObject(hex), [hex])
    const hslObject = React.useMemo(() => (rgbObject ? rgbToHslObject(rgbObject) : null), [rgbObject])
    const formattedHex = React.useMemo(() => formatHex(hex, hexFormat), [hex, hexFormat])

    const rgbString = rgbObject ? `rgb(${rgbObject.r}, ${rgbObject.g}, ${rgbObject.b})` : "Invalid"
    const hslString = hslObject ? `hsl(${hslObject.h}°, ${hslObject.s}%, ${hslObject.l}%)` : "Invalid"

    const copyToClipboard = (text: string | null, type: string) => {
        if (!text || text === "Invalid") return
        navigator.clipboard.writeText(text)
        setCopied(type)
        setTimeout(() => setCopied(null), 2000)
    }

    const derivedHarmony = React.useMemo(() => {
        if (!hslObject) return []
        const clamp = (val: number, min = 0, max = 100) => Math.max(min, Math.min(max, val))
        const wrapHue = (val: number) => (val % 360 + 360) % 360
        const create = (label: string, adjustments: { h?: number; l?: number }) => {
            const nextHue = wrapHue((hslObject?.h ?? 0) + (adjustments.h ?? 0))
            const nextLight = clamp((hslObject?.l ?? 0) + (adjustments.l ?? 0))
            const nextSat = clamp(hslObject?.s ?? 0)
            const { r, g, b } = hslToRgb(nextHue, nextSat, nextLight)
            return {
                label,
                hex: toHexString({ r, g, b }),
            }
        }

        return [
            { label: "Base", hex: safeHex },
            create("Analogous +30°", { h: 30 }),
            create("Analogous -30°", { h: -30 }),
            create("Complement", { h: 180 }),
            create("Tint", { l: 15 }),
            create("Shade", { l: -15 }),
        ]
    }, [hslObject, safeHex])

    const contrastMeta = React.useMemo(() => {
        const againstWhite = contrastRatio(safeHex, "#ffffff")
        const againstBlack = contrastRatio(safeHex, "#000000")
        const describe = (value: number | null) => {
            if (!value) return { label: "--", tone: "text-muted-foreground", badge: "Unknown" }
            if (value >= 7) return { label: `${value.toFixed(2)}:1`, tone: "text-emerald-400", badge: "AAA" }
            if (value >= 4.5) return { label: `${value.toFixed(2)}:1`, tone: "text-emerald-400", badge: "AA" }
            if (value >= 3) return { label: `${value.toFixed(2)}:1`, tone: "text-amber-400", badge: "AA Large" }
            return { label: `${value.toFixed(2)}:1`, tone: "text-rose-400", badge: "Fail" }
        }
        return [
            { name: "On White", ratio: describe(againstWhite), swatch: "#ffffff" },
            { name: "On Black", ratio: describe(againstBlack), swatch: "#000000" },
        ]
    }, [safeHex])

    const swatches = React.useMemo(() => {
        return swatchTokens
            .map((token) => {
                const value = palette[token]
                const swatchHex = hslStringToHex(value)
                if (!swatchHex) return null
                return { label: token, hex: swatchHex }
            })
            .filter(Boolean) as { label: string; hex: string }[]
    }, [palette])

    return (
        <div className="p-6 flex flex-col gap-6 max-w-2xl mx-auto h-full bg-background/50 justify-center">
            <div className="flex flex-col gap-4">
                <div className="flex gap-6 items-start">
                    <div
                        className="h-32 w-32 rounded-2xl shadow-lg border shrink-0 transition-all duration-300"
                        style={{
                            backgroundColor: safeHex,
                            borderColor: "hsl(var(--border) / 0.4)",
                            boxShadow: `0 8px 32px -8px ${safeHex}66`,
                        }}
                    />
                    <div className="flex-1 space-y-4">
                        <div className="space-y-1.5 group">
                            <label className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold ml-1">Base HEX</label>
                            <div className="relative">
                                <input
                                    value={hex}
                                    onChange={(e) => handleHexChange(e.target.value)}
                                    className="w-full bg-primary/5 rounded-lg px-3 py-2.5 font-mono text-sm outline-none focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-primary/10 transition-all"
                                />
                                <div
                                    className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 rounded opacity-20"
                                    style={{ backgroundColor: safeHex }}
                                />
                            </div>
                            <button
                                type="button"
                                onClick={handleViewportPick}
                                disabled={!isEyeDropperSupported || isPicking}
                                className="mt-2 inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wide px-3 py-1.5 rounded-full border border-dashed border-primary/40 text-primary/80 hover:text-primary transition disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <IconColorPicker size={14} />
                                {isPicking ? "Picking…" : "Pick from screen"}
                            </button>
                            {pickError && (
                                <p className="flex items-center gap-1 text-[11px] text-amber-500 mt-1">
                                    <IconAlertTriangle size={12} />
                                    {pickError}
                                </p>
                            )}
                        </div>

                        <ColorValue
                            label="HEX"
                            value={formattedHex}
                            onCopy={() => copyToClipboard(formattedHex, 'hex')}
                            copied={copied === 'hex'}
                            accessory={
                                <select
                                    value={hexFormat}
                                    onChange={(e) => setHexFormat(e.target.value as 'upper' | 'lower' | 'short')}
                                    className="bg-background/30 border border-white/10 rounded-full px-3 py-1 text-[11px] uppercase font-semibold tracking-wide"
                                >
                                    <option value="upper">#FFFFFF</option>
                                    <option value="lower">#ffffff</option>
                                    <option value="short">#FFF</option>
                                </select>
                            }
                        />
                        <ColorValue label="RGB" value={rgbString} onCopy={() => copyToClipboard(rgbString, 'rgb')} copied={copied === 'rgb'} />
                        <ColorValue label="HSL" value={hslString} onCopy={() => copyToClipboard(hslString, 'hsl')} copied={copied === 'hsl'} />
                    </div>
                </div>
            </div>

            {!isEyeDropperSupported && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground/80 bg-background/40 border border-dashed border-muted/30 rounded-lg px-3 py-2">
                    <IconAlertTriangle size={14} />
                    Screen color picker needs a Chromium browser (Chrome/Edge 96+) to work.
                </div>
            )}

            {derivedHarmony.length > 0 && (
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Harmony palette</p>
                    <div className="grid gap-2 sm:grid-cols-3">
                        {derivedHarmony.map((tone) => (
                            <button
                                key={tone.label}
                                onClick={() => setHex(tone.hex)}
                                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-background/40 p-3 hover:border-primary/40 transition"
                            >
                                <div
                                    className="h-10 w-10 rounded-xl shadow-inner border"
                                    style={{ backgroundColor: tone.hex, borderColor: "hsl(var(--border) / 0.4)" }}
                                />
                                <div className="text-left">
                                    <p className="text-sm font-medium">{tone.label}</p>
                                    <p className="text-xs text-muted-foreground font-mono">{tone.hex}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Contrast checks</p>
                <div className="grid gap-3 sm:grid-cols-2">
                    {contrastMeta.map((item) => (
                        <div key={item.name} className="rounded-2xl border border-white/10 bg-background/40 p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold">{item.name}</span>
                                    <span
                                        className="h-4 w-4 rounded-full border"
                                        style={{ backgroundColor: item.swatch, borderColor: "hsl(var(--border) / 0.4)" }}
                                    />
                                </div>
                                <span className={`text-xs font-mono ${item.ratio.tone}`}>{item.ratio.label}</span>
                            </div>
                            <span className={`inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wide px-3 py-1 rounded-full ${item.ratio.badge === 'Fail' ? 'bg-rose-500/10 text-rose-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                                {item.ratio.badge}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Theme tokens</p>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
                    {swatches.map((swatch) => (
                        <button
                            key={swatch.label}
                            onClick={() => setHex(swatch.hex)}
                            className="w-full aspect-square rounded-full border hover:scale-110 transition-transform"
                            style={{
                                backgroundColor: swatch.hex,
                                borderColor: "hsl(var(--border) / 0.4)",
                            }}
                            title={swatch.label}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const ColorValue = ({
    label,
    value,
    onCopy,
    copied,
    accessory,
}: {
    label: string
    value: string
    onCopy: () => void
    copied: boolean
    accessory?: React.ReactNode
}) => (
    <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
            <span>{label}</span>
            {accessory}
        </div>
        <div className="w-full bg-primary/5 rounded-lg px-3 py-2.5 flex items-center justify-between gap-2 border border-transparent">
            <span className="font-mono text-sm text-foreground/80 break-all">{value}</span>
            <button
                type="button"
                onClick={onCopy}
                className="inline-flex items-center justify-center rounded-full bg-background/40 border border-white/10 h-8 w-8 text-muted-foreground hover:text-primary hover:border-primary/40"
                aria-label={`Copy ${label}`}
            >
                {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
        </div>
    </div>
)
