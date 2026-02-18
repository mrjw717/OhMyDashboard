import { ImageResponse } from 'next/og'

import { defaultTheme, themes } from '@/config/theme/themes'

export const runtime = 'edge'

// Image metadata
export const alt = 'OhMyDashboard! — Immersive Next.js Workspace'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

type ImageProps = {
    searchParams?: {
        theme?: string
        mode?: 'light' | 'dark'
        title?: string
        subtitle?: string
    }
}

const themeMap = new Map(themes.map(theme => [theme.name, theme]))

export default async function Image({ searchParams }: ImageProps = {}) {
    const requestedTheme = searchParams?.theme
    const requestedMode = searchParams?.mode === 'light' ? 'light' : 'dark'
    const theme = (requestedTheme && themeMap.get(requestedTheme)) || defaultTheme
    const palette = theme[requestedMode]

    const heading = searchParams?.title ?? 'OhMyDashboard!'
    const subheading = searchParams?.subtitle ?? 'Premium Next.js dashboard workspace'

    return new ImageResponse(
        (
            <div
                style={{
                    background: `linear-gradient(to bottom right, hsl(${palette.gradientBg1}), hsl(${palette.gradientBg2}))`,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'Geist, sans-serif',
                    color: `hsl(${palette.foreground})`,
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                    }}
                >
                    <svg
                        width="80"
                        height="80"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={`hsl(${palette.primary})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4" />
                        <path d="M12 8h.01" />
                    </svg>
                </div>
                <div style={{ fontSize: 60, fontWeight: 'bold', marginBottom: 20 }}>
                    {heading}
                </div>
                <div style={{ fontSize: 30, opacity: 0.85 }}>
                    {subheading}
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
