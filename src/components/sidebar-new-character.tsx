import { Icon } from '@iconify/react'
import { Button, Dialog, Flex, IconButton, Tooltip } from '@radix-ui/themes'

export const SidebarNewCharacter = () => (
  <Dialog.Root>
    <Tooltip content="Add a new character" side="right">
      <Dialog.Trigger>
        <IconButton size="4" variant="soft">
          <Icon icon="heroicons:plus" width="20" />
        </IconButton>
      </Dialog.Trigger>
    </Tooltip>

    <Dialog.Content maxWidth="450px">
      <Dialog.Title>Add Character</Dialog.Title>
      {/* <Dialog.Description mb="4" size="2">
        Make changes to your profile.
      </Dialog.Description> */}

      <Flex direction="column" gap="3">
        <Button>Upload File (WIP)</Button>
      </Flex>

      <Flex gap="3" justify="end" mt="4">
        <Dialog.Close>
          <Button color="gray" variant="soft">
            Cancel
          </Button>
        </Dialog.Close>
      </Flex>
    </Dialog.Content>
  </Dialog.Root>
)
