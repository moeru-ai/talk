import { sqliteTable, text } from 'drizzle-orm/sqlite-core'

import type { Data } from '../utils/ccv3/types'

export const charactersTable = sqliteTable('characters_table', {
  // base64 png data url (96x96)
  avatar: text(),
  // character card data json
  data: text({ mode: 'json' }).$type<Data>().notNull(),
  // uuid v7
  id: text().primaryKey(),
  // character card name
  name: text().notNull(),
})
