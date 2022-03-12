import { reactive, ref, computed, watch } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { initContent } from '@/composable/content-helper'
import { fetchService, fetchServiceList, saveService } from '@/utils/data-service'

const initService = () => ({ ...initContent() })

const synchronizer = ref(false)
const syncronizeData = ref({} as ServiceType)

/**
 * Use Service Data
 */
export const useServiceData = (userId: number = 0) => {
  const dataReactive = reactive<ServiceType>(initService())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadService = async (serviceId: number) => {
    loading.value = true
    const fetchedData = await fetchService(userId, serviceId)
    Object.assign(dataReactive, fetchedData)
    loading.value = false
  }

  const updateService = async (updateData: ServiceType, imageFile: File | null) => {
    loading.value = true
    const savedData = await saveService(updateData, imageFile)

    // 同期フラグを変更
    syncronizeData.value = savedData
    synchronizer.value = !synchronizer.value
    loading.value = false
  }

  watch(synchronizer, () => {
    if (syncronizeData.value && syncronizeData.value.id === dataReactive.id) {
      Object.assign(dataReactive, syncronizeData.value)
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
  const listRef = ref<ServiceType[]>([] as ServiceType[])
  const loading = ref(false)

  const loadServiceList = async (limit: number = 10) => {
    loading.value = true
    const fetchedList = await fetchServiceList(userId, limit)
    listRef.value = fetchedList
    loading.value = false
  }

  watch(synchronizer, () => {
    if (syncronizeData.value && syncronizeData.value.id) {
      const target = listRef.value.find((l) => l.id === syncronizeData.value.id)
      Object.assign(target, syncronizeData.value)
    }
  })

  return {
    serviceList: listRef,
    loading,
    loadServiceList,
  }
}
