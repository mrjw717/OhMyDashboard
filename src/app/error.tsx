"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { IconAlertTriangle } from "@tabler/icons-react"

/**
 * Error page component.
 * Displays an error message with options to retry or return home.
 */
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 text-center">
            <div className="rounded-full bg-destructive/10 p-4">
                <IconAlertTriangle className="h-12 w-12 text-destructive" />
            </div>
            <h2 className="text-3xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-[500px]">
                We apologize for the inconvenience. An unexpected error has occurred.
                Please try again or contact support if the problem persists.
            </p>
            <div className="mt-4 flex gap-2">
                <Button onClick={() => reset()} variant="default">
                    Try again
                </Button>
                <Button onClick={() => window.location.href = "/"} variant="outline">
                    Return Home
                </Button>
            </div>
        </div>
    )
}
