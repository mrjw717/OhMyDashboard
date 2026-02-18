export interface ToolMetadata {
    id: string
    title: string
    iconName: string
    description?: string
}

export const toolRegistry: Record<string, ToolMetadata> = {
    'emoji': {
        id: 'emoji',
        title: 'Emoji Picker',
        iconName: 'IconMoodSmile',
        description: 'Browse and insert emojis'
    },
    'calculator': {
        id: 'calculator',
        title: 'Calculator',
        iconName: 'IconCalculator',
        description: 'Perform calculations'
    },
    'unit-converter': {
        id: 'unit-converter',
        title: 'Unit Converter',
        iconName: 'IconRefresh',
        description: 'Convert between units'
    },
    'password-gen': {
        id: 'password-gen',
        title: 'Password Generator',
        iconName: 'IconLock',
        description: 'Generate secure passwords'
    },
    'uuid-gen': {
        id: 'uuid-gen',
        title: 'UUID Generator',
        iconName: 'IconKey',
        description: 'Generate unique identifiers'
    },
    'lorem-ipsum': {
        id: 'lorem-ipsum',
        title: 'Lorem Ipsum',
        iconName: 'IconFileText',
        description: 'Generate placeholder text'
    },
    'stopwatch': {
        id: 'stopwatch',
        title: 'Stopwatch',
        iconName: 'IconClock',
        description: 'Time tracking'
    },
    'text-case': {
        id: 'text-case',
        title: 'Text Case',
        iconName: 'IconTextResize',
        description: 'Transform text case'
    },
    'aspect-ratio': {
        id: 'aspect-ratio',
        title: 'Aspect Ratio',
        iconName: 'IconRuler',
        description: 'Calculate aspect ratios'
    }
}

export function getToolMetadata(toolId: string): ToolMetadata {
    return toolRegistry[toolId] || {
        id: toolId,
        title: toolId,
        iconName: 'IconGripVertical',
        description: ''
    }
}
