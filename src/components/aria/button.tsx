import type { PropsWithChildren } from 'react'

import { Button as RadixThemesButton } from '@radix-ui/themes'
import { Button as ReactAriaButton } from 'react-aria-components'

export const Button = ({ children }: PropsWithChildren) => (
  <RadixThemesButton asChild>
    <ReactAriaButton>{children}</ReactAriaButton>
  </RadixThemesButton>
)
