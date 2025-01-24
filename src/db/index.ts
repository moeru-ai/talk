import { drizzle } from 'drizzle-orm/better-sqlite3'
import { Database } from 'limbo-wasm'

import migrations from './generated/0000_brown_mandroid.sql?raw'
import { usersTable } from './schema'

const client = new Database('moetalk.db')

// eslint-disable-next-line @masknet/no-top-level
client.exec(migrations)

export const db = drizzle({ client })

// TEST

const user: typeof usersTable.$inferInsert = {
  age: 30,
  email: 'john@example.com',
  name: 'John',
}

// eslint-disable-next-line @masknet/no-top-level, antfu/no-top-level-await
await db.insert(usersTable).values(user)
// eslint-disable-next-line @masknet/no-top-level, no-console
console.log('New user created!')
