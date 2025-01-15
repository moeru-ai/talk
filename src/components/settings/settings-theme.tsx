import { Icon } from '@iconify/react'
import { SegmentedControl, Text } from '@radix-ui/themes'

import { useThemeAppearance } from '../../hooks/use-theme'
import * as Sheet from '../ui/sheet'

export const SettingsTheme = () => {
  const [themeAppearance, setThemeAppearance] = useThemeAppearance()

  return (
    <>
      <Sheet.Title>Theme</Sheet.Title>
      {/* <Sheet.Description mb="4" size="2">
        Connect to your LLM API.
      </Sheet.Description> */}

      <label>
        <Text as="div" mb="1" weight="bold">
          Appearance
        </Text>
        <SegmentedControl.Root
          defaultValue={themeAppearance}
          onValueChange={value => setThemeAppearance(value as 'dark' | 'light' | 'system')}
          style={{ width: '100%' }}
        >
          <SegmentedControl.Item value="light">
            <Icon icon="heroicons:sun" inline />
            Light
          </SegmentedControl.Item>
          <SegmentedControl.Item value="dark">
            <Icon icon="heroicons:moon" inline />
            Dark
          </SegmentedControl.Item>
          <SegmentedControl.Item value="system">
            <Icon icon="heroicons:computer-desktop" inline />
            System
          </SegmentedControl.Item>
        </SegmentedControl.Root>
      </label>
    </>
  )
}
