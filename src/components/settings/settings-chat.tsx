import { Icon } from '@iconify/react'
import { Badge, Select, Separator, Text, TextField } from '@radix-ui/themes'
import { useOnline } from '@uiw/react-use-online'

import { useChatModel, useEmbedModel } from '../../hooks/use-model'
import { useListModels } from '../../hooks/xsai/use-list-models'
import { DebouncedTextField } from '../debounced-textfield.tsx'
import * as Sheet from '../ui/sheet'

export const SettingsChat = () => {
  const [chatModel, setChatModel] = useChatModel()
  const [embedModel, setEmbedModel] = useEmbedModel()
  const isOnline = useOnline()

  const badgeColor = isOnline ? 'green' : 'red'
  const badgeText = isOnline ? 'Online' : 'Offline'

  const baseURL = 'http://localhost:11434/v1/'

  const { models } = useListModels({ baseURL })

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
        <Select.Root defaultValue="ollama">
          <Select.Trigger style={{ width: '100%' }} />
          <Select.Content position="popper">
            <Select.Item value="ollama">
              <Icon icon="simple-icons:ollama" inline style={{ marginInlineEnd: '0.5rem' }} />
              Ollama (localhost)
            </Select.Item>
            <Select.Item disabled value="openai">
              <Icon icon="simple-icons:openai" inline style={{ marginInlineEnd: '0.5rem' }} />
              OpenAI
            </Select.Item>
            <Select.Item disabled value="openai-compatible">
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
        <DebouncedTextField disabled placeholder="https://openai.com/v1/">
          <TextField.Slot />
        </DebouncedTextField>
      </label>

      <label>
        <Text as="div" mb="1" weight="bold">
          API Key
        </Text>
        <DebouncedTextField disabled placeholder="sk-abcdefghijklmnop123">
          <TextField.Slot />
        </DebouncedTextField>
      </label>

      <Separator size="3" />

      <label>
        <Text as="div" mb="1" weight="bold">
          Chat Model
        </Text>
        <Select.Root defaultValue={chatModel ?? undefined} onValueChange={setChatModel}>
          <Select.Trigger placeholder="Pick a model" style={{ width: '100%' }} />
          <Select.Content position="popper">
            {models.map(model => (
              <Select.Item key={model.id} value={model.id}>{model.id}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </label>

      <label>
        <Text as="div" mb="1" weight="bold">
          Embed Model
        </Text>
        <Select.Root defaultValue={embedModel ?? undefined} onValueChange={setEmbedModel}>
          <Select.Trigger placeholder="Pick a model" style={{ width: '100%' }} />
          <Select.Content position="popper">
            {models.map(model => (
              <Select.Item key={model.id} value={model.id}>{model.id}</Select.Item>
            ))}
          </Select.Content>
        </Select.Root>
      </label>
    </>
  )
}
