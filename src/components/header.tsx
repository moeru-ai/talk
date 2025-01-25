import { Icon } from '@iconify/react'
import { Badge, Flex, Heading, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { useOnline } from '@uiw/react-use-online'

import { Settings } from './settings'

export const Header = () => {
  const isOnline = useOnline()

  const badgeColor = isOnline ? 'green' : 'red'
  const badgeText = isOnline ? 'Online' : 'Offline'

  return (
    <Flex align="center" direction="row" gap="2" p="2">
      <Flex align="center">
        <Text>moe</Text>
        <Heading size="3">TALK</Heading>
      </Flex>
      <Badge color={badgeColor}>
        {badgeText}
      </Badge>
      <Flex align="center" gap="4" style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginLeft: 'auto', marginTop: 'auto' }}>
        <Tooltip content="GitHub">
          <IconButton color="gray" data-test-id="github" onClick={() => window.open('https://github.com/moeru-ai/talk', 'WindowName', 'noopener')} variant="ghost">
            <Icon icon="simple-icons:github" />
          </IconButton>
        </Tooltip>
        <Settings />
      </Flex>
    </Flex>
  )
}
