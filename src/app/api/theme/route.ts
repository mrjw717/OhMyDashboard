import { NextRequest, NextResponse } from 'next/server'
import { THEME_COOKIE } from '@/infrastructure/theme'

/**
 * Set of valid theme names.
 */
const validThemes = new Set([
  'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',
  'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',
  'fuchsia', 'pink'
])

/**
 * Validates if a theme name is in the set of valid themes.
 */
function isValidTheme(name: string): boolean {
  return validThemes.has(name)
}

/**
 * POST handler for theme API route.
 * Accepts a color scheme and validates it before setting the theme cookie.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { colorScheme } = body
    
    if (!colorScheme || typeof colorScheme !== 'string') {
      return NextResponse.json(
        { success: false, error: 'colorScheme is required' },
        { status: 400 }
      )
    }
    
    if (!isValidTheme(colorScheme)) {
      return NextResponse.json(
        { success: false, error: `Invalid theme: ${colorScheme}` },
        { status: 400 }
      )
    }
    
    const response = NextResponse.json({ success: true })
    response.cookies.set(THEME_COOKIE, colorScheme, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
    
    return response
  } catch (e) {
    console.error('Theme API error:', e)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({
    validThemes: Array.from(validThemes)
  })
}
