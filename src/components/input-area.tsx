import type { Message } from '@xsai/shared-chat'

import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, Text, TextArea } from '@radix-ui/themes'
import { generateText } from '@xsai/generate-text'
import { ollama } from '@xsai/providers'
import { useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { charactersTable } from '../db/schema'

import { useMessages, useSetMessages } from '../context/messages'
import { useChatProvider } from '../hooks/use-model'

export interface Inputs {
  content: string
}

export const InputArea = ({ character }: { character?: typeof charactersTable.$inferSelect }) => {
  const chatProvider = useChatProvider()
  const messages = useMessages()
  const setMessages = useSetMessages()

  const [isTyping, setIsTyping] = useState(false)

  const {
    // formState: { errors },
    handleSubmit,
    register,
    resetField,
    // watch,
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
    const msg: Message[] = [...messages, { content, role: 'user' }]

    setMessages(msg)
    resetField('content')
    setIsTyping(true)

    const { text } = await generateText({
      ...ollama.chat(chatProvider.chatModel ?? ''),
      messages: msg,
    })

    setMessages([...msg, { content: text, role: 'assistant' }])
    setIsTyping(false)
  }

  return (
    // eslint-disable-next-line ts/no-misused-promises
    <form data-test-id="input-area" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2" style={{ alignSelf: 'flex-end', marginTop: 'auto' }} width="100%">
        {isTyping && (
          <Flex align="center" gap="2">
            <Icon icon="svg-spinners:3-dots-scale" />
            <Text>
              {character?.name ?? 'Bot'}
              {' '}
              is typing
            </Text>
          </Flex>
        )}
        <TextArea
          color="gray"
          placeholder="Write a Message..."
          resize="vertical"
          size="3"
          style={{ maxHeight: '50vh' }}
          variant="soft"
          {...register('content', { minLength: 1, required: true })}
        />
        <Flex gap="2">
          <IconButton color="gray" disabled variant="soft">
            <Icon icon="heroicons:paper-clip" />
          </IconButton>
          <IconButton color="gray" disabled variant="soft">
            <Icon icon="heroicons:microphone" />
          </IconButton>
          <Button style={{ alignSelf: 'flex-end', marginInlineStart: 'auto' }} type="submit" variant="soft">
            Send
            <Icon icon="heroicons:paper-airplane" />
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
