import { describe, it, expect, beforeEach } from 'vitest'
import { useToolWindowStore } from './tool-window'

describe('useToolWindowStore', () => {
    beforeEach(() => {
        useToolWindowStore.persist.clearStorage()
        useToolWindowStore.setState({
            windows: {
                'emoji': { id: 'emoji', isOpen: false, isPinned: false, position: { x: 100, y: 100 }, size: { width: 320, height: 400 }, zIndex: 1, aspectRatio: 320 / 400 },
                'calculator': { id: 'calculator', isOpen: false, isPinned: false, position: { x: 150, y: 150 }, size: { width: 300, height: 450 }, zIndex: 1, aspectRatio: 300 / 450 },
                'unit-converter': { id: 'unit-converter', isOpen: false, isPinned: false, position: { x: 200, y: 200 }, size: { width: 400, height: 300 }, zIndex: 1, aspectRatio: 400 / 300 },
                'color-converter': { id: 'color-converter', isOpen: false, isPinned: false, position: { x: 250, y: 250 }, size: { width: 400, height: 350 }, zIndex: 1, aspectRatio: 400 / 350 },
                'password-gen': { id: 'password-gen', isOpen: false, isPinned: false, position: { x: 300, y: 300 }, size: { width: 350, height: 300 }, zIndex: 1, aspectRatio: 350 / 300 },
                'uuid-gen': { id: 'uuid-gen', isOpen: false, isPinned: false, position: { x: 350, y: 350 }, size: { width: 400, height: 250 }, zIndex: 1, aspectRatio: 400 / 250 },
                'lorem-ipsum': { id: 'lorem-ipsum', isOpen: false, isPinned: false, position: { x: 400, y: 400 }, size: { width: 600, height: 400 }, zIndex: 1, aspectRatio: 600 / 400 },
                'stopwatch': { id: 'stopwatch', isOpen: false, isPinned: false, position: { x: 450, y: 450 }, size: { width: 300, height: 250 }, zIndex: 1, aspectRatio: 300 / 250 },
                'text-case': { id: 'text-case', isOpen: false, isPinned: false, position: { x: 500, y: 500 }, size: { width: 500, height: 350 }, zIndex: 1, aspectRatio: 500 / 350 },
                'aspect-ratio': { id: 'aspect-ratio', isOpen: false, isPinned: false, position: { x: 550, y: 550 }, size: { width: 350, height: 400 }, zIndex: 1, aspectRatio: 350 / 400 },
            },
            activeWindow: null,
            focusedWindow: null,
            nextZIndex: 100,
        })
    })

    describe('initial state', () => {
        it('should have all tool windows closed by default', () => {
            const { windows } = useToolWindowStore.getState()
            Object.values(windows).forEach(window => {
                expect(window.isOpen).toBe(false)
            })
        })

        it('should have no active window initially', () => {
            const { activeWindow } = useToolWindowStore.getState()
            expect(activeWindow).toBeNull()
        })

        it('should have no focused window initially', () => {
            const { focusedWindow } = useToolWindowStore.getState()
            expect(focusedWindow).toBeNull()
        })

        it('should have default positions for all windows', () => {
            const { windows } = useToolWindowStore.getState()
            expect(windows['emoji'].position).toEqual({ x: 100, y: 100 })
            expect(windows['calculator'].position).toEqual({ x: 150, y: 150 })
        })

        it('should have default sizes for all windows', () => {
            const { windows } = useToolWindowStore.getState()
            expect(windows['emoji'].size).toEqual({ width: 320, height: 400 })
            expect(windows['calculator'].size).toEqual({ width: 300, height: 450 })
        })
    })

    describe('openWindow', () => {
        it('should open a window and set it as active', () => {
            useToolWindowStore.getState().openWindow('emoji')
            const { windows, activeWindow } = useToolWindowStore.getState()
            
            expect(windows['emoji'].isOpen).toBe(true)
            expect(activeWindow).toBe('emoji')
        })

        it('should increment zIndex when opening window', () => {
            const { nextZIndex: initialZIndex } = useToolWindowStore.getState()
            useToolWindowStore.getState().openWindow('emoji')
            const { nextZIndex: newZIndex } = useToolWindowStore.getState()
            
            expect(newZIndex).toBe(initialZIndex + 1)
        })

        it('should set highlightTrigger when opening', () => {
            useToolWindowStore.getState().openWindow('emoji')
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].highlightTrigger).toBeDefined()
            expect(windows['emoji'].highlightTrigger).toBeGreaterThan(0)
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })
    })

    describe('closeWindow', () => {
        it('should close a window', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().closeWindow('emoji')
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].isOpen).toBe(false)
        })

        it('should clear focused window when closing the focused one', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().closeWindow('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBeNull()
        })

        it('should not clear focused window when closing a different window', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().openWindow('calculator')
            useToolWindowStore.getState().closeWindow('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('calculator')
        })
    })

    describe('togglePin', () => {
        it('should pin an unpinned window', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().togglePin('emoji')
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].isPinned).toBe(true)
        })

        it('should unpin a pinned window', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().togglePin('emoji')
            useToolWindowStore.getState().togglePin('emoji')
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].isPinned).toBe(false)
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().togglePin('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })
    })

    describe('bringToFront', () => {
        it('should bring window to front', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().openWindow('calculator')
            const emojiZIndex1 = useToolWindowStore.getState().windows['emoji'].zIndex
            
            useToolWindowStore.getState().bringToFront('emoji')
            const emojiZIndex2 = useToolWindowStore.getState().windows['emoji'].zIndex
            
            expect(emojiZIndex2).toBeGreaterThan(emojiZIndex1)
        })

        it('should set window as active', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().openWindow('calculator')
            useToolWindowStore.getState().bringToFront('emoji')
            const { activeWindow } = useToolWindowStore.getState()
            
            expect(activeWindow).toBe('emoji')
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().openWindow('calculator')
            useToolWindowStore.getState().bringToFront('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })

        it('should increment zIndex', () => {
            const { nextZIndex: initialZIndex } = useToolWindowStore.getState()
            useToolWindowStore.getState().bringToFront('emoji')
            const { nextZIndex: newZIndex } = useToolWindowStore.getState()
            
            expect(newZIndex).toBe(initialZIndex + 1)
        })
    })

    describe('triggerHighlight', () => {
        it('should update highlightTrigger timestamp', () => {
            useToolWindowStore.getState().openWindow('emoji')
            const initialTrigger = useToolWindowStore.getState().windows['emoji'].highlightTrigger
            
            // Wait a bit to ensure timestamp difference
            setTimeout(() => {
                useToolWindowStore.getState().triggerHighlight('emoji')
                const newTrigger = useToolWindowStore.getState().windows['emoji'].highlightTrigger
                
                if (initialTrigger && newTrigger) {
                    expect(newTrigger).toBeGreaterThan(initialTrigger)
                }
            }, 10)
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().triggerHighlight('emoji')
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })
    })

    describe('updatePosition', () => {
        it('should update window position', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().updatePosition('emoji', { x: 500, y: 500 })
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].position).toEqual({ x: 500, y: 500 })
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().updatePosition('emoji', { x: 500, y: 500 })
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })
    })

    describe('updateSize', () => {
        it('should update window size', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().updateSize('emoji', { width: 400, height: 500 })
            const { windows } = useToolWindowStore.getState()
            
            expect(windows['emoji'].size).toEqual({ width: 400, height: 500 })
        })

        it('should set window as focused', () => {
            useToolWindowStore.getState().openWindow('emoji')
            useToolWindowStore.getState().updateSize('emoji', { width: 400, height: 500 })
            const { focusedWindow } = useToolWindowStore.getState()
            
            expect(focusedWindow).toBe('emoji')
        })
    })

})
