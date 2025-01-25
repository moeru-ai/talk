import { Avatar, IconButton } from '@radix-ui/themes'
import { useEffect, useState } from 'react'

import { db } from '../db'
import { charactersTable } from '../db/schema'

export const SidebarCharacters = () => {
  const [characters, setCharacters] = useState<typeof charactersTable.$inferSelect[]>([])

  useEffect(() => {
    const getCharacters = async () => {
      const characters = await db.select().from(charactersTable)

      setCharacters(characters)
    }

    void getCharacters()
  }, [])

  return characters.map(character => (
    <IconButton asChild key={character.id}>
      <Avatar color="gray" fallback={character.name.slice(0, 2)} size="4" />
    </IconButton>
  ))
}
