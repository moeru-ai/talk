import { defineConfig } from 'drizzle-kit'

export default defineConfig({
  dbCredentials: {
    url: './.moetalk.db',
  },
  dialect: 'sqlite',
  //   driver: 'durable-sqlite',
  out: './src/db/generated',
  schema: './src/db/schema.ts',
})
