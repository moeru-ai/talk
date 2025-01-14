import { Card, ScrollArea, Text } from '@radix-ui/themes'
import { useEffect, useRef } from 'react'
import { Virtualizer, type VirtualizerHandle } from 'virtua'

export const Messages = () => {
  const ref = useRef<VirtualizerHandle>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  const items = Array.from({ length: 100 })

  useEffect(() => {
    if (!ref.current)
      return

    ref.current.scrollToIndex(items.length - 1, {
      align: 'end',
    })
  }, [items.length])

  return (
    <ScrollArea ref={scrollRef} style={{ overflowY: 'auto' }}>
      <Virtualizer
        count={items.length}
        ref={ref}
        scrollRef={scrollRef}
      >
        {items.map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <Card key={i} mt="2" style={{ width: '100%' }}>
            <Text>
              Message
              {i}
            </Text>
          </Card>
        ))}
      </Virtualizer>
    </ScrollArea>
  )
}
