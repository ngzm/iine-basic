import imageCompression from 'browser-image-compression'

export const imageCompress = async (file: File) => {
  const blob = await imageCompression(file, {
    maxSizeMB: 1,
    maxWidthOrHeight: 1440,
  })
  // imageCompression の帰り値は File ではなく blob となってしまうので・・
  return new File([blob], file.name, { lastModified: file.lastModified })
}

export const getImageDataUrl = async (file: File) =>
  await imageCompression.getDataUrlFromFile(file)
