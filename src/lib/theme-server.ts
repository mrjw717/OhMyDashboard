// Backwards compatibility shim – theme helpers now live in infrastructure layer
export {
  DARK_MODE_COOKIE,
  THEME_COOKIE,
  generateThemeCSS,
  getThemeFromCookies,
} from '@/infrastructure/theme/server'
