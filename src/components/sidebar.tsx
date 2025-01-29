import { Icon } from '@iconify/react'
import { Avatar, Box, Flex, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'
import { useMatch } from 'react-router-dom'

import { useCharacters } from '../context/characters'
import { useSidebarActive } from '../context/sidebar-active'
import { Link } from '../router'
import { SidebarNewCharacter } from './sidebar-new-character'

export const Sidebar = () => {
  const characters = useCharacters()
  const match = useMatch('/room/:uuid')
  const active = useSidebarActive()

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
          <SidebarNewCharacter />
        </Flex>
      </ScrollArea>
    </Box>
  )
}
