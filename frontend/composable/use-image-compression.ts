import { ref } from '@nuxtjs/composition-api'
import { imageCompress, getImageDataUrl } from '@/utils/image-compressor'

export const useImageCompression = () => {
  const compressing = ref(false)

  const compress = async (imageFile: File) => {
    compressing.value = true
    const compressedImageFile = await imageCompress(imageFile)
    const compressedImageUrl = await getImageDataUrl(compressedImageFile)
    compressing.value = false
    return { compressedImageFile, compressedImageUrl }
  }

  return { compressing, compress }
}
