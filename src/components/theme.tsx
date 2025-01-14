import type { PropsWithChildren } from 'react'

import { Theme as RadixTheme, ThemePanel } from '@radix-ui/themes'
import { useColorScheme } from '@uiw/react-use-colorscheme'

import {
  useThemeAccentColor,
  useThemeAppearance,
  useThemePanelBackground,
  useThemeRadius,
  useThemeScaling,
} from '../hooks/theme'

export const Theme = ({ children }: PropsWithChildren) => {
  const colorScheme = useColorScheme()

  const [accentColor] = useThemeAccentColor()
  const [appearance] = useThemeAppearance()
  const [panelBackground] = useThemePanelBackground()
  const [radius] = useThemeRadius()
  const [scaling] = useThemeScaling()

  return (
    <RadixTheme
      accentColor={accentColor}
      appearance={appearance === 'system' ? (colorScheme === 'dark' ? 'dark' : 'light') : appearance}
      panelBackground={panelBackground}
      radius={radius}
      scaling={scaling}
    >
      {children}
      {import.meta.env.DEV && <ThemePanel defaultOpen={false} />}
    </RadixTheme>
  )
}
