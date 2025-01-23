import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, Separator, Tooltip } from '@radix-ui/themes'

import { SettingsChat } from './settings/settings-chat'
import { SettingsTheme } from './settings/settings-theme'
import * as Sheet from './ui/sheet'

export const Settings = () => (
  <Sheet.Root>
    <Tooltip content="Settings">
      <Sheet.Trigger>
        <IconButton color="gray" variant="ghost">
          <Icon icon="heroicons:adjustments-horizontal" />
        </IconButton>
      </Sheet.Trigger>
    </Tooltip>

    <Sheet.Content>
      <Flex direction="column" gap="3">
        <SettingsChat />
        <Separator my="3" size="4" />
        <SettingsTheme />
      </Flex>

      <Flex gap="3" justify="end" mt="4">
        <Sheet.Close>
          <Button color="gray" variant="soft">
            Cancel
          </Button>
        </Sheet.Close>
        <Sheet.Close>
          <Button>Save</Button>
        </Sheet.Close>
      </Flex>
    </Sheet.Content>
  </Sheet.Root>
)
