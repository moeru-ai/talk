import { useMatch } from 'react-router-dom'

import { useParams } from '../../../router'

const Room = () => {
  const { uuid } = useParams('/room/:uuid')
  const match = useMatch('/room/:uuid')

  return (
    <h1>
      {uuid}
      {' '}
      -
      {' '}
      {JSON.stringify(match, null, 2)}
    </h1>
  )
}

export default Room
