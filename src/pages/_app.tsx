import { Container } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '../components/sidebar'
import { Theme } from '../components/theme'
import { MessagesProvider } from '../context/messages'

const App = () => (
  <MessagesProvider>
    <Theme>
      <Sidebar />
      <Container height="100vh" size="3">
        <Outlet />
      </Container>
    </Theme>
  </MessagesProvider>
)

export default App
