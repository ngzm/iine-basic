import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchService, fetchServiceList, saveService } from '@/utils/data-service'

const initService = () => ({ ...initContent() })

const syncronizer = reactive(new ContentSynchronizer<ServiceType>())
const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

/**
 * Use Service Data
 */
export const useServiceData = (userId: number = 0) => {
  const { dispatch } = useStore()
  const dataReactive = reactive<ServiceType>(initService())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadService = async (serviceId: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        Object.assign(dataReactive, await fetchService(userId, serviceId))
        loading.value = false
      }
    })
  }

  const updateService = async (updateData: ServiceType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onUpdated(await saveService(updateData, imageFile))
        loading.value = false
      }
    })
  }

  watch(syncUpdated, () => {
    if (syncronizer.shouldUpdate(dataReactive)) {
      Object.assign(dataReactive, syncData.value)
    }
  })

  return {
    service: dataRef,
    loading,
    loadService,
    updateService
  }
}

/**
 * Use Service List Data
 */
export const useServiceList = (userId: number = 0) => {
  const { dispatch } = useStore()
  const listRef = ref<ServiceType[]>([] as ServiceType[])
  const loading = ref(false)
  let offset: number = 0

  const loadServiceList = async (limit: number = 10) => {
    offset = limit
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        listRef.value = await fetchServiceList(userId, offset)
        loading.value = false
      }
    })
  }

  watch(syncUpdated, () => {
    const target = listRef.value.find((l) => syncronizer.shouldUpdate(l))
    Object.assign(target, syncData.value)
  })

  return {
    serviceList: listRef,
    loading,
    loadServiceList,
  }
}
