import { Flex } from '@radix-ui/themes'
import { useEffect } from 'react'

import { Header } from '../components/header'
import { InputArea } from '../components/input-area'
import { Messages } from '../components/messages'
import { useSetMessages } from '../context/messages'

const Index = () => {
  const setMessages = useSetMessages()

  useEffect(() => setMessages([]), [setMessages])

  return (
    <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
      <Header />
      <Messages />
      <InputArea />
    </Flex>
  )
}

export default Index
