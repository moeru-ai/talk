import { createContextState } from 'foxact/context-state'
import { useCallback } from 'react'

import { db } from '../db'
import { charactersTable } from '../db/schema'

// eslint-disable-next-line antfu/no-top-level-await
const [CharactersProvider, useCharacters, useSetCharacters] = createContextState<typeof charactersTable.$inferSelect[]>(await db.select().from(charactersTable))

// eslint-disable-next-line react-refresh/only-export-components
export { CharactersProvider, useCharacters, useSetCharacters }

// eslint-disable-next-line react-refresh/only-export-components
export const useUpdateCharacters = () => {
  const setCharacters = useSetCharacters()

  return useCallback(async () => setCharacters(await db.select().from(charactersTable)), [setCharacters])
}
