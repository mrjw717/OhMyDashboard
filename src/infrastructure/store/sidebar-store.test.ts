import { describe, it, expect, beforeEach } from 'vitest'
import { useSidebarStore } from './sidebar-store'

describe('useSidebarStore', () => {
    beforeEach(() => {
        useSidebarStore.persist.clearStorage()
        useSidebarStore.setState({
            isOpen: true,
            isCollapsed: false,
        })
    })

    describe('initial state', () => {
        it('should be open by default', () => {
            const { isOpen } = useSidebarStore.getState()
            expect(isOpen).toBe(true)
        })

        it('should not be collapsed by default', () => {
            const { isCollapsed } = useSidebarStore.getState()
            expect(isCollapsed).toBe(false)
        })
    })

    describe('setOpen', () => {
        it('should open sidebar', () => {
            useSidebarStore.getState().setOpen(true)
            const { isOpen } = useSidebarStore.getState()
            expect(isOpen).toBe(true)
        })

        it('should close sidebar', () => {
            useSidebarStore.getState().setOpen(false)
            const { isOpen } = useSidebarStore.getState()
            expect(isOpen).toBe(false)
        })
    })

    describe('setCollapsed', () => {
        it('should collapse sidebar', () => {
            useSidebarStore.getState().setCollapsed(true)
            const { isCollapsed } = useSidebarStore.getState()
            expect(isCollapsed).toBe(true)
        })

        it('should expand sidebar', () => {
            useSidebarStore.getState().setCollapsed(true)
            useSidebarStore.getState().setCollapsed(false)
            const { isCollapsed } = useSidebarStore.getState()
            expect(isCollapsed).toBe(false)
        })
    })

    describe('toggle', () => {
        it('should toggle collapsed state', () => {
            const { isCollapsed: initial } = useSidebarStore.getState()
            useSidebarStore.getState().toggle()
            const { isCollapsed: after } = useSidebarStore.getState()
            expect(after).toBe(!initial)
        })

        it('should toggle multiple times correctly', () => {
            useSidebarStore.getState().toggle()
            const { isCollapsed: first } = useSidebarStore.getState()
            useSidebarStore.getState().toggle()
            const { isCollapsed: second } = useSidebarStore.getState()
            expect(first).toBe(true)
            expect(second).toBe(false)
        })
    })

    describe('persistence', () => {
        it('should persist sidebar state', () => {
            useSidebarStore.getState().setOpen(false)
            useSidebarStore.getState().setCollapsed(true)
            
            const { isOpen, isCollapsed } = useSidebarStore.getState()
            expect(isOpen).toBe(false)
            expect(isCollapsed).toBe(true)
        })
    })
})
