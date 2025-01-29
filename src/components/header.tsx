import { Icon } from '@iconify/react'
import { Badge, Flex, Heading, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { useOnline } from '@uiw/react-use-online'

import { useToggleSidebarActive } from '../context/sidebar-active'
import { Settings } from './settings'

export const Header = () => {
  const isOnline = useOnline()
  const toggleSidebarActive = useToggleSidebarActive()

  const badgeColor = isOnline ? 'green' : 'red'
  const badgeText = isOnline ? 'Online' : 'Offline'

  return (
    <Flex align="center" direction="row" gap="4" p="2">
      <IconButton
        className="md:rt-r-display-none" // magic
        color="gray"
        data-test-id="toggle-sidebar-active"
        onClick={() => toggleSidebarActive()}
        variant="ghost"
      >
        <Icon icon="heroicons:bars-3" />
      </IconButton>
      <Flex align="center">
        <Text>moe</Text>
        <Heading size="3">TALK</Heading>
      </Flex>
      <Badge color={badgeColor}>
        {badgeText}
      </Badge>
      <Flex align="center" gap="4" style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginLeft: 'auto', marginTop: 'auto' }}>
        <Tooltip content="GitHub">
          <IconButton asChild color="gray" variant="ghost">
            <a data-test-id="github" href="https://github.com/moeru-ai/talk" rel="noreferrer noopener" target="_blank">
              <Icon icon="simple-icons:github" />
            </a>
          </IconButton>
        </Tooltip>
        <Settings />
      </Flex>
    </Flex>
  )
}
