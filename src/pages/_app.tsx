import { Box, Flex } from '@radix-ui/themes'
import { Outlet } from 'react-router-dom'

import { Sidebar } from '../components/sidebar'
import { Theme } from '../components/theme'
import { Toaster } from '../components/ui/sonner'
import { Context } from '../context'

const App = () => (
  <Context>
    <Theme>
      <Toaster />
      <Flex gap="2">
        <Sidebar />
        <Box height="100vh" width="100%">
          <Box maxWidth="var(--container-3)" mx="auto">
            <Outlet />
          </Box>
        </Box>
      </Flex>
    </Theme>
  </Context>
)

export default App
