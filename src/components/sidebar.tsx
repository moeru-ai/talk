import { Icon } from '@iconify/react'
import { Box, Flex, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'

import { SidebarCharacters } from './sidebar-characters'
import { SidebarNewCharacter } from './sidebar-new-character'

export const Sidebar = () => (
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
            <IconButton size="4" variant="soft">
              <Icon icon="heroicons:information-circle" width="20" />
            </IconButton>
          </Tooltip>
          <SidebarCharacters />
          <SidebarNewCharacter />
        </Flex>
      </ScrollArea>
    </Box>
  </Box>
)
