import { Container, Flex } from '@radix-ui/themes'

import { Header } from '../components/header'
import { InputArea } from '../components/input-area'
import { Messages } from '../components/messages'
import { Sidebar } from '../components/sidebar'
import { Theme } from '../components/theme'
import { MessagesProvider } from '../context/messages'

const Index = () => (
  <MessagesProvider>
    <Theme>
      <Sidebar />
      <Container height="100vh" size="3">
        <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
          <Header />
          <Messages />
          <InputArea />
        </Flex>
      </Container>
    </Theme>
  </MessagesProvider>
)

export default Index
