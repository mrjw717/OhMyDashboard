"use client"

import * as React from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ScrollToTopProps {
    scrollContainerId?: string
}

export function ScrollToTop({ scrollContainerId }: ScrollToTopProps) {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            // If a container ID is provided, use that element, otherwise window
            const scrollY = scrollContainerId
                ? document.getElementById(scrollContainerId)?.scrollTop || 0
                : window.scrollY

            if (scrollY > 300) {
                setIsVisible(true)
            } else {
                setIsVisible(false)
            }
        }

        const container = scrollContainerId
            ? document.getElementById(scrollContainerId)
            : window

        if (container) {
            container.addEventListener("scroll", handleScroll)
        }

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll)
            }
        }
    }, [scrollContainerId])

    const scrollToTop = () => {
        if (scrollContainerId) {
            const container = document.getElementById(scrollContainerId)
            container?.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        } else {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            })
        }
    }

    return (
        <Button
            variant="outline"
            size="icon"
            className={cn(
                "fixed bottom-8 right-8 z-50 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
            )}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <ArrowUp className="h-5 w-5" />
        </Button>
    )
}
