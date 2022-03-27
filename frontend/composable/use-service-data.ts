import { reactive } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { useContentCommon, ContentSynchronizer } from '@/composable/use-content-common'

const apiEndpoint = '/services'
const syncronizer = reactive(new ContentSynchronizer<ServiceType>())
const initService = () => ({
  id: 0,
  title: '',
  body: '',
  image: '',
  link: '',
  position: 0
})

/**
 * Use Service Data
 */
export const useServiceData = (userId: number = 0) => {
  const {
    dataReactive,
    loading,
    loadData,
    createData,
    updateData,
    deleteData
  } = useContentCommon<ServiceType>(
    userId,
    apiEndpoint,
    initService,
    syncronizer
  )

  return {
    service: dataReactive,
    loading,
    loadService: loadData,
    createService: createData,
    updateService: updateData,
    deleteService: deleteData 
  }
}

/**
 * Use Service List Data
 */
export const useServiceList = (userId: number = 0) => {
  const {
    listRef,
    loading,
    loadList,
    changePositions
  } = useContentCommon<ServiceType>(
    userId,
    apiEndpoint,
    initService,
    syncronizer
  )

  return {
    serviceList: listRef,
    loading,
    loadServiceList: loadList,
    changeServicesPosition: changePositions
  }
}
