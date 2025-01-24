import type { PropsWithChildren } from 'react'

import { Card, Flex, Text } from '@radix-ui/themes'
import { DropZone as ReactAriaDropZone } from 'react-aria-components'

export const DropZone = ({ children }: PropsWithChildren) => {
  return (
    <Card asChild variant="surface">
      {/* eslint-disable-next-line no-console */}
      <ReactAriaDropZone onDrop={e => console.log(e)}>
        <Flex align="center" direction="column" gap="4" justify="center" minHeight="180px" p="4" slot="label">
          <Text align="center">Drop your character card here</Text>
          {children}
        </Flex>
      </ReactAriaDropZone>
    </Card>
  )
}
