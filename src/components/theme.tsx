import type { PropsWithChildren } from 'react'

import { Theme as RadixTheme, ThemePanel } from '@radix-ui/themes'
import { useColorScheme } from '@uiw/react-use-colorscheme'

import {
  useThemeAccentColor,
  useThemeAppearance,
  useThemePanelBackground,
  useThemeRadius,
  useThemeScaling,
} from '../hooks/use-theme'

export const Theme = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme()

  const [accentColor] = useThemeAccentColor()
  const [themeAppearance] = useThemeAppearance()
  const [panelBackground] = useThemePanelBackground()
  const [radius] = useThemeRadius()
  const [scaling] = useThemeScaling()

  // eslint-disable-next-line sonarjs/no-nested-conditional
  const appearance = themeAppearance === 'system' ? (colorScheme === 'dark' ? 'dark' : 'light') : themeAppearance

  return (
    <RadixTheme
      accentColor={accentColor}
      appearance={appearance}
      panelBackground={panelBackground}
      radius={radius}
      scaling={scaling}
    >
      {children}
      {import.meta.env.DEV && <ThemePanel defaultOpen={false} />}
    </RadixTheme>
  )
}
