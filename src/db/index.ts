import { drizzle } from 'drizzle-orm/libsql/wasm'
import { createClient } from '@libsql/client-wasm'

import init from './generated/0000_init.sql?raw'

const client = createClient({ url: 'file:moetalk.db' })

// eslint-disable-next-line @masknet/no-top-level
await client.migrate([init])

export const db = drizzle({ client })
