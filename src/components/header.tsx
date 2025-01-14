import { Icon } from '@iconify/react'
import { Flex, Heading, IconButton, Text } from '@radix-ui/themes'

import { Settings } from './settings'

export const Header = () => (
  <Flex align="center" direction="row" p="2">
    <Text>moe</Text>
    <Heading size="3">TALK</Heading>
    <Flex align="center" gap="4" style={{ alignSelf: 'flex-end', marginBottom: 'auto', marginLeft: 'auto', marginTop: 'auto' }}>
      <IconButton color="gray" onClick={() => window.open('https://github.com/moeru-ai/talk')} variant="ghost">
        <Icon icon="simple-icons:github" />
      </IconButton>
      <Settings />
    </Flex>
  </Flex>
)
