import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const charactersTable = sqliteTable('characters_table', {
  // uuid v7
  id: text().primaryKey(),
  // character card name
  name: text().notNull(),
  // png blob
  avatar: text({ mode: 'json' }),
  // character card data json
  data: text({ mode: 'json' }).notNull()
})
