import { CSS_VARIABLE_NAMES } from '@/config/theme/css-generator'
import { defaultTheme, themes } from '@/config/theme/themes'

const THEME_STORAGE_KEY = 'color-scheme'
const DARK_MODE_STORAGE_KEY = 'theme'

function generateThemeDataForScript(): string {
  const themeData: Record<string, { light: Record<string, string>; dark: Record<string, string> }> = {}

  for (const theme of themes) {
    themeData[theme.name] = {
      light: theme.light as unknown as Record<string, string>,
      dark: theme.dark as unknown as Record<string, string>,
    }
  }

  return JSON.stringify(themeData)
}

export function getThemeInitScript(): string {
  const themeData = generateThemeDataForScript()
  const defaultThemeName = defaultTheme.name
  const cssVarNames = JSON.stringify(CSS_VARIABLE_NAMES)

  return `
(function() {
  try {
    var THEME_DATA = ${themeData};
    var DEFAULT_THEME = '${defaultThemeName}';
    var CSS_VAR_NAMES = ${cssVarNames};
    var COLOR_SCHEME_KEY = '${THEME_STORAGE_KEY}';
    var DARK_MODE_KEY = '${DARK_MODE_STORAGE_KEY}';
    
    var colorScheme = localStorage.getItem(COLOR_SCHEME_KEY) || DEFAULT_THEME;
    var darkModeRaw = localStorage.getItem(DARK_MODE_KEY);
    var isDark = darkModeRaw === 'dark' || (darkModeRaw === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    var theme = THEME_DATA[colorScheme];
    if (!theme) {
      theme = THEME_DATA[DEFAULT_THEME];
      colorScheme = DEFAULT_THEME;
    }
    
    var colors = isDark ? theme.dark : theme.light;
    var root = document.documentElement;
    
    var styleTag = document.getElementById('theme-inline');
    var cssVars = [];
    
    for (var i = 0; i < CSS_VAR_NAMES.length; i++) {
      var varName = CSS_VAR_NAMES[i];
      var camelKey = varName.replace(/-([a-z0-9])/g, function(match, letter) {
        return letter.toUpperCase();
      });
      var value = colors[camelKey];
      if (value !== undefined) {
        root.style.setProperty('--' + varName, value);
        cssVars.push('--' + varName + ':' + value);
      }
    }
    
    if (styleTag) {
      styleTag.textContent = ':root{' + cssVars.join(';') + '}';
    }
    
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    root.setAttribute('data-theme-initialized', 'true');
    root.setAttribute('data-color-scheme', colorScheme);
  } catch (e) {
    console.warn('Theme initialization failed:', e);
  }
})();
`.trim()
}

export function getThemeColorsForScheme(schemeName: string, isDark: boolean): string {
  const theme = themes.find(theme => theme.name === schemeName) || defaultTheme
  const colors = isDark ? theme.dark : theme.light

  const vars = CSS_VARIABLE_NAMES.map(varName => {
    const camelKey = varName.replace(/-([a-z0-9])/g, (_, letter) => letter.toUpperCase())
    const value = (colors as unknown as Record<string, string>)[camelKey]
    return `--${varName}: ${value}`
  })

  return vars.join(';')
}
