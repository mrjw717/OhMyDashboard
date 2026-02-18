"use client"

import * as React from "react"
import {
    IconBolt,
    IconCheck,
    IconCopy,
    IconEye,
    IconEyeOff,
    IconHistory,
    IconRefresh,
    IconShield,
    IconWifi,
} from "@tabler/icons-react"

import { cn } from "@/lib/utils"

type OptionState = {
    uppercase: boolean
    lowercase: boolean
    numbers: boolean
    symbols: boolean
}

type Preset = {
    id: string
    label: string
    description: string
    icon: React.ReactNode
    length: number
    options: OptionState
}

const CHARSETS = {
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    numbers: "0123456789",
    symbols: "!@#$%^&*()_+[]{}?<>",
} as const

const PRESETS: Preset[] = [
    {
        id: "bank",
        label: "Banking",
        description: "Max security, 20 chars",
        icon: <IconShield size={14} />,
        length: 20,
        options: { uppercase: true, lowercase: true, numbers: true, symbols: true },
    },
    {
        id: "wifi",
        label: "Wi‑Fi",
        description: "Letters + numbers",
        icon: <IconWifi size={14} />,
        length: 16,
        options: { uppercase: true, lowercase: true, numbers: true, symbols: false },
    },
    {
        id: "disposable",
        label: "Disposable",
        description: "Quick lower-case",
        icon: <IconBolt size={14} />,
        length: 12,
        options: { uppercase: false, lowercase: true, numbers: false, symbols: false },
    },
]

const calculateEntropy = (len: number, opts: OptionState) => {
    let pool = 0
    if (opts.uppercase) pool += CHARSETS.uppercase.length
    if (opts.lowercase) pool += CHARSETS.lowercase.length
    if (opts.numbers) pool += CHARSETS.numbers.length
    if (opts.symbols) pool += CHARSETS.symbols.length
    if (pool === 0) return 0
    return Math.round(len * Math.log2(pool))
}

const describeEntropy = (bits: number) => {
    if (bits >= 100) return { label: "Bank-worthy", tone: "text-emerald-400", meter: 100 }
    if (bits >= 70) return { label: "Strong", tone: "text-lime-400", meter: 80 }
    if (bits >= 50) return { label: "Okay", tone: "text-amber-400", meter: 60 }
    return { label: "Weak", tone: "text-rose-400", meter: 35 }
}

export const PasswordGeneratorTool = () => {
    const [length, setLength] = React.useState(18)
    const [options, setOptions] = React.useState<OptionState>({ uppercase: true, lowercase: true, numbers: true, symbols: true })
    const [password, setPassword] = React.useState("")
    const [copied, setCopied] = React.useState(false)
    const [hidden, setHidden] = React.useState(false)
    const [history, setHistory] = React.useState<string[]>([])

    const generate = React.useCallback(() => {
        let charset = ""
        Object.entries(options).forEach(([key, enabled]) => {
            if (enabled) charset += CHARSETS[key as keyof typeof CHARSETS]
        })
        if (!charset) charset = CHARSETS.lowercase

        const output: string[] = []
        const randoms = new Uint32Array(length)
        crypto.getRandomValues(randoms)
        for (let i = 0; i < length; i++) {
            output.push(charset[randoms[i] % charset.length])
        }
        const next = output.join("")
        setPassword(next)
        setCopied(false)
        setHistory((prev) => [next, ...prev.filter((entry) => entry !== next)].slice(0, 5))
    }, [length, options])

    React.useEffect(() => {
        generate()
    }, [generate])

    const copy = () => {
        if (!password) return
        navigator.clipboard.writeText(password)
        setCopied(true)
        setTimeout(() => setCopied(false), 1800)
    }

    const entropy = describeEntropy(calculateEntropy(length, options))

    const applyPreset = (preset: Preset) => {
        setLength(preset.length)
        setOptions(preset.options)
    }

    return (
        <div className="h-full w-full bg-background/50 p-4">
            <div className="h-full rounded-2xl border border-white/5 bg-background/70 shadow-inner px-4 py-3 flex flex-col">
                <div className="grid flex-1 min-h-0 gap-6 md:grid-cols-[1.2fr_1fr]">
                    <div className="flex flex-col gap-4 min-h-0">
                        <div className="rounded-2xl border border-white/5 bg-primary/5 p-4 space-y-4">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                <span>Password</span>
                                <button
                                    type="button"
                                    onClick={() => setHidden((prev) => !prev)}
                                    className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-background/60 px-2 py-1 text-[11px] font-semibold"
                                >
                                    {hidden ? <><IconEye size={12} /> Reveal</> : <><IconEyeOff size={12} /> Mask</>}
                                </button>
                            </div>
                            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-background/60 px-4 py-5 font-mono text-xl md:text-2xl">
                                <span className="truncate" title={password}>{hidden ? "••••••••••" : password}</span>
                                <button
                                    type="button"
                                    onClick={copy}
                                    className={cn(
                                        "ml-auto inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wide transition",
                                        copied ? "border-emerald-500/40 text-emerald-400" : "border-white/10 text-muted-foreground hover:border-primary/40 hover:text-primary"
                                    )}
                                >
                                    {copied ? <><IconCheck size={12} /> Copied</> : <><IconCopy size={12} /> Copy</>}
                                </button>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs text-muted-foreground">
                                    <span>{entropy.label}</span>
                                    <span>{calculateEntropy(length, options)} bits</span>
                                </div>
                                <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-white/10">
                                    <div className={cn("h-full rounded-full transition-all", entropy.tone)} style={{ width: `${entropy.meter}%` }} />
                                </div>
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-background/40 p-4 space-y-3">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                <span>Presets</span>
                                <span className="text-[10px] text-muted-foreground/70">Tap to reconfigure</span>
                            </div>
                            <div className="grid gap-2 sm:grid-cols-3">
                                {PRESETS.map((preset) => (
                                    <button
                                        key={preset.id}
                                        type="button"
                                        onClick={() => applyPreset(preset)}
                                        className="rounded-xl border border-white/10 bg-background/60 px-3 py-2 text-left hover:border-primary/40 hover:text-primary transition"
                                    >
                                        <div className="flex items-center gap-2 text-sm font-semibold">
                                            {preset.icon}
                                            {preset.label}
                                        </div>
                                        <p className="text-[11px] text-muted-foreground mt-1">{preset.description}</p>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-2xl border border-white/5 bg-background/40 p-4 flex-1 min-h-0 space-y-3">
                            <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                <span>Recent</span>
                                <IconHistory size={14} className="text-muted-foreground/70" />
                            </div>
                            <div className="flex flex-col gap-2 overflow-y-auto pr-1">
                                {history.length === 0 && <p className="text-xs text-muted-foreground">Generate to capture history.</p>}
                                {history.map((entry) => (
                                    <button
                                        key={entry}
                                        type="button"
                                        onClick={() => { setPassword(entry); setCopied(false) }}
                                        className="w-full truncate rounded-xl border border-white/10 bg-background/60 px-3 py-2 text-left font-mono text-xs hover:border-primary/40"
                                    >
                                        {entry}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-white/5 bg-background/40 p-4 flex flex-col gap-4 min-h-0 overflow-auto">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm font-medium text-muted-foreground">
                                <span>Length</span>
                                <span className="rounded px-2 font-mono text-primary bg-primary/10">{length}</span>
                            </div>
                            <input
                                type="range"
                                min={8}
                                max={64}
                                value={length}
                                onChange={(e) => setLength(parseInt(e.target.value))}
                                className="h-2 w-full rounded-full bg-white/10 accent-primary"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <Toggle label="Uppercase" hint="A‑Z" checked={options.uppercase} onChange={(value) => setOptions((prev) => ({ ...prev, uppercase: value }))} />
                            <Toggle label="Lowercase" hint="a‑z" checked={options.lowercase} onChange={(value) => setOptions((prev) => ({ ...prev, lowercase: value }))} />
                            <Toggle label="Numbers" hint="0‑9" checked={options.numbers} onChange={(value) => setOptions((prev) => ({ ...prev, numbers: value }))} />
                            <Toggle label="Symbols" hint="!@#" checked={options.symbols} onChange={(value) => setOptions((prev) => ({ ...prev, symbols: value }))} />
                        </div>

                        <button
                            type="button"
                            onClick={generate}
                            className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-3 font-semibold text-primary-foreground shadow-lg shadow-primary/30 hover:opacity-95"
                        >
                            <IconRefresh size={18} /> Regenerate
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const Toggle = ({ label, hint, checked, onChange }: { label: string; hint: string; checked: boolean; onChange: (value: boolean) => void }) => (
    <label className="rounded-xl border border-white/10 bg-background/60 px-3 py-2 text-left hover:border-primary/40 cursor-pointer select-none">
        <div className="flex items-center justify-between text-sm font-semibold">
            <span className={checked ? "text-foreground" : "text-muted-foreground"}>{label}</span>
            <button
                type="button"
                onClick={(event) => { event.preventDefault(); onChange(!checked) }}
                className={cn("relative h-5 w-9 rounded-full transition-colors", checked ? "bg-primary" : "bg-white/10")}
            >
                <span className={cn("absolute left-0.5 top-0.5 h-4 w-4 rounded-full bg-background shadow transition-transform", checked && "translate-x-4")} />
            </button>
        </div>
        <span className="text-[11px] text-muted-foreground">{hint}</span>
    </label>
)
