import { useTheme as useNextTheme } from 'next-themes';
import { useTheme as useColorScheme } from './theme-provider';

/**
 * Custom hook that combines next-themes and color scheme functionality.
 * Provides unified access to theme mode, color scheme, and helper functions.
 */
export function useAppTheme() {
  const { theme, setTheme, systemTheme } = useNextTheme();
  const { colorScheme, setColorScheme, availableThemes, currentTheme } = useColorScheme();

  return {
    // Dark/Light mode
    mode: theme,
    setMode: setTheme,
    systemTheme,
    
    // Color scheme
    colorScheme,
    setColorScheme,
    availableThemes,
    currentTheme,
    
    // Combined theme info
    isDark: theme === 'dark',
    isLight: theme === 'light',
    isSystem: theme === 'system',
    
    // Helper functions
    toggleMode: () => {
      setTheme(theme === 'dark' ? 'light' : 'dark');
    },
    
    setThemeAndScheme: (newMode: string, newScheme: string) => {
      setTheme(newMode);
      setColorScheme(newScheme);
    },
  };
}
