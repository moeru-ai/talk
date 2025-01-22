import type { Message } from '@xsai/shared-chat'

import { Icon } from '@iconify/react'
import { Button, Flex, IconButton, TextArea } from '@radix-ui/themes'
import generateText from '@xsai/generate-text'
import { ollama } from '@xsai/providers'
import { type SubmitHandler, useForm } from 'react-hook-form'

import { useMessages, useSetMessages } from '../context/messages'
import { useChatModel } from '../hooks/use-model'

export interface Inputs {
  content: string
}

export const InputArea = () => {
  const messages = useMessages()
  const setMessages = useSetMessages()

  const [chatModel] = useChatModel()

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

    const { text } = await generateText({
      ...ollama.chat(chatModel as string),
      messages: msg,
    })

    setMessages([...msg, { content: text, role: 'assistant' }])
  }

  return (
    // eslint-disable-next-line ts/no-misused-promises
    <form data-test-id="input-area" onSubmit={handleSubmit(onSubmit)}>
      <Flex direction="column" gap="2" style={{ alignSelf: 'flex-end', marginTop: 'auto' }} width="100%">
        <TextArea
          color="gray"
          placeholder="Write a Message..."
          resize="vertical"
          size="3"
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
