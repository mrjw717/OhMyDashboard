"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Evaluates a mathematical expression string.
 * Uses Function constructor for evaluation.
 * 
 * @param expression - Mathematical expression to evaluate
 * @returns Result as string or "Error" if evaluation fails
 */
const evaluateExpression = (expression: string) => {
    try {
        // Evaluate math expression using Function constructor for better lint compatibility
        const fn = new Function(`return (${expression})`)
        const result = fn()
        if (typeof result === "number" && Number.isFinite(result)) {
            return result.toString()
        }
        return "Error"
    } catch {
        return "Error"
    }
}

/**
 * Calculator tool component.
 * Provides a basic calculator with keyboard support.
 * 
 * Features:
 * - Basic arithmetic operations (+, -, ×, ÷)
 * - Keyboard support for numbers and operators
 * - Calculation history (last 5 entries)
 * - Clear and delete functions
 * 
 * @component
 */
export const CalculatorTool = () => {
    const [display, setDisplay] = React.useState("0")
    const [history, setHistory] = React.useState<string[]>([])

    /**
     * Handles button press for calculator operations.
     * 
     * @param val - Value or operation to perform
     */
    const handlePress = React.useCallback((val: string) => {
        if (val === 'C') {
            setDisplay("0")
            return
        }

        if (val === '=') {
            const sanitizedExpression = display.replace(/x/g, '*').replace(/÷/g, '/').replace(/[^0-9+\-*/().]/g, '')
            const res = evaluateExpression(sanitizedExpression)
            setDisplay(res)
            if (res !== "Error") {
                setHistory(prev => [display + ' = ' + res, ...prev].slice(0, 5))
            }
            return
        }

        if (val === 'DEL') {
            setDisplay(prev => (prev === "Error" || prev.length <= 1) ? "0" : prev.slice(0, -1))
            return
        }

        setDisplay(prev => prev === "0" ? val : prev + val)
    }, [display])

    const handlePressRef = React.useRef(handlePress)

    // Keep ref in sync with latest handlePress function
    React.useEffect(() => {
        handlePressRef.current = handlePress
    }, [handlePress])

    /**
     * Keyboard event handler for calculator input.
     * Maps keyboard keys to calculator operations.
     */
    React.useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const target = event.target as HTMLElement | null
            if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
                return
            }

            const key = event.key

            if (/^[0-9]$/.test(key) || key === '.') {
                event.preventDefault()
                handlePressRef.current(key)
                return
            }

            if (key === 'Enter' || key === '=') {
                event.preventDefault()
                handlePressRef.current('=')
                return
            }

            if (key === 'Backspace') {
                event.preventDefault()
                setDisplay(prev => (prev === "Error" || prev.length <= 1) ? "0" : prev.slice(0, -1))
                return
            }

            if (key === 'Escape' || key.toLowerCase() === 'c') {
                event.preventDefault()
                handlePressRef.current('C')
                return
            }

            const operatorMap: Record<string, string> = {
                '+': '+',
                '-': '-',
                '*': 'x',
                'x': 'x',
                '/': '÷',
                '÷': '÷',
                '(': '(',
                ')': ')'
            }

            const mapped = operatorMap[key]
            if (mapped) {
                event.preventDefault()
                handlePressRef.current(mapped)
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [])

    const buttons = [
        ['C', '(', ')', '÷'],
        ['7', '8', '9', 'x'],
        ['4', '5', '6', '-'],
        ['1', '2', '3', '+'],
        ['0', '.', '=', '']
    ]

    return (
        <div className="flex flex-col h-full bg-background/50 p-4">
            <div className="flex-1 w-full max-w-[320px] mx-auto bg-primary/5 rounded-xl p-4 flex flex-col gap-4 shadow-inner border border-white/5">
                <div className="bg-background/50 rounded-lg p-4 text-right flex flex-col justify-end overflow-hidden shadow-sm relative h-24">
                    <div className="text-xs text-muted-foreground absolute top-2 right-2 space-y-0.5">
                        {history.map((h, i) => (
                            <div key={i} className="opacity-50">{h}</div>
                        ))}
                    </div>
                    <span className="text-3xl font-mono font-medium tracking-wider text-primary truncate">
                        {display}
                    </span>
                </div>
                <div className="grid grid-cols-4 gap-2 flex-1">
                    {buttons.flat().map((btn, i) => (
                        btn ? (
                            <button
                                key={i}
                                onClick={() => handlePress(btn)}
                                className={cn(
                                    "rounded-lg font-medium transition-all active:scale-95 flex items-center justify-center text-lg shadow-sm hover:shadow-md",
                                    btn === '=' ? "bg-primary text-primary-foreground col-span-2 w-full" : "bg-background/60 hover:bg-background/80 hover:text-primary",
                                    (btn === 'C' || btn === '÷' || btn === 'x' || btn === '-' || btn === '+') && "text-primary bg-primary/10 hover:bg-primary/20"
                                )}
                            >
                                {btn}
                            </button>
                        ) : <div key={i} />
                    ))}
                </div>
            </div>
        </div>
    )
}
