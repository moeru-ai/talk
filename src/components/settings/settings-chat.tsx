import { Icon } from '@iconify/react'
import { Badge, Select, Separator, Text, TextField } from '@radix-ui/themes'
import { useOnline } from '@uiw/react-use-online'

import { useChatProvider } from '../../hooks/use-model'
import { useListModels } from '../../hooks/xsai/use-list-models'
import { DebouncedTextField } from '../debounced-textfield.tsx'
import * as Sheet from '../ui/sheet'

export const SettingsChat = () => {
  const chatProvider = useChatProvider()

  const isOnline = useOnline()

  const badgeColor = isOnline ? 'green' : 'red'
  const badgeText = isOnline ? 'Online' : 'Offline'

  const { models } = useListModels({ baseURL: chatProvider.baseURL })

  return (
    <>
      <Sheet.Title>
        Chat
      </Sheet.Title>
      <Sheet.Description mb="4" size="2">
        Connect to your LLM API.
      </Sheet.Description>

      <label>
        <Text as="div" mb="1" weight="bold">
          Provider
          <Badge color={badgeColor} ml="2">
            {badgeText}
          </Badge>
        </Text>
        <Select.Root
          onValueChange={p => chatProvider.update({ provider: p as typeof chatProvider.provider })}
          value={chatProvider.provider}
        >
          <Select.Trigger style={{ width: '100%' }} />
          <Select.Content position="popper">
            <Select.Item value="ollama">
              <Icon icon="simple-icons:ollama" inline style={{ marginInlineEnd: '0.5rem' }} />
              Ollama (localhost)
            </Select.Item>
            <Select.Item value="openai">
              <Icon icon="simple-icons:openai" inline style={{ marginInlineEnd: '0.5rem' }} />
              OpenAI
            </Select.Item>
            <Select.Item value="openai-compatible">
              <Icon icon="simple-icons:openai" inline style={{ marginInlineEnd: '0.5rem' }} />
              OpenAI-compatible
            </Select.Item>
          </Select.Content>
        </Select.Root>
      </label>

      <Separator size="2" />

      <label>
        <Text as="div" mb="1" weight="bold">
          Base URL
        </Text>
        <DebouncedTextField
          disabled={!chatProvider.isEditable('baseURL')}
          onBlurValueChange={baseURL => chatProvider.update({ baseURL })}
          value={chatProvider.baseURL}
        >
          <TextField.Slot />
        </DebouncedTextField>
      </label>

      <label>
        <Text as="div" mb="1" weight="bold">
          API Key
        </Text>
        <DebouncedTextField
          disabled={!chatProvider.isEditable('apiKey')}
          onBlurValueChange={apiKey => chatProvider.update({ apiKey })}
          value={chatProvider.apiKey}
        >
          <TextField.Slot />
        </DebouncedTextField>
      </label>

      <Separator size="3" />

      <label>
        <Text as="div" mb="1" weight="bold">
          Chat Model
        </Text>
        <Select.Root onValueChange={chatModel => chatProvider.update({ chatModel })} value={chatProvider.chatModel ?? undefined}>
          <Select.Trigger placeholder="Pick a model" style={{ width: '100%' }} />
          <Select.Content position="popper">
            {models.map(model => (<Select.Item key={model.id} value={model.id}>{model.id}</Select.Item>))}
          </Select.Content>
        </Select.Root>
      </label>

      <label>
        <Text as="div" mb="1" weight="bold">
          Embed Model
        </Text>
        <Select.Root onValueChange={embedModel => chatProvider.update({ embedModel })} value={chatProvider.embedModel ?? undefined}>
          <Select.Trigger placeholder="Pick a model" style={{ width: '100%' }} />
          <Select.Content position="popper">
            {models.map(model => (<Select.Item key={model.id} value={model.id}>{model.id}</Select.Item>))}
          </Select.Content>
        </Select.Root>
      </label>
    </>
  )
}
