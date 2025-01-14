import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, Text, TextField } from '@radix-ui/themes'

import * as Sheet from './ui/sheet'

export const Settings = () => (
  <Sheet.Root>
    <Sheet.Trigger>
      <IconButton color="gray" variant="ghost">
        <Icon icon="heroicons:adjustments-horizontal" />
      </IconButton>
    </Sheet.Trigger>

    <Sheet.Content>
      <Sheet.Title>Settings</Sheet.Title>
      <Sheet.Description mb="4" size="2">
        Make changes to your profile.
      </Sheet.Description>

      <Flex direction="column" gap="3">
        <label>
          <Text as="div" mb="1" size="2" weight="bold">
            Name
          </Text>
          <TextField.Root
            defaultValue="Freja Johnsen"
            placeholder="Enter your full name"
          />
        </label>
        <label>
          <Text as="div" mb="1" size="2" weight="bold">
            Email
          </Text>
          <TextField.Root
            defaultValue="freja@example.com"
            placeholder="Enter your email"
          />
        </label>
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
