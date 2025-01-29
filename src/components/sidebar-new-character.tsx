import { Icon } from '@iconify/react'
import { Button, Dialog, Flex, IconButton, Separator, TextField, Tooltip } from '@radix-ui/themes'
import { useState } from 'react'
import { FileTrigger } from 'react-aria-components'
import { toast } from 'sonner'
import { v7 } from 'uuid'

import { useUpdateCharacters } from '../context/characters'
import { db } from '../db'
import { charactersTable } from '../db/schema'
import { processAvatarPNG } from '../utils/ccv3/avatar'
import { parseCharacterCardPNG } from '../utils/ccv3/parse'
import { Button as AriaButton } from './aria/button'
import { DropZone } from './aria/drop-zone'

export const SidebarNewCharacter = () => {
  const [open, setOpen] = useState(false)
  const updateCharacters = useUpdateCharacters()

  const handleSelect = async (e: FileList | null) => {
    if (!e)
      return

    const file = e[0]
    // TODO: is-png
    const buffer = await file.arrayBuffer()
    // eslint-disable-next-line @masknet/array-prefer-from
    const png = new Uint8Array(buffer)
    const json = parseCharacterCardPNG(png)

    if (json !== undefined) {
      await db
        .insert(charactersTable)
        .values({
          avatar: await processAvatarPNG(png),
          data: json.data,
          id: v7(),
          name: json.data.name,
        })

      toast.success(`${json.data.name} has been created`)

      void updateCharacters()
    }
  }

  return (
    <Dialog.Root onOpenChange={setOpen} open={open}>
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
              // eslint-disable-next-line @masknet/no-then, ts/no-misused-promises
              onSelect={async e => handleSelect(e).then(() => setOpen(false))}
            >
              <AriaButton>
                <Icon icon="heroicons:document-plus" inline />
                Select file
              </AriaButton>
            </FileTrigger>
          </DropZone>

          <Separator my="3" size="3" />

          <TextField.Root disabled placeholder="f3f2e850-b5d4-11ef-ac7e-96584d5248b2" />
          <Button disabled>
            <Icon icon="heroicons:arrow-down-tray" inline />
            Download from RisuRealm
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
