"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
// import { toast } from "sonner" // Optional: if you want to show a toast

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
    value: string
    label?: string
}

export function CopyButton({
    value,
    label = "Copy",
    className,
    variant = "ghost",
    size = "icon",
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }, [hasCopied])

    const copyToClipboard = React.useCallback((value: string) => {
        navigator.clipboard.writeText(value)
        setHasCopied(true)
        // toast.success("Copied to clipboard")
    }, [])

    return (
        <Button
            size={size}
            variant={variant}
            className={cn(
                "relative z-10 h-6 w-6 text-primary-foreground hover:bg-primary/80 hover:text-primary-foreground [&_svg]:h-3 [&_svg]:w-3",
                className
            )}
            onClick={() => copyToClipboard(value)}
            {...props}
        >
            <span className="sr-only">{label}</span>
            {hasCopied ? <Check /> : <Copy />}
        </Button>
    )
}
