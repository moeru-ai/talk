import type { Message } from '@xsai/shared-chat'

import { createContextState } from 'foxact/context-state'

const [MessagesProvider, useMessages, useSetMessages] = createContextState<Message[]>([])

// eslint-disable-next-line react-refresh/only-export-components
export { MessagesProvider, useMessages, useSetMessages }
