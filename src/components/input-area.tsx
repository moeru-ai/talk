import type { Message } from '@xsai/shared-chat'
import type { KeyboardEventHandler } from 'react'

import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, Text, TextArea } from '@radix-ui/themes'
import { generateText } from '@xsai/generate-text'
import { useCallback, useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'

import type { charactersTable } from '../db/schema'

import { useMessages, useSetMessages } from '../context/messages'
import { useChatModel, useChatProvider } from '../hooks/use-chat-provider'

export interface Inputs {
  content: string
}

export const InputArea = ({ character }: { character?: typeof charactersTable.$inferSelect }) => {
  const [chatProvider] = useChatProvider()
  const [chatModel] = useChatModel()
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

  const formRef = useRef<HTMLFormElement>(null)

  const onSubmit: SubmitHandler<Inputs> = async ({ content }) => {
    const msg: Message[] = [...messages, { content, role: 'user' }]

    setMessages(msg)
    resetField('content')
    setIsTyping(true)

    const { text } = await generateText({
      ...chatProvider,
      messages: msg,
      model: chatModel,
    })

    setMessages([...msg, { content: text, role: 'assistant' }])
    setIsTyping(false)
  }

  const handleKeyDown = useCallback<KeyboardEventHandler<HTMLTextAreaElement>>((e) => {
    if (e.key !== 'Enter' || e.altKey || e.metaKey || e.shiftKey || e.ctrlKey)
      return
    e.preventDefault()
    formRef.current?.dispatchEvent(new Event('submit', { bubbles: true }))
  }, [])

  return (
    // eslint-disable-next-line ts/no-misused-promises
    <form data-test-id="input-area" onSubmit={handleSubmit(onSubmit)} ref={formRef}>
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
          data-test-id="input-area-textarea"
          placeholder="Write a Message..."
          resize="vertical"
          size="3"
          style={{ maxHeight: '50vh' }}
          variant="soft"
          {...register('content', { minLength: 1, required: true })}
          onKeyDown={onKeyDownTextArea}
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
