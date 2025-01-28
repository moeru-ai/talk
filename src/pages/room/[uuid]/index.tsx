import { Flex } from '@radix-ui/themes'
import { eq } from 'drizzle-orm'
import { useEffect, useState } from 'react'

import { Header } from '../../../components/header'
import { InputArea } from '../../../components/input-area'
import { Messages } from '../../../components/messages'
import { useSetMessages } from '../../../context/messages'
import { db } from '../../../db'
import { charactersTable } from '../../../db/schema'
import { useParams } from '../../../router'
import { loadCharacterCard } from '../../../utils/ccv3/load'

const Room = () => {
  const { uuid } = useParams('/room/:uuid')
  const [character, setCharacter] = useState<typeof charactersTable.$inferSelect | undefined>()
  const setMessages = useSetMessages()

  useEffect(() => {
    const getCharacter = async () => {
      const character = await db
        .select()
        .from(charactersTable)
        .where(eq(charactersTable.id, uuid))
        .get()

      if (character)
        setCharacter(character)
    }

    void getCharacter()
  }, [uuid])

  useEffect(() => {
    if (character)
      setMessages(loadCharacterCard(character.data))
  }, [character, setMessages])

  return (
    <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
      <Header />
      <Messages />
      <InputArea character={character} />
    </Flex>
  )
}

export default Room
