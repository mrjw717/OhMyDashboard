import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import { THEME_COOKIE, DARK_MODE_COOKIE } from '@/config/constants/cookies'
const DEFAULT_THEME = 'neutral'

const validThemes = [
  'neutral', 'red', 'rose', 'orange', 'green', 'blue', 'yellow',
  'violet', 'slate', 'stone', 'indigo', 'cyan', 'lime', 'emerald',
  'fuchsia', 'pink'
]

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const colorScheme = request.cookies.get(THEME_COOKIE)?.value
  const darkMode = request.cookies.get(DARK_MODE_COOKIE)?.value

  if (!colorScheme || !validThemes.includes(colorScheme)) {
    response.cookies.set(THEME_COOKIE, DEFAULT_THEME, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  if (!darkMode) {
    response.cookies.set(DARK_MODE_COOKIE, 'system', {
      path: '/',
      maxAge: 60 * 60 * 24 * 365,
      sameSite: 'lax',
    })
  }

  return response
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
}
