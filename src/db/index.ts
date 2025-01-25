import { createClient } from '@libsql/client-wasm'
import { drizzle } from 'drizzle-orm/libsql/wasm'

import init from './generated/0000_init.sql?raw'

const client = createClient({ url: 'file:moetalk.db' })

// eslint-disable-next-line @masknet/no-top-level, antfu/no-top-level-await
await client.migrate([init])

export const db = drizzle({ client })
