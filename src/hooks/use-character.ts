import { eq } from 'drizzle-orm'
import useSWR from 'swr'

import { db } from '../db'
import { charactersTable } from '../db/schema'

export const useCharacter = (uuid: string) => {
  const { data, isLoading } = useSWR('/db/characters', async () => db
    .select()
    .from(charactersTable)
    .where(eq(charactersTable.id, uuid))
    .get())

  return {
    character: data,
    isLoading,
  }
}
