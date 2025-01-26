import { message, type Message } from '@xsai/shared-chat'

import type { Data } from './types'

import { defaultSystemPrompt } from './template'

export const loadCharacterCard = (data: Data): Message[] => [
  // TODO: userName, userDescription
  defaultSystemPrompt(data, 'user'),
  message.assistant(data.first_mes),
]
