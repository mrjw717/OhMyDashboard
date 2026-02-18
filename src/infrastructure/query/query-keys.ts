/**
 * Centralized query key factories.
 *
 * Usage:
 *   queryKeys.theme.all        → ['theme']
 *   queryKeys.user.detail(id)  → ['user', id]
 */
export const queryKeys = {
    theme: {
        all: ['theme'] as const,
    },
    user: {
        all: ['user'] as const,
        detail: (id: string) => ['user', id] as const,
    },
} as const
