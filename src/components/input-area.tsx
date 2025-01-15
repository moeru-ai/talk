import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, TextArea } from '@radix-ui/themes'

export const InputArea = () => (
  <Flex direction="column" gap="2" style={{ alignSelf: 'flex-end', marginTop: 'auto' }} width="100%">
    <TextArea
      color="gray"
      placeholder="Write a Message..."
      resize="vertical"
      size="3"
      variant="soft"
    />
    <Flex gap="2">
      <IconButton color="gray" disabled variant="soft">
        <Icon icon="heroicons:paper-clip" />
      </IconButton>
      <IconButton color="gray" disabled variant="soft">
        <Icon icon="heroicons:microphone" />
      </IconButton>
      <Button style={{ alignSelf: 'flex-end', marginInlineStart: 'auto' }} variant="soft">
        Send
        <Icon icon="heroicons:paper-airplane" />
      </Button>
    </Flex>
  </Flex>
)
