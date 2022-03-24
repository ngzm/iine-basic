import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchService, fetchServiceList, saveService, removeService } from '@/utils/data-service'

const initService = () => ({ ...initContent() })

const syncronizer = reactive(new ContentSynchronizer<ServiceType>())
const { syncCreated, syncUpdated, syncDeleted, syncData } = toRefs(syncronizer)

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

  const createService = async (createData: ServiceType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onCreated(await saveService(createData, imageFile))
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

  const deleteService = async (id: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        await removeService(id)
        syncronizer.onDeleted({ ...dataReactive as ServiceType, removed: true })
        loading.value = false
      }
    })
  }

  watch(syncUpdated, () => {
    if (syncronizer.isTarget(dataReactive)) {
      Object.assign(dataReactive, syncData.value)
    }
  })

  watch(syncDeleted, () => {
    if (syncronizer.isTarget(dataReactive)) {
      Object.assign(dataReactive, syncData.value)
    }
  })

  return {
    service: dataRef,
    loading,
    loadService,
    createService,
    updateService,
    deleteService
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

  const changeServicesPosition = (updatedList: ServiceType[]) => {
    // TODO: position を更新した場合のAPI仕様策定
    // TODO: 同期して更新すべきデータの同期処理
    listRef.value = updatedList
  }

  watch(syncCreated, () => {
    listRef.value.push(syncData.value)

    // const list = Array.from(listRef.value)
    // list.push(syncData.value)
    // listRef.value = list
  })

  watch(syncUpdated, () => {
    const target = listRef.value.find((l) => syncronizer.isTarget(l))
    if (target) {
      Object.assign(target, syncData.value)
    }
  })

  watch(syncDeleted, () => {
    const targetIndex = listRef.value.findIndex((l) => syncronizer.isTarget(l))
    if (targetIndex >= 0) {
      listRef.value.splice(targetIndex, 1)
    }
  })

  return {
    serviceList: listRef,
    loading,
    loadServiceList,
    changeServicesPosition
  }
}
