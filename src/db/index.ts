import { drizzle } from 'drizzle-orm/libsql/wasm'
import { createClient } from '@libsql/client-wasm'

import migrations from './generated/0000_dark_captain_flint.sql?raw'
import { usersTable } from './schema'

const client = createClient({ url: 'file:moetalk.db' })

// eslint-disable-next-line @masknet/no-top-level
client.execute(migrations)

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
