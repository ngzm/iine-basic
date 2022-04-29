import { reactive } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { useContent } from '@/composable/use-content'
import { ContentSynchronizer } from '@/composable/use-content/syncronizer'

const apiEndpoint = '/services'
const syncronizer = reactive(new ContentSynchronizer<ServiceType>())
const initService = () => ({
  id: 0,
  customerId: 0,
  title: '',
  body: '',
  image: '',
  position: 0,
})

/**
 * Use Service Data
 */
export const useServiceData = () => {
  const {
    dataReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData,
    getRecentData,
  } = useContent<ServiceType>(apiEndpoint, initService, syncronizer)

  return {
    service: dataReactive,
    loading,
    notFound,
    endLoading,
    loadService: loadData,
    createService: createData,
    updateService: updateData,
    deleteService: deleteData,
    getRecentData,
  }
}

/**
 * Use Service List Data
 */
export const useServiceList = () => {
  const { listRef, loading, notFound, loadList, changePositions } =
    useContent<ServiceType>(apiEndpoint, initService, syncronizer)

  return {
    serviceList: listRef,
    loading,
    notFound,
    loadServiceList: loadList,
    changeServicesPosition: changePositions,
  }
}
