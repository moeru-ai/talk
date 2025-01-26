import { Flex } from '@radix-ui/themes'

import { Header } from '../components/header'
import { InputArea } from '../components/input-area'
import { Messages } from '../components/messages'

const Index = () => (
  <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
    <Header />
    <Messages />
    <InputArea />
  </Flex>
)

export default Index
