import { drizzle } from 'drizzle-orm/sqlite-proxy'
// https://github.com/tursodatabase/libsql-client-ts/issues/291
// import { createClient } from '@libsql/client-wasm'
// import { drizzle } from 'drizzle-orm/libsql/wasm'
import { SQLocalDrizzle } from 'sqlocal/drizzle'

import init from './generated/0000_init.sql?raw'

const { batchDriver, driver, sql } = new SQLocalDrizzle('moetalk.db')

// eslint-disable-next-line @masknet/no-top-level, antfu/no-top-level-await
await sql(init.replace('CREATE TABLE', 'CREATE TABLE IF NOT EXISTS'))

export const db = drizzle(driver, batchDriver)
