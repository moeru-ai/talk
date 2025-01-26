export const processAvatarPNG = async (imageData: Uint8Array): Promise<string | undefined> => {
  const imageBlob = new Blob([imageData], { type: 'image/png' })
  const imageBitmap = await createImageBitmap(imageBlob)

  const canvas = new OffscreenCanvas(96, 96)
  const ctx = canvas.getContext('2d')

  if (!ctx)
    return

  const scale = 96 / imageBitmap.width

  ctx.drawImage(
    imageBitmap,
    0,
    0,
    imageBitmap.width * scale,
    imageBitmap.height * scale,
  )

  const blob = await canvas.convertToBlob()

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}
