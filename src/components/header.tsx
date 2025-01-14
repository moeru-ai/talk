import { Icon } from '@iconify/react'
import { Flex, Heading, IconButton, Text } from '@radix-ui/themes'

export const Header = () => (
  <Flex align="center" direction="row">
    <Text>moe</Text>
    <Heading size="3">TALK</Heading>
    <Flex gap="4" style={{ alignSelf: 'flex-end', marginInlineStart: 'auto' }}>
      <IconButton color="gray" onClick={() => window.open('https://github.com/moeru-ai/talk')} variant="ghost">
        <Icon icon="simple-icons:github" />
      </IconButton>
      <IconButton color="gray" variant="ghost">
        <Icon icon="heroicons:adjustments-horizontal" />
      </IconButton>
    </Flex>
  </Flex>
)
