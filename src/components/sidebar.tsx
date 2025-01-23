import { Icon } from '@iconify/react'
import { Avatar, Box, Flex, IconButton, ScrollArea, Tooltip } from '@radix-ui/themes'

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
          <IconButton asChild>
            <Avatar color="gray" fallback="Se" size="4" />
          </IconButton>
          {/* <Avatar color="gray" fallback="A" size="4" />
          <Avatar color="gray" fallback="B" size="4" />
          <Avatar color="gray" fallback="C" size="4" />
          <Avatar color="gray" fallback="D" size="4" /> */}
          <Tooltip content="Add a new character" side="right">
            <IconButton size="4" variant="soft">
              <Icon icon="heroicons:plus" width="20" />
            </IconButton>
          </Tooltip>
        </Flex>
      </ScrollArea>
    </Box>
  </Box>
)
