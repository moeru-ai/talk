import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  build: { target: 'esnext' },
  optimizeDeps: {
    exclude: ['@libsql/client-wasm'],
    esbuildOptions: {
      target: 'esnext'
    }
  },
  plugins: [
    react({
      babel: { plugins: [
        ['babel-plugin-react-compiler', { target: '19' }],
      ] },
    }),
  ],
})
