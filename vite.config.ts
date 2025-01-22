import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import stylex from 'vite-plugin-stylex'

// https://vite.dev/config/
export default defineConfig({
  build: { target: 'esnext' },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
    stylex(),
  ],
})
