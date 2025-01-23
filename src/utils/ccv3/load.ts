import { message, type Message } from '@xsai/shared-chat'

import type { CharacterCardV3 } from './types'

import { defaultSystemPrompt } from './template'

export const loadCharacterCard = (card: CharacterCardV3): Message[] => [
  defaultSystemPrompt(card, 'user'),
  message.assistant(card.data.first_mes),
]
