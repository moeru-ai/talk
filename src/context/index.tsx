import type { PropsWithChildren } from 'react'

import { ComposeContextProvider } from 'foxact/compose-context-provider'

import { MessagesProvider } from './messages'
import { SidebarActiveProvider } from './sidebar-active'

const contexts = [
  <MessagesProvider key="context-messages" />,
  <SidebarActiveProvider key="context-sidebar-active" />,
]

export const Context = ({ children }: PropsWithChildren) =>
  <ComposeContextProvider contexts={contexts}>{children}</ComposeContextProvider>
