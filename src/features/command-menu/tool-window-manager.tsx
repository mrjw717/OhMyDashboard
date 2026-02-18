"use client"

import React from "react"
import { createPortal } from "react-dom"
import { useToolWindowStore } from "@/stores"
import { DraggableToolWindow } from "@/features/command-menu/draggable-tool-window"
import { ToolContent } from "@/features/command-menu/tools"

const TOOL_WINDOW_LAYER_ID = "tool-window-layer"

export function ToolWindowManager() {
    const { windows } = useToolWindowStore()
    const [mounted, setMounted] = React.useState(false)
    const [portalElement, setPortalElement] = React.useState<HTMLDivElement | null>(null)

    React.useEffect(() => {
        setMounted(true)

        let layer = document.getElementById(TOOL_WINDOW_LAYER_ID) as HTMLDivElement | null
        let created = false

        const applyLayerStyles = (target: HTMLDivElement) => {
            target.style.position = "fixed"
            target.style.inset = ""
            target.style.left = "0"
            target.style.top = "0"
            target.style.width = "0"
            target.style.height = "0"
            target.style.zIndex = "var(--z-tool-windows, 1200)"
            target.style.overflow = "visible"
            target.style.contain = "layout style"
        }

        if (!layer) {
            layer = document.createElement("div")
            layer.id = TOOL_WINDOW_LAYER_ID
            layer.dataset.layer = "tool-windows"
            applyLayerStyles(layer)
            document.body.appendChild(layer)
            created = true
        } else {
            applyLayerStyles(layer)
        }

        setPortalElement(layer)

        return () => {
            if (created && layer?.parentElement) {
                layer.parentElement.removeChild(layer)
            }
        }
    }, [])

    if (!mounted || !portalElement) return null

    return createPortal(
        <>
            {Object.values(windows).map((window) => (
                <DraggableToolWindow key={window.id} toolId={window.id} title={window.id.replace('-', ' ')}>
                    <ToolContent tool={window.id} context="window" />
                </DraggableToolWindow>
            ))}
        </>,
        portalElement
    )
}
