import { Card, Flex, ScrollArea } from '@radix-ui/themes'
import { useEffect, useRef } from 'react'
import { Virtualizer, type VirtualizerHandle } from 'virtua'

import { useMessages } from '../context/messages'
import { Content } from './content'

export const Messages = () => {
  const ref = useRef<VirtualizerHandle>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const messages = useMessages()

  useEffect(() => {
    if (!ref.current)
      return

    ref.current.scrollToIndex(messages.length - 1, {
      align: 'end',
    })
  }, [messages.length])

  return (
    <ScrollArea ref={scrollRef} style={{ overflowY: 'auto' }}>
      <Virtualizer
        count={messages.length}
        ref={ref}
        scrollRef={scrollRef}
      >
        {messages.map((message, i) => {
          const cardStyle = message.role === 'user' ? { alignSelf: 'flex-end', marginLeft: 'auto' } : { alignSelf: 'flex-start', marginRight: 'auto' }

          return (
            <Flex
              // align="end" // for avatar
              gap="2"
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              mt="2"
            >
              <Card style={cardStyle}>
                <Content content={message.content as string} />
              </Card>
            </Flex>
          )
        })}
      </Virtualizer>
    </ScrollArea>
  )
}
