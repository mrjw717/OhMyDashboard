import { Theme } from './types'
import { redTheme } from './corecolors/red'
import { orangeTheme } from './corecolors/orange'
import { yellowTheme } from './corecolors/yellow'
import { limeTheme } from './corecolors/lime'
import { greenTheme } from './corecolors/green'
import { emeraldTheme } from './corecolors/emerald'
import { cyanTheme } from './corecolors/cyan'
import { blueTheme } from './corecolors/blue'
import { indigoTheme } from './corecolors/indigo'
import { violetTheme } from './corecolors/violet'
import { fuchsiaTheme } from './corecolors/fuchsia'
import { pinkTheme } from './corecolors/pink'
import { roseTheme } from './corecolors/rose'
import { slateTheme } from './corecolors/slate'
import { stoneTheme } from './corecolors/stone'
import { neutralTheme } from './corecolors/neutral'

/**
 * All available themes for the application.
 */
export const themes: Theme[] = [
  redTheme,
  orangeTheme,
  yellowTheme,
  limeTheme,
  greenTheme,
  emeraldTheme,
  cyanTheme,
  blueTheme,
  indigoTheme,
  violetTheme,
  fuchsiaTheme,
  pinkTheme,
  roseTheme,
  slateTheme,
  stoneTheme,
  neutralTheme,
]

/**
 * Default theme for the application.
 */
export const defaultTheme = neutralTheme

/**
 * Gets a theme by its name.
 * 
 * @param name - The name of the theme to find
 * @returns The theme if found, undefined otherwise
 */
export function getThemeByName(name: string): Theme | undefined {
  return themes.find((theme) => theme.name === name)
}
