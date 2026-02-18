"use client"

import * as React from "react"
import { ToolType } from "@/stores"
import {
    EmojiPicker,
    CalculatorTool,
    UnitConverterTool,
    PasswordGeneratorTool,
    UUIDGeneratorTool,
    LoremIpsumTool,
    StopwatchTool,
    TextCaseTool,
    AspectRatioTool,
} from "@/features/tools"

interface ToolContentProps {
    tool: ToolType
    context: 'menu' | 'window'
    onClose?: () => void
    externalSearch?: string
}

export const ToolContent = ({ tool, context, onClose, externalSearch }: ToolContentProps) => {
    switch (tool) {
        case 'emoji': return <EmojiPicker
            onSelect={(emoji) => {
                navigator.clipboard.writeText(emoji)
                if (context === 'menu') onClose?.()
            }}
            externalSearch={externalSearch}
            context={context}
        />
        case 'calculator': return <CalculatorTool />
        case 'unit-converter': return <UnitConverterTool />
        case 'password-gen': return <PasswordGeneratorTool />
        case 'uuid-gen': return <UUIDGeneratorTool />
        case 'lorem-ipsum': return <LoremIpsumTool />
        case 'stopwatch': return <StopwatchTool />
        case 'text-case': return <TextCaseTool />
        case 'aspect-ratio': return <AspectRatioTool />
        default: return null
    }
}
