import { useLocalStorage } from 'foxact/use-local-storage'
import { useState } from 'react'

export interface ChatProvider {
  apiKey: string
  baseURL: string
  metadata: {
    disableEditApiKey?: true
    disableEditBaseURL?: true
    icon: string
    id: string
    name: string
    requiredApiKey?: true
  }
}

export const predefinedChatProviders: ChatProvider[] = [
  {
    apiKey: '',
    baseURL: 'http://localhost:11434/v1/',
    metadata: {
      disableEditApiKey: true,
      icon: 'simple-icons:ollama',
      id: 'ollama',
      name: 'Ollama',
    },
  },
  {
    apiKey: '',
    baseURL: 'https://openai.com/v1/',
    metadata: {
      disableEditBaseURL: true,
      icon: 'simple-icons:openai',
      id: 'openai',
      name: 'OpenAI',
      requiredApiKey: true,
    },
  },
  {
    apiKey: '',
    baseURL: '',
    metadata: {
      icon: 'simple-icons:openai',
      id: 'openai-compatible',
      name: 'OpenAI-compatible',
    },
  },
]

export const useChatModel = () => useLocalStorage<string>('moetalk/xsai/chat-model', '')

export const useEmbedModel = () => useLocalStorage<string>('moetalk/xsai/embed-model', '')

export const useChatProvider = () => {
  const [provider, setProvider] = useLocalStorage<ChatProvider>('moetalk/xsai/chat-provider', predefinedChatProviders[0])
  const [lastProvider, setLastProvider] = useState(provider.metadata.id)
  const [,setChatModel] = useChatModel()
  const [,setEmbedModel] = useEmbedModel()

  if (lastProvider !== provider.metadata.id) {
    setLastProvider(provider.metadata.id)
    setChatModel('')
    setEmbedModel('')
  }

  return [provider, setProvider] as const
}
