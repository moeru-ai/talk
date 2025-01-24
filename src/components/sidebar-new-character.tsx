import { Icon } from '@iconify/react'
import { Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip } from '@radix-ui/themes'
import { useState } from 'react'
import { FileTrigger } from 'react-aria-components'

import { Button as AriaButton } from './aria/button'
import { DropZone } from './aria/drop-zone'

export const SidebarNewCharacter = () => {
  const [files, setFiles] = useState<string>('')

  return (
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
        <Dialog.Description mb="4" size="2">
          lorem ipsum
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <DropZone>
            <FileTrigger
              acceptedFileTypes={['application/json', 'image/png']}
              onSelect={(e) => {
                if (!e)
                  return

                setFiles(e[0].name)
              }}
            >
              <AriaButton>
                <Icon icon="heroicons:document-plus" inline />
                Select file
              </AriaButton>
            </FileTrigger>
            {files}
          </DropZone>

          <Separator my="3" size="3" />

          <TextField.Root disabled placeholder="f3f2e850-b5d4-11ef-ac7e-96584d5248b2" />
          <Button disabled>
            <Icon icon="heroicons:arrow-down-tray" inline />
            Download from RisuAI Realms
          </Button>
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
}
