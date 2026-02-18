"use client"

import * as React from "react"
import { motion, useMotionValue, useSpring, useTransform, useAnimationFrame, AnimatePresence, MotionValue } from "framer-motion"
import { useToolWindowStore, type ToolType } from "@/stores"
import { getToolMetadata } from "@/config/tools"
import { IconMoodSmile, IconCalculator, IconRefresh, IconLock, IconKey, IconFileText, IconClock, IconTextResize, IconRuler, IconGripVertical } from "@tabler/icons-react"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"

const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
    IconMoodSmile,
    IconCalculator,
    IconRefresh,
    IconLock,
    IconKey,
    IconFileText,
    IconClock,
    IconTextResize,
    IconRuler,
    IconGripVertical,
}

interface DockItemProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    mouseX: MotionValue<number>
    spring: { mass: number; stiffness: number; damping: number }
    distance: number
    magnification: number
    baseItemSize: number
    label?: string
    labelVisible?: boolean
}

function DockItem({ children, className = "", onClick, mouseX, spring, distance, magnification, baseItemSize, label, labelVisible }: DockItemProps) {
    const ref = React.useRef<HTMLDivElement>(null)
    const hoverValue = useMotionValue(0)
    const pulse = useMotionValue(0)

    const mouseDistance = useTransform(mouseX, (val: number) => {
        const rect = ref.current?.getBoundingClientRect() ?? {
            x: 0,
            width: baseItemSize
        }
        return val - rect.x - baseItemSize / 2
    })

    const targetSize = useTransform(mouseDistance, [-distance, 0, distance], [baseItemSize, magnification, baseItemSize])
    const size = useSpring(targetSize, spring)
    const glowStrength = useTransform(size, (current) => {
        const delta = current - baseItemSize
        const range = Math.max(magnification - baseItemSize, 1)
        return Math.min(1, Math.max(0, delta / range))
    })

    useAnimationFrame((t) => {
        const hoverTarget = hoverValue.get()
        if (!hoverTarget) {
            if (pulse.get() !== 0) {
                pulse.set(0)
            }
            return
        }
        const wave = Math.sin(t / 350)
        pulse.set(wave * hoverTarget)
    })

    const boxShadow = useTransform([glowStrength, pulse], (values) => {
        const [strength = 0, pulseValue = 0] = values as [number, number]
        const pulseFactor = 1 + pulseValue * 0.1
        const ambientBlur = (2 + strength * 6) * pulseFactor
        const ambientOpacity = 0.06 + strength * 0.1
        const glowBlur = (2 + strength * 12) * pulseFactor
        const glowSpread = (0.5 + strength * 2.5) * pulseFactor
        const glowOpacity = 0.12 + strength * 0.28
        return `0 3px ${ambientBlur}px hsl(var(--background) / ${ambientOpacity.toFixed(2)}), 0 0 ${glowBlur}px ${glowSpread}px hsl(var(--primary) / ${glowOpacity.toFixed(2)})`
    })

    return (
        <motion.div
            ref={ref}
            style={{
                width: size,
                height: size,
                boxShadow
            }}
            onHoverStart={() => hoverValue.set(1)}
            onHoverEnd={() => hoverValue.set(0)}
            onFocus={() => hoverValue.set(1)}
            onBlur={() => hoverValue.set(0)}
            onClick={onClick}
            className={`dock-item ${className}`}
            tabIndex={0}
            role="button"
            aria-haspopup="true"
        >
            {children}
            <DockLabel visible={!!label && !!labelVisible}>{label}</DockLabel>
        </motion.div>
    )
}

interface DockLabelProps {
    children: React.ReactNode
    visible: boolean
    className?: string
}

function DockLabel({ children, visible, className }: DockLabelProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: -12 }}
                    exit={{ opacity: 0, y: 0 }}
                    transition={{ duration: 0.18 }}
                    className={`dock-label ${className ?? ""}`}
                    role="tooltip"
                    style={{ x: "-50%" }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    )
}

interface DockIconProps {
    children: React.ReactNode
    className?: string
}

function DockIcon({ children, className = "" }: DockIconProps) {
    return <div className={`dock-icon ${className}`}>{children}</div>
}

interface DockProps {
    className?: string
    spring?: { mass: number; stiffness: number; damping: number }
    magnification?: number
    distance?: number
    panelHeight?: number
    dockHeight?: number
    baseItemSize?: number
}

export function Dock({
    className = "",
    spring = { mass: 0.1, stiffness: 150, damping: 12 },
    magnification = 100,
    distance = 200,
    panelHeight: _panelHeight = 40,
    dockHeight: _dockHeight = 256,
    baseItemSize = 60
}: DockProps) {
    const panelVisibleHeight = _panelHeight || 40
    void _dockHeight
    const { windows, restoreTool, focusTool, incomingDockId, dockFlashId, dockFlashTs } = useToolWindowStore()
    const mouseX = useMotionValue(Infinity)
    const [isPanelActive, setIsPanelActive] = React.useState(false)

    const toolOrder = React.useMemo(() => Object.keys(windows) as ToolType[], [windows])
    const dockItems = React.useMemo(() => {
        return toolOrder.filter((id) => {
            const w = windows[id]
            const isIncoming = incomingDockId === id && !w.minimized
            return (w.minimized && w.isOpen) || isIncoming
        })
    }, [incomingDockId, toolOrder, windows])

    const incomingMeta = React.useMemo(() => (incomingDockId ? getToolMetadata(incomingDockId) : null), [incomingDockId])
    const incomingIcon = React.useMemo(() => {
        if (!incomingMeta) return null
        const IconComponent: React.ComponentType<{ size?: number }> = iconMap[incomingMeta.iconName] || IconGripVertical
        return <IconComponent size={20} />
    }, [incomingMeta])

    if (dockItems.length === 0) {
        return null
    }

    const handleItemClick = (toolId: ToolType) => {
        restoreTool(toolId)
        focusTool(toolId)
    }

    const renderIcon = (toolId: string): React.ReactNode => {
        const meta = getToolMetadata(toolId)
        const IconComponent: React.ComponentType<{ size?: number }> = iconMap[meta.iconName] || IconGripVertical
        return <IconComponent size={20} />
    }

    return (
        <div className="dock-outer">
            <motion.div
                style={{ overflow: "visible", height: panelVisibleHeight }}
                onMouseEnter={() => setIsPanelActive(true)}
                onMouseMove={({ pageX }) => {
                    mouseX.set(pageX)
                }}
                onMouseLeave={() => {
                    mouseX.set(Infinity)
                    setIsPanelActive(false)
                }}
                onFocusCapture={() => setIsPanelActive(true)}
                onBlurCapture={(event) => {
                    if (!(event.currentTarget as HTMLElement).contains(event.relatedTarget as Node)) {
                        setIsPanelActive(false)
                    }
                }}
                className={`dock-panel ${className}`}
                role="toolbar"
                aria-label="Application dock"
            >
                {dockItems.map((id) => {
                    const w = windows[id]
                    const isIncoming = incomingDockId === id && !w.minimized
                    const isFlashing = dockFlashId === id
                    const flashKey = isFlashing ? `${id}-${dockFlashTs ?? 0}` : undefined
                    const meta = getToolMetadata(id)
                    if (isIncoming) {
                        return (
                            <motion.div
                                key={`incoming-${id}`}
                                layout
                                initial={{ opacity: 0, scale: 0.6 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.6 }}
                                transition={{ duration: 0.18, ease: [0.32, 0.02, 0.25, 1] }}
                                className="dock-item dock-item--incoming"
                                data-tool-id={incomingDockId ?? undefined}
                                style={{
                                    width: baseItemSize,
                                    height: baseItemSize,
                                    boxShadow: "0 0 0 3px color-mix(in srgb, var(--color-primary) 40%, transparent), 0 8px 24px rgba(0,0,0,0.25), 0 0 24px color-mix(in srgb, var(--color-primary) 45%, transparent)",
                                    borderColor: "color-mix(in srgb, var(--color-primary) 40%, transparent)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                {incomingIcon}
                            </motion.div>
                        )
                    }
                    return (
                        <Tooltip key={flashKey ?? id} delayDuration={50}>
                            <TooltipTrigger asChild>
                                <DockItem
                                    data-tool-id={id}
                                    onClick={() => handleItemClick(id)}
                                    mouseX={mouseX}
                                    spring={spring}
                                    distance={distance}
                                    magnification={magnification}
                                    baseItemSize={baseItemSize}
                                    className={isFlashing ? "dock-item--flash" : undefined}
                                    label={meta.title}
                                    labelVisible={isPanelActive}
                                >
                                    <DockIcon>{renderIcon(id)}</DockIcon>
                                </DockItem>
                            </TooltipTrigger>
                            <TooltipContent side="top" size="sm" variant="default">
                                {meta.title}
                            </TooltipContent>
                        </Tooltip>
                    )
                })}
            </motion.div>
        </div>
    )
}
