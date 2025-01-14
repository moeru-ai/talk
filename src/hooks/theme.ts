import type { ThemeProps } from '@radix-ui/themes'

import { useLocalStorage } from 'foxact/use-local-storage'

export const useThemeAccentColor = () =>
  useLocalStorage<ThemeProps['accentColor']>(
    'moetalk/theme/accent-color',
    'mint',
  )

export const useThemeAppearance = () =>
  useLocalStorage<'dark' | 'light' | 'system'>(
    'moetalk/theme/appearance',
    'system',
  )

export const useThemeRadius = () =>
  useLocalStorage<ThemeProps['radius']>(
    'moetalk/theme/radius',
    'medium',
  )

export const useThemeScaling = () =>
  useLocalStorage<ThemeProps['scaling']>(
    'moetalk/theme/scaling',
    '100%',
  )

export const useThemePanelBackground = () =>
  useLocalStorage<ThemeProps['panelBackground']>(
    'moetalk/theme/panel-background',
    'translucent',
  )
