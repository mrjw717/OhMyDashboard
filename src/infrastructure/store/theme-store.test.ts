import { describe, it, expect, beforeEach } from 'vitest'
import { useThemeStore } from './theme-store'

describe('useThemeStore', () => {
    beforeEach(() => {
        useThemeStore.persist.clearStorage()
        useThemeStore.setState({
            colorScheme: 'neutral',
        })
    })

    describe('initial state', () => {
        it('should have neutral color scheme by default', () => {
            const { colorScheme } = useThemeStore.getState()
            expect(colorScheme).toBe('neutral')
        })
    })

    describe('setColorScheme', () => {
        it('should change color scheme', () => {
            useThemeStore.getState().setColorScheme('red')
            const { colorScheme } = useThemeStore.getState()
            expect(colorScheme).toBe('red')
        })

        it('should persist color scheme', () => {
            useThemeStore.getState().setColorScheme('blue')
            const { colorScheme } = useThemeStore.getState()
            expect(colorScheme).toBe('blue')
        })
    })

    describe('persistence', () => {
        it('should persist color scheme across store instances', () => {
            useThemeStore.getState().setColorScheme('violet')
            const { colorScheme: persistedScheme } = useThemeStore.getState()
            expect(persistedScheme).toBe('violet')
        })
    })
})
