import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './app.tsx'

import '@radix-ui/themes/styles.css'

import './main.css'

// eslint-disable-next-line @masknet/no-top-level
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
