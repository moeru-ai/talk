import { message, type Message } from '@xsai/shared-chat'

import type { Data } from './types'

const replaceNames = (str: string, charName: string, userName: string) =>
  str
    .replaceAll('{{char}}', charName)
    .replaceAll('{{user}}', userName)
    .replaceAll('<user>', userName)

// TODO: userName, userDescription
export const loadCharacterCard = (data: Data, userName: string): Message[] => [
  message.system(`Write ${data.name}'s next reply in a fictional chat between ${data.name} and ${userName}.`),
  ...(data.system_prompt ? [message.system(replaceNames(data.system_prompt, data.name, userName))] : []),
  // TODO: character_book before
  message.system(replaceNames(data.description, data.name, userName)),
  ...(data.personality ? [message.system(`${data.name}'s personality: ${replaceNames(data.personality, data.name, userName)}`)] : []),
  ...(data.scenario ? [message.system(`Scenario: ${replaceNames(data.scenario, data.name, userName)}`)] : []),
  // TODO: character_book after
  message.system('[Start a new Chat]'),
  message.assistant(replaceNames(data.first_mes, data.name, userName)),
]
