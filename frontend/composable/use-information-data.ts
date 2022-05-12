import { reactive } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-types'
import { useContent } from '@/composable/use-content'
import { ContentSynchronizer } from '@/composable/use-content/syncronizer'

const apiEndpoint = '/informations'
const syncronizer = reactive(new ContentSynchronizer<InformationType>())
const initInformation = () => ({
  id: 0,
  customerId: 0,
  title: '',
  subtitle: '',
  body: '',
  image: {
    url: '',
    lgSize: 'cover',
    smSize: 'cover',
    lgPosition: 'center',
    smPosition: 'center',
  },
  position: 0,
})

/**
 * Use Information Data
 */
export const useInformationData = () => {
  const {
    dataReactive,
    imageReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData,
    getRecentData,
    changeImageSetting,
  } = useContent<InformationType>(apiEndpoint, initInformation, syncronizer)

  return {
    information: dataReactive,
    informationImage: imageReactive,
    loading,
    notFound,
    endLoading,
    loadInformation: loadData,
    createInformation: createData,
    updateInformation: updateData,
    deleteInformation: deleteData,
    getRecentData,
    changeImageSetting,
  }
}
