"use client"

import * as React from "react"
import {
    IconArrowLeftRight,
    IconChefHat,
    IconHistory,
    IconRulerMeasure,
    IconSparkles,
    IconTemperature,
    type Icon as TablerIcon,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type UnitConverterProps = {
    context?: 'menu' | 'window'
}

/**
 * Definition of a unit for conversion.
 * 
 * @property id - Unique identifier for the unit
 * @property label - Human-readable label
 * @property symbol - Unit symbol (e.g., 'm', 'kg')
 * @property ratio - Conversion ratio relative to category base unit
 * @property keywords - Search keywords for smart query
 */
type UnitDefinition = {
    id: string
    label: string
    symbol: string
    ratio?: number // relative to category base
    keywords: string[]
}

/**
 * Category of units that can be converted between each other.
 * 
 * @property id - Unique category identifier
 * @property label - Human-readable category name
 * @property description - Category description
 * @property icon - Icon component for display
 * @property mode - Conversion mode: 'linear' or 'temperature'
 * @property units - Array of unit definitions
 * @property defaults - Default from/to unit selection
 */
type UnitCategory = {
    id: string
    label: string
    description: string
    icon: TablerIcon
    mode: "linear" | "temperature"
    units: UnitDefinition[]
    defaults: { from: string; to: string }
}

/**
 * Available unit categories for conversion.
 * Includes length, temperature, and cooking measurements.
 */
const unitCategories: UnitCategory[] = [
    {
        id: "length",
        label: "Length",
        description: "Distance + travel conversions",
        icon: IconRulerMeasure,
        mode: "linear",
        defaults: { from: "meter", to: "kilometer" },
        units: [
            { id: "millimeter", label: "Millimeters", symbol: "mm", ratio: 0.001, keywords: ["mm", "millimeter", "millimeters"] },
            { id: "centimeter", label: "Centimeters", symbol: "cm", ratio: 0.01, keywords: ["cm", "centimeter", "centimeters"] },
            { id: "meter", label: "Meters", symbol: "m", ratio: 1, keywords: ["m", "meter", "meters", "metre"] },
            { id: "kilometer", label: "Kilometers", symbol: "km", ratio: 1000, keywords: ["km", "kilometer", "kilometers", "kilometre"] },
            { id: "inch", label: "Inches", symbol: "in", ratio: 0.0254, keywords: ["inch", "in", "inches"] },
            { id: "foot", label: "Feet", symbol: "ft", ratio: 0.3048, keywords: ["foot", "feet", "ft"] },
            { id: "mile", label: "Miles", symbol: "mi", ratio: 1609.34, keywords: ["mile", "miles", "mi"] },
        ],
    },
    {
        id: "temperature",
        label: "Temperature",
        description: "Kitchen + weather ready",
        icon: IconTemperature,
        mode: "temperature",
        defaults: { from: "celsius", to: "fahrenheit" },
        units: [
            { id: "celsius", label: "Celsius", symbol: "°C", keywords: ["c", "celsius", "cel"] },
            { id: "fahrenheit", label: "Fahrenheit", symbol: "°F", keywords: ["f", "fahrenheit", "fah"] },
            { id: "kelvin", label: "Kelvin", symbol: "K", keywords: ["k", "kelvin"] },
        ],
    },
    {
        id: "cooking",
        label: "Cooking",
        description: "Recipe + bar conversions",
        icon: IconChefHat,
        mode: "linear",
        defaults: { from: "cup", to: "tablespoon" },
        units: [
            { id: "teaspoon", label: "Teaspoon", symbol: "tsp", ratio: 4.92892, keywords: ["tsp", "teaspoon", "teaspoons"] },
            { id: "tablespoon", label: "Tablespoon", symbol: "tbsp", ratio: 14.7868, keywords: ["tbsp", "tablespoon", "tablespoons"] },
            { id: "fluid_ounce", label: "Fluid Ounce", symbol: "fl oz", ratio: 29.5735, keywords: ["oz", "ounce", "ounces", "floz"] },
            { id: "cup", label: "Cup", symbol: "cup", ratio: 236.588, keywords: ["cup", "cups"] },
            { id: "milliliter", label: "Milliliter", symbol: "mL", ratio: 1, keywords: ["ml", "milliliter", "millilitre"] },
            { id: "liter", label: "Liter", symbol: "L", ratio: 1000, keywords: ["l", "liter", "litre", "liters", "litres"] },
        ],
    },
]

/**
 * Entry in conversion history.
 * 
 * @property id - Unique entry identifier
 * @property value - Input value
 * @property from - Source unit ID
 * @property to - Target unit ID
 * @property display - Formatted display string
 */
type HistoryEntry = {
    id: string
    value: string
    from: string
    to: string
    display: string
}

/**
 * Formats a number for display with appropriate decimal places.
 * 
 * @param value - Number to format
 * @returns Formatted number string
 */
const formatNumber = (value: number) => {
    if (!Number.isFinite(value)) return "--"
    const absVal = Math.abs(value)
    const decimals = absVal >= 100 ? 2 : absVal >= 1 ? 3 : 4
    return Number(value.toFixed(decimals)).toString()
}

/**
 * Converts a value between linear units using ratio-based conversion.
 * 
 * @param value - Input value
 * @param from - Source unit definition
 * @param to - Target unit definition
 * @returns Converted value or null if invalid
 */
const convertLinear = (value: number, from?: UnitDefinition, to?: UnitDefinition) => {
    if (!from?.ratio || !to?.ratio) return null
    const baseValue = value * from.ratio
    return baseValue / to.ratio
}

/**
 * Converts a value between temperature units.
 * Supports Celsius, Fahrenheit, and Kelvin.
 * 
 * @param value - Input value
 * @param from - Source unit ID
 * @param to - Target unit ID
 * @returns Converted temperature value
 */
const convertTemperature = (value: number, from: string, to: string) => {
    /**
     * Converts a temperature value to Celsius.
     * 
     * @param val - Temperature value
     * @param unit - Source unit ID
     * @returns Temperature in Celsius
     */
    const toCelsius = (val: number, unit: string) => {
        switch (unit) {
            case "fahrenheit":
                return (val - 32) * (5 / 9)
            case "kelvin":
                return val - 273.15
            default:
                return val
        }
    }

    /**
     * Converts a Celsius temperature to another unit.
     * 
     * @param val - Temperature in Celsius
     * @param unit - Target unit ID
     * @returns Converted temperature value
     */
    const fromCelsius = (val: number, unit: string) => {
        switch (unit) {
            case "fahrenheit":
                return val * (9 / 5) + 32
            case "kelvin":
                return val + 273.15
            default:
                return val
        }
    }

    const celsius = toCelsius(value, from)
    return fromCelsius(celsius, to)
}

/**
 * Unit converter tool component.
 * Provides conversion between various measurement units.
 * 
 * Features:
 * - Multiple unit categories (length, temperature, cooking)
 * - Smart query parsing for natural language input
 * - Conversion history tracking
 * - Real-time conversion as you type
 * 
 * @component
 */
export const UnitConverterTool = ({ context = 'window' }: UnitConverterProps) => {
    const isCompact = context === 'menu'
    const containerClasses = cn(
        "h-full",
        isCompact ? "overflow-y-auto pr-1" : "bg-background/50 p-6 rounded-3xl"
    )
    const stackSpacing = isCompact ? "gap-3" : "gap-6"
    const cardSurface = "bg-white/5 rounded-2xl border border-white/5 shadow-lg"
    const smartPlaceholder = isCompact ? "Quick search like “cup to tbsp”" : "Type “cup to tbsp” or “km” to auto-set units"
    const [categoryId, setCategoryId] = React.useState(unitCategories[0].id)
    const [fromUnit, setFromUnit] = React.useState(unitCategories[0].defaults.from)
    const [toUnit, setToUnit] = React.useState(unitCategories[0].defaults.to)
    const [inputValue, setInputValue] = React.useState("1")
    const [smartQuery, setSmartQuery] = React.useState("")
    const [history, setHistory] = React.useState<HistoryEntry[]>([])

    React.useEffect(() => {
        try {
            const raw = localStorage.getItem('unit-converter-history')
            if (raw) {
                const parsed = JSON.parse(raw)
                if (Array.isArray(parsed)) {
                    setHistory(parsed.slice(0, 10))
                }
            }
        } catch (error) {
            console.warn('Failed to restore unit converter history', error)
        }
    }, [])

    React.useEffect(() => {
        try {
            localStorage.setItem('unit-converter-history', JSON.stringify(history))
        } catch (error) {
            console.warn('Failed to persist unit converter history', error)
        }
    }, [history])

    const category = React.useMemo(() => unitCategories.find((cat) => cat.id === categoryId) ?? unitCategories[0], [categoryId])
    const fromMeta = React.useMemo(() => category.units.find((unit) => unit.id === fromUnit) ?? category.units[0], [category, fromUnit])
    const toMeta = React.useMemo(() => category.units.find((unit) => unit.id === toUnit) ?? category.units[1] ?? category.units[0], [category, toUnit])

    React.useEffect(() => {
        setFromUnit(category.defaults.from)
        setToUnit(category.defaults.to)
        setSmartQuery("")
    }, [category])

    const numericValue = React.useMemo(() => parseFloat(inputValue), [inputValue])

    const convertedValue = React.useMemo(() => {
        if (Number.isNaN(numericValue)) return null
        if (category.mode === "temperature") {
            return convertTemperature(numericValue, fromMeta.id, toMeta.id)
        }
        return convertLinear(numericValue, fromMeta, toMeta)
    }, [numericValue, category.mode, fromMeta, toMeta])

    const formattedResult = React.useMemo(() => {
        if (convertedValue === null) return "--"
        return formatNumber(convertedValue)
    }, [convertedValue])

    const normalizeToken = React.useCallback((token: string) => token.toLowerCase().replace(/[^a-z0-9]/g, ""), [])

    const extractUnitsFromSegment = React.useCallback((segment?: string) => {
        if (!segment) return []
        const tokens = segment
            .split(/[^a-z0-9]+/i)
            .map((token) => normalizeToken(token))
            .filter(Boolean)

        const matches: string[] = []
        tokens.forEach((token) => {
            const found = category.units.find((unit) =>
                unit.keywords.some((keyword) => normalizeToken(keyword) === token),
            )
            if (found && !matches.includes(found.id)) {
                matches.push(found.id)
            }
        })
        return matches
    }, [category.units, normalizeToken])

    const handleSmartInputChange = (value: string) => {
        setSmartQuery(value)
        if (!value.trim()) return
        const [fromSegment, toSegment] = value.split(/\bto\b|->|→/i)
        const fromMatches = extractUnitsFromSegment(fromSegment)
        const toMatches = extractUnitsFromSegment(toSegment)

        if (fromMatches[0]) {
            setFromUnit(fromMatches[0])
        }

        if (toMatches[0]) {
            setToUnit(toMatches[0])
        } else if (fromMatches[1]) {
            setToUnit(fromMatches[1])
        }
    }

    const handleSwap = () => {
        setFromUnit(toMeta.id)
        setToUnit(fromMeta.id)
    }

    const handleRecordHistory = () => {
        if (!fromMeta || !toMeta || convertedValue === null || Number.isNaN(convertedValue)) return
        const entry: HistoryEntry = {
            id: `${Date.now()}-${Math.random()}`,
            value: inputValue || "0",
            from: fromMeta.id,
            to: toMeta.id,
            display: `${inputValue || 0} ${fromMeta.symbol} → ${formattedResult} ${toMeta.symbol}`,
        }
        setHistory((prev) => [entry, ...prev.filter((item) => item.display !== entry.display)].slice(0, 10))
    }

    const handleApplyHistory = (entry: HistoryEntry) => {
        setInputValue(entry.value)
        setFromUnit(entry.from)
        setToUnit(entry.to)
    }

    const historyPreview = React.useMemo(() => history.slice(0, 4), [history])

    if (isCompact) {
        return (
            <div className={containerClasses}>
                <div className="flex flex-col gap-3 px-1 pb-1">
                    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 snap-x snap-mandatory">
                        {unitCategories.map((cat) => {
                            const Icon = cat.icon
                            const isActive = cat.id === categoryId
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoryId(cat.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-3 py-2 rounded-xl border transition-all shrink-0 min-w-[150px] text-left snap-center",
                                        isActive
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background/30 text-muted-foreground border-transparent hover:border-white/10",
                                    )}
                                >
                                    <Icon size={16} />
                                    <div className="text-left">
                                        <p className="text-xs font-semibold leading-tight">{cat.label}</p>
                                        <p className="text-[10px] opacity-70 leading-tight">{cat.description}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>

                    <div className="grid gap-3 min-[520px]:grid-cols-2">
                        <div className={cn(cardSurface, "p-3 space-y-3") }>
                            <div className="space-y-1">
                                <label className="text-[12px] font-semibold text-muted-foreground">Value</label>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="w-full bg-background/60 rounded-xl px-3 py-2 text-base font-mono outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/30 transition"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Units</div>
                                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] gap-2 items-center">
                                    <select
                                        value={fromMeta.id}
                                        onChange={(e) => setFromUnit(e.target.value)}
                                        className="w-full appearance-none bg-background/60 rounded-xl px-3 py-2 text-sm font-medium outline-none border border-transparent focus:border-primary/40"
                                    >
                                        {category.units.map((unit) => (
                                            <option key={unit.id} value={unit.id}>
                                                {unit.label} ({unit.symbol})
                                            </option>
                                        ))}
                                    </select>
                                    <button
                                        onClick={handleSwap}
                                        className="h-9 w-9 rounded-full border border-dashed border-white/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition"
                                        aria-label="Swap units"
                                    >
                                        <IconArrowLeftRight size={16} />
                                    </button>
                                    <select
                                        value={toMeta.id}
                                        onChange={(e) => setToUnit(e.target.value)}
                                        className="w-full appearance-none bg-background/60 rounded-xl px-3 py-2 text-sm font-medium outline-none border border-transparent focus:border-primary/40"
                                    >
                                        {category.units.map((unit) => (
                                            <option key={unit.id} value={unit.id}>
                                                {unit.label} ({unit.symbol})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Result</label>
                                <div className="w-full bg-primary/10 rounded-xl px-3 py-2 text-xl font-mono border border-white/5 flex items-center">
                                    {formattedResult} {toMeta.symbol}
                                </div>
                            </div>

                            <div className="flex items-center justify-between gap-3 text-[11px] text-muted-foreground">
                                <span className="truncate max-w-[65%]">
                                    {inputValue || 0} {fromMeta.symbol} ≈ <span className="text-primary font-semibold">{formattedResult}</span> {toMeta.symbol}
                                </span>
                                <button
                                    onClick={handleRecordHistory}
                                    disabled={convertedValue === null || Number.isNaN(convertedValue)}
                                    className="text-[11px] font-semibold uppercase tracking-wide text-primary disabled:text-muted-foreground disabled:cursor-not-allowed"
                                >
                                    Save
                                </button>
                            </div>
                        </div>

                        <div className={cn(cardSurface, "p-3 space-y-2") }>
                            <label className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground">
                                <IconSparkles size={14} /> Smart suggestions
                            </label>
                            <input
                                value={smartQuery}
                                onChange={(e) => handleSmartInputChange(e.target.value)}
                                placeholder={smartPlaceholder}
                                className="w-full bg-background/40 border border-dashed border-white/10 rounded-xl px-3 py-2 text-sm outline-none focus:border-primary/40"
                            />

                            <div className="rounded-2xl border border-white/5 bg-background/30 p-3 space-y-2">
                                <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                                    <span>Recent</span>
                                    {history.length > 0 && (
                                        <button
                                            onClick={() => setHistory([])}
                                            className="text-[10px] uppercase tracking-wide text-primary"
                                        >
                                            Clear
                                        </button>
                                    )}
                                </div>
                                {history.length === 0 ? (
                                    <p className="text-xs text-muted-foreground">No saved conversions.</p>
                                ) : (
                                    <div className="flex flex-col gap-2 max-h-32 overflow-y-auto">
                                        {historyPreview.map((entry) => (
                                            <button
                                                key={entry.id}
                                                onClick={() => handleApplyHistory(entry)}
                                                className="w-full rounded-xl border border-white/10 bg-background/50 px-3 py-2 text-xs font-medium text-left hover:border-primary/40 hover:text-primary transition"
                                            >
                                                {entry.display}
                                            </button>
                                        ))}
                                        {history.length > historyPreview.length && (
                                            <div className="text-[10px] uppercase tracking-wide text-muted-foreground">
                                                +{history.length - historyPreview.length} more in window view
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className={containerClasses}>
            <div className={cn("flex flex-col", "h-full min-h-0", stackSpacing)}>
                {isCompact ? null : (
                    <div className="grid gap-2 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {unitCategories.map((cat) => {
                            const Icon = cat.icon
                            const isActive = cat.id === categoryId
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setCategoryId(cat.id)}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-xl border transition-all text-left",
                                        isActive
                                            ? "bg-primary text-primary-foreground border-primary"
                                            : "bg-background/30 text-muted-foreground border-transparent hover:border-white/10",
                                    )}
                                >
                                    <Icon size={18} />
                                    <div className="text-left">
                                        <p className="text-sm font-semibold">{cat.label}</p>
                                        <p className="text-[11px] opacity-70">{cat.description}</p>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                )}

                <div className={cn(
                    "flex flex-col lg:grid lg:grid-cols-[1.15fr_0.85fr] gap-6 flex-1 min-h-0"
                )}>
                    <div className={cn(cardSurface, "p-6 space-y-6") }>
                        <div className="grid gap-4 lg:grid-cols-[1fr_auto_1fr] items-end">
                            <div className="space-y-3">
                                <div className="space-y-1 text-sm">
                                    <label className="text-muted-foreground font-semibold">Value</label>
                                    <input
                                        type="number"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="w-full bg-background/60 rounded-xl px-4 py-3 font-mono text-2xl outline-none focus:ring-2 focus:ring-primary/30 border border-transparent focus:border-primary/30 transition"
                                    />
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label className="text-muted-foreground font-semibold">From</label>
                                    <div className="relative">
                                        <select
                                            value={fromMeta.id}
                                            onChange={(e) => setFromUnit(e.target.value)}
                                            className="w-full appearance-none bg-background/60 rounded-xl px-4 py-3 font-medium outline-none border border-transparent focus:border-primary/40"
                                        >
                                            {category.units.map((unit) => (
                                                <option key={unit.id} value={unit.id}>
                                                    {unit.label} ({unit.symbol})
                                                </option>
                                            ))}
                                        </select>
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">unit</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleSwap}
                                className="rounded-2xl border border-dashed border-white/10 mx-auto flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition h-16 w-16"
                                title="Swap units"
                            >
                                <IconArrowLeftRight />
                            </button>

                            <div className="space-y-3">
                                <div className="space-y-1 text-sm">
                                    <label className="text-muted-foreground font-semibold">Result</label>
                                    <div className="w-full bg-primary/10 rounded-xl px-4 py-3 font-mono text-2xl border border-white/5 min-h-[56px] flex items-center">
                                        {formattedResult} {toMeta.symbol}
                                    </div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <label className="text-muted-foreground font-semibold">To</label>
                                    <div className="relative">
                                        <select
                                            value={toMeta.id}
                                            onChange={(e) => setToUnit(e.target.value)}
                                            className="w-full appearance-none bg-background/60 rounded-xl px-4 py-3 font-medium outline-none border border-transparent focus:border-primary/40"
                                        >
                                            {category.units.map((unit) => (
                                                <option key={unit.id} value={unit.id}>
                                                    {unit.label} ({unit.symbol})
                                                </option>
                                            ))}
                                        </select>
                                        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">unit</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-[11px] font-semibold tracking-wide uppercase text-muted-foreground">
                                <IconSparkles size={14} /> Smart suggestions
                            </label>
                            <input
                                value={smartQuery}
                                onChange={(e) => handleSmartInputChange(e.target.value)}
                                placeholder={smartPlaceholder}
                                className="w-full bg-background/40 border border-dashed border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-primary/40"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4 h-full min-h-0">
                        <div className={cn(cardSurface, "p-5 space-y-4") }>
                            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Summary</div>
                            <div className="text-base text-muted-foreground">
                                {inputValue || 0} {fromMeta.symbol} ≈ <span className="font-semibold text-primary">{formattedResult}</span> {toMeta.symbol}
                            </div>
                            <button
                                onClick={handleRecordHistory}
                                disabled={convertedValue === null || Number.isNaN(convertedValue)}
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <IconHistory size={16} /> Save to history
                            </button>
                        </div>

                        <div className={cn(
                            cardSurface,
                            "p-5 space-y-4 flex-1 overflow-y-auto min-h-0"
                        ) }>
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-muted-foreground">
                                <span>Recent conversions</span>
                                {history.length > 0 && (
                                    <button
                                        onClick={() => setHistory([])}
                                        className="text-[10px] font-medium tracking-wide uppercase text-primary"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>
                            {history.length === 0 ? (
                                <p className="text-sm text-muted-foreground mt-4">No saved conversions yet. Generate a result and hit “Save to history”.</p>
                            ) : (
                                <div className="mt-2 space-y-2 pr-1 custom-scroll">
                                    {history.map((entry) => (
                                        <button
                                            key={entry.id}
                                            onClick={() => handleApplyHistory(entry)}
                                            className="w-full px-3 py-2 rounded-xl border border-white/10 bg-background/40 text-xs font-medium text-left hover:border-primary/40 hover:text-primary transition"
                                        >
                                            {entry.display}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
