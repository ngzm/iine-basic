import { reactive } from '@nuxtjs/composition-api'
import { EyecatchType } from '@/types/content-type'
import { useContent, ContentSynchronizer } from '~/composable/use-content'

const apiEndpoint = '/eyecatches'
const syncronizer = reactive(new ContentSynchronizer<EyecatchType>())
const initEyecatch = (): EyecatchType => ({
  id: 0,
  customerId: 0,
  title: '',
  subtitle: '',
  image: ''
})

/**
 * Use Service Data
 */
export const useEyecatchData = (customerId: number = 0) => {
  const {
    dataReactive,
    loading,
    loadData,
    createData,
    updateData,
  } = useContent<EyecatchType>(
    customerId,
    apiEndpoint,
    initEyecatch,
    syncronizer
  )

  const updateEyecatch = async (dataId: number, modData: EyecatchType, imageFile: File | null) => {
    if (dataReactive.id) {
      await updateData(dataId, modData, imageFile)
    } else {
      await createData(modData, imageFile)
    }
  }

  return {
    eyecatch: dataReactive,
    loading,
    loadEyecatch: loadData,
    updateEyecatch
  }
}
