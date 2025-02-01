import { Flex } from '@radix-ui/themes'
import { useEffect } from 'react'

import { Header } from '../../../components/header'
import { InputArea } from '../../../components/input-area'
import { Messages } from '../../../components/messages'
import { useSetMessages } from '../../../context/messages'
import { useCharacter } from '../../../hooks/use-character'
import { useParams } from '../../../router'
import { loadCharacterCard } from '../../../utils/ccv3/load'

const Room = () => {
  const { uuid } = useParams('/room/:uuid')
  const setMessages = useSetMessages()
  const { character } = useCharacter(uuid)

  useEffect(() => {
    if (character)
      // TODO: userName
      setMessages(loadCharacterCard(character.data, 'User'))
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
