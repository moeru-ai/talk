import { useLocalStorage } from 'foxact/use-local-storage'

export const useChatModel = () => useLocalStorage<string>('moetalk/xsai/providers/chat-model')

export const useEmbedModel = () => useLocalStorage<string>('moetalk/xsai/providers/embed-model')
