import { useLocalStorage } from 'foxact/use-local-storage'

export interface ChatProvider {}

export const useChatProvider = () => useLocalStorage(
  'moetalk/xsai/providers/chat',
  {

  },
)
