import type { Message } from '@xsai/shared-chat'

import { Flex } from '@radix-ui/themes'
import { useEffect } from 'react'

import { Header } from '../components/header'
import { InputArea } from '../components/input-area'
import { Messages } from '../components/messages'
import { useSetMessages } from '../context/messages'

const messages: Message[] = [
  {
    content: 'You\'re a helpful assistant.',
    role: 'system',
  },
  {
    content: [
      '# Welcome to moeTALK!',
      '---',
      '## How to start chatting?',
      '1. click "Settings" and select a LLM provider.',
      '2. click `+` and upload a character card.',
      '## Want more characters?',
      '- [@moeru-ai/deck](https://deck.moeru.ai)',
      '- [RisuRealms](https://realm.risuai.net)',
      '- [AI Character Cards](https://aicharactercards.com)',
      '- [JannyAI](https://jannyai.com)',
      '## Still have questions?',
      '- [Create a new discussion](https://github.com/moeru-ai/talk/discussions/new/choose)',
      '- [Create a new issue](https://github.com/moeru-ai/talk/issues/new)',
    ].join('\n\n'),
    role: 'assistant',
  },
]

const Index = () => {
  const setMessages = useSetMessages()

  useEffect(() => setMessages(messages), [setMessages])

  return (
    <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
      <Header />
      <Messages />
      <InputArea />
    </Flex>
  )
}

export default Index
