import { Icon } from '@iconify/react'
import { Avatar, Box, Flex, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'
import { useMatch } from 'react-router-dom'
import { toast } from 'sonner'
import { v7 } from 'uuid'

import { useCharacters, useUpdateCharacters } from '../context/characters'
import { useSidebarActive } from '../context/sidebar-active'
import { db } from '../db'
import { charactersTable } from '../db/schema'
import { Link } from '../router'
import { processAvatarPNG } from '../utils/ccv3/avatar'
import { parseCharacterCardPNG } from '../utils/ccv3/parse'
import { SidebarNewCharacter } from './sidebar-new-character'

export const Sidebar = () => {
  const characters = useCharacters()
  const updateCharacters = useUpdateCharacters()
  const match = useMatch('/room/:uuid')
  const active = useSidebarActive()

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

  const isActive = (uuid: string) =>
    match?.params.uuid === uuid
      ? {
          outlineColor: 'var(--accent-7)',
          outlineOffset: 2,
          outlineStyle: 'solid',
          outlineWidth: 2,
        }
      : {}

  return (
    <Box
      display={{ initial: active ? 'block' : 'none', md: 'block' }}
      height="100vh"
      style={{ backgroundColor: 'var(--gray-2)' }}
    >
      <ScrollArea>
        <Flex direction="column" gap="3" p="3">
          <Tooltip content="Welcome" side="right">
            <Link to="/" viewTransition>
              <IconButton size="4" variant="soft">
                <Icon icon="heroicons:information-circle" width="20" />
              </IconButton>
            </Link>
          </Tooltip>
          {characters.map(character => (
            <Tooltip content={character.name} key={character.id} side="right">
              <Link params={{ uuid: character.id }} to="/room/:uuid" viewTransition>
                <IconButton asChild style={isActive(character.id)}>
                  <Avatar fallback={character.name.slice(0, 2)} size="4" src={character.avatar ?? undefined} />
                </IconButton>
              </Link>
            </Tooltip>
          ))}
          <SidebarNewCharacter handleSelect={handleSelect} />
        </Flex>
      </ScrollArea>
    </Box>
  )
}
