import { reactive } from '@nuxtjs/composition-api'
import { EyecatchType } from '@/types/content-types'
import { useContent } from '@/composable/use-content'
import { ContentSynchronizer } from '@/composable/use-content/syncronizer'

const apiEndpoint = '/eyecatches'
const syncronizer = reactive(new ContentSynchronizer<EyecatchType>())
const initEyecatch = (): EyecatchType => ({
  id: 0,
  customerId: 0,
  title: '',
  subtitle: '',
  image: {
    url: '',
    lgSize: 'cover',
    smSize: 'cover',
    lgPosition: 'center',
    smPosition: 'center',
    lgParallax: false,
    smParallax: false,
  },
})

/**
 * Use Service Data
 */
export const useEyecatchData = () => {
  const {
    dataReactive,
    imageReactive,
    loading,
    notFound,
    loadData,
    createData,
    updateData,
    endLoading,
    getRecentData,
    changeImageSetting,
  } = useContent<EyecatchType>(apiEndpoint, initEyecatch, syncronizer)

  return {
    eyecatch: dataReactive,
    eyecatchImage: imageReactive,
    loading,
    notFound,
    loadEyecatch: loadData,
    createEyecatch: createData,
    updateEyecatch: updateData,
    endLoading,
    getRecentData,
    changeImageSetting,
  }
}
