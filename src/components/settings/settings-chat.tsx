import { Icon } from '@iconify/react'
import { Badge, Select, Separator, Text, TextField } from '@radix-ui/themes'
import { useOnline } from '@uiw/react-use-online'

import { predefinedChatProviders, useChatModel, useChatProvider, useEmbedModel } from '../../hooks/use-chat-provider.ts'
import { useListModels } from '../../hooks/xsai/use-list-models'
import { DebouncedTextField } from '../debounced-textfield.tsx'
import * as Sheet from '../ui/sheet'

export const SettingsChat = () => {
  const [chatProvider, setChatProvider] = useChatProvider()
  const [chatModel, setChatModel] = useChatModel()
  const [embedModel, setEmbedModel] = useEmbedModel()

  const isOnline = useOnline()

  const badgeColor = isOnline ? 'green' : 'red'
  const badgeText = isOnline ? 'Online' : 'Offline'

  const { models } = useListModels(chatProvider)

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
          onValueChange={id => setChatProvider(predefinedChatProviders.find(({ metadata }) => metadata.id === id)!)}
          value={chatProvider.metadata.id}
        >
          <Select.Trigger style={{ width: '100%' }} />
          <Select.Content position="popper">
            {predefinedChatProviders.map(provider => (
              <Select.Item key={provider.metadata.id} value={provider.metadata.id}>
                <Icon icon={provider.metadata.icon} inline style={{ marginInlineEnd: '0.5rem' }} />
                {provider.metadata.name}
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </label>

      <Separator size="2" />

      <label>
        <Text as="div" mb="1" weight="bold">
          Base URL
        </Text>
        <DebouncedTextField
          disabled={chatProvider.metadata.disableEditBaseURL}
          onBlurValueChange={baseURL => setChatProvider({ ...chatProvider, baseURL })}
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
          disabled={chatProvider.metadata.disableEditApiKey}
          onBlurValueChange={apiKey => setChatProvider({ ...chatProvider, apiKey })}
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
        <Select.Root onValueChange={chatModel => setChatModel(chatModel)} value={chatModel ?? undefined}>
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
        <Select.Root onValueChange={embedModel => setEmbedModel(embedModel)} value={embedModel ?? undefined}>
          <Select.Trigger placeholder="Pick a model" style={{ width: '100%' }} />
          <Select.Content position="popper">
            {models.map(model => (<Select.Item key={model.id} value={model.id}>{model.id}</Select.Item>))}
          </Select.Content>
        </Select.Root>
      </label>
    </>
  )
}
