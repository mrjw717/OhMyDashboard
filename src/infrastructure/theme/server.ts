import { cookies } from 'next/headers'

import { THEME_COOKIE, DARK_MODE_COOKIE } from '@/config/constants/cookies'
import { generateCSSVariables } from '@/config/theme/css-generator'
import { defaultTheme, themes } from '@/config/theme/themes'

const validThemeNames = new Set(themes.map(theme => theme.name))

function getThemeByName(name: string) {
  return themes.find(theme => theme.name === name)
}

function isValidTheme(name: string | undefined): name is string {
  return Boolean(name && validThemeNames.has(name))
}

export async function getThemeFromCookies() {
  const cookieStore = await cookies()
  const rawColorScheme = cookieStore.get(THEME_COOKIE)?.value
  const rawDarkMode = cookieStore.get(DARK_MODE_COOKIE)?.value

  const colorScheme = isValidTheme(rawColorScheme) ? rawColorScheme : defaultTheme.name
  const isDark = rawDarkMode === 'dark'

  if (rawColorScheme && !isValidTheme(rawColorScheme)) {
    console.warn(`Invalid theme cookie value: "${rawColorScheme}", falling back to default`)
  }

  const theme = getThemeByName(colorScheme) || defaultTheme

  return {
    theme,
    colorScheme,
    isDark,
    colors: isDark ? theme.dark : theme.light,
  }
}

/**
 * Generate CSS custom property declarations from theme colors.
 * Delegates to the shared css-generator (single source of truth).
 */
export function generateThemeCSS(colors: Record<string, string>): string {
  return generateCSSVariables(colors)
}

export { THEME_COOKIE, DARK_MODE_COOKIE }
