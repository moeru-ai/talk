import { getMetadata } from 'meta-png'

import type { CharacterCardV3 } from './types'

/** @see {@link https://jsr.io/@std/encoding/1.0.6/base64.ts#L166} */
const decodeBase64 = (base64: string) => {
  // eslint-disable-next-line @masknet/no-builtin-base64
  const binString = atob(base64)
  const size = binString.length
  // eslint-disable-next-line @masknet/array-prefer-from
  const bytes = new Uint8Array(size)
  for (let i = 0; i < size; i++) {
    bytes[i] = binString.charCodeAt(i)
  }

  return new TextDecoder().decode(bytes)
}

export const parseCharacterCardPNG = (png: Uint8Array): CharacterCardV3 | undefined => {
  const ccv3 = getMetadata(png, 'ccv3')

  if (ccv3 === undefined)
    return

  const result = JSON.parse(decodeBase64(ccv3)) as CharacterCardV3

  // eslint-disable-next-line @masknet/no-redundant-variable
  return result
}
