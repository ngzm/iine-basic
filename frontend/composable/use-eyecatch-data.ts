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
    notFound,
    loadData,
    createData,
    updateData,
    endLoading
  } = useContent<EyecatchType>(
    customerId,
    apiEndpoint,
    initEyecatch,
    syncronizer
  )

  return {
    eyecatch: dataReactive,
    loading,
    notFound,
    loadEyecatch: loadData,
    createEyecatch: createData,
    updateEyecatch: updateData,
    endLoading
  }
}
