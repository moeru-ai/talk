import { useLocalStorage } from 'foxact/use-local-storage'

export interface ChatOptions {
  apiKey: string
  baseURL: string
  chatModel: null | string
  embedModel: null | string
  provider: 'ollama' | 'openai' | 'openai-compatible'
}

interface Configuration {
  apiKey?: ConfigurationField<ChatOptions['apiKey']>
  baseURL?: ConfigurationField<ChatOptions['baseURL']>
  chatModel?: ConfigurationField<ChatOptions['chatModel']>
  embedModel?: ConfigurationField<ChatOptions['embedModel']>
}

interface ConfigurationField<T> {
  defaultValue: T
  /**
   * @default true
   */
  editable?: boolean
}

type UpdatableFields = Exclude<keyof ChatOptions, 'provider'>

const fieldDefaultValue: ChatOptions = {
  apiKey: '',
  baseURL: '',
  chatModel: null,
  embedModel: null,
  provider: 'ollama',
}

export type Providers = ChatOptions['provider']

const configurations: Record<Providers, Configuration> = {
  'ollama': {
    baseURL: {
      defaultValue: 'http://localhost:11434/v1/',
    },
  },
  'openai': {
    baseURL: {
      defaultValue: 'https://api.openai.com/v1/',
      editable: false,
    },
  },
  'openai-compatible': {},
}

export interface ChatOptionsState extends ChatOptions {
  isEditable: (field: UpdatableFields) => boolean

  update: (params: Partial<ChatOptions>) => void
}

const fieldIsEditable = (provider: ChatOptionsState['provider'], field: UpdatableFields): boolean => {
  const e = configurations[provider][field]?.editable
  return e === undefined ? true : e
}

const mapValidConfiguration = (input: Partial<ChatOptions>): ChatOptions => {
  const provider = input.provider ?? fieldDefaultValue.provider
  const c = configurations[provider]

  const forFieldValue = <K extends UpdatableFields>(field: K, value: ChatOptions[K] | undefined): ChatOptions[K] => {
    let defaultValue = c[field]?.defaultValue as ChatOptions[K] | undefined
    defaultValue = defaultValue === undefined ? fieldDefaultValue[field] : defaultValue
    return value === undefined || !(c[field]?.editable ?? true) ? defaultValue : value
  }

  return {
    apiKey: forFieldValue('apiKey', input.apiKey),
    baseURL: forFieldValue('baseURL', input.baseURL),
    chatModel: forFieldValue('chatModel', input.chatModel),
    embedModel: forFieldValue('embedModel', input.embedModel),
    provider,
  }
}

export const useChatProvider = (): ChatOptionsState => {
  const [_stored, setStored] = useLocalStorage<ChatOptions>('moetalk/xsai/providers/api-options')
  const stored = mapValidConfiguration(_stored !== null ? _stored : { provider: 'ollama' })
  const update: ChatOptionsState['update'] = (params) => {
    // if the provider changes, reset all fields to default
    if ((params.provider ?? stored.provider) !== stored.provider) {
      setStored(mapValidConfiguration({ ...params }))
    }
    else {
      setStored(mapValidConfiguration({ ...stored, ...params }))
    }
  }
  const isEditable = (field: UpdatableFields) => fieldIsEditable(stored.provider, field)
  return { isEditable, update, ...stored }
}
