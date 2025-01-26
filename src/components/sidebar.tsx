import { Icon } from '@iconify/react'
import { Avatar, Box, Flex, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'
import { useEffect, useState } from 'react'
import { v7 } from 'uuid'

import { db } from '../db'
import { charactersTable } from '../db/schema'
import { Link } from '../router'
import { processAvatarPNG } from '../utils/ccv3/avatar'
import { parseCharacterCardPNG } from '../utils/ccv3/parse'
import { SidebarNewCharacter } from './sidebar-new-character'

export const Sidebar = () => {
  const [characters, setCharacters] = useState<typeof charactersTable.$inferSelect[]>([])
  const [updateCharacters, setUpdateCharacters] = useState(0)

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

      setUpdateCharacters(updateCharacters + 1)
    }
  }

  useEffect(() => {
    const getCharacters = async () => {
      const characters = await db.select().from(charactersTable)

      setCharacters(characters)
    }

    void getCharacters()

    // return () => setUpdateCharacters(false)
  }, [updateCharacters])

  return (
    <Box display={{ initial: 'none', md: 'block' }}>
      <Box
        bottom="0"
        height="100%"
        left="0"
        position="fixed"
        style={{ backgroundColor: 'var(--gray-2)' }}
        top="0"
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
                  <IconButton asChild>
                    <Avatar color="gray" fallback={character.name.slice(0, 2)} size="4" src={character.avatar ?? undefined} />
                  </IconButton>
                </Link>
              </Tooltip>
            ))}
            <SidebarNewCharacter handleSelect={handleSelect} />
          </Flex>
        </ScrollArea>
      </Box>
    </Box>
  )
}
