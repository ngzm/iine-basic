import { reactive } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
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
  image: '',
  position: 0
})

/**
 * Use Information Data
 */
export const useInformationData = () => {
  const {
    dataReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData
  } = useContent<InformationType>(
    apiEndpoint,
    initInformation,
    syncronizer
  )

  return {
    information: dataReactive,
    loading,
    notFound,
    endLoading,
    loadInformation: loadData,
    createInformation: createData,
    updateInformation: updateData,
    deleteInformation: deleteData 
  }
}
