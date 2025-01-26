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
import { defaultSystemPrompt } from '../../../utils/ccv3/template'

const Room = () => {
  const { uuid } = useParams('/room/:uuid')
  const [character, setCharacter] = useState<null | typeof charactersTable.$inferSelect>(null)
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
      setMessages([defaultSystemPrompt(character.data, 'User')])
  }, [character, setMessages])

  return (
    <Flex direction="column" gap="2" height="100vh" p="2" width="100%">
      <Header />
      <Messages />
      <InputArea />
    </Flex>
  )
}

export default Room
