import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchInformation, saveInformation } from '@/utils/data-service'

const initInformation = () => ({ ...initContent() })

const syncronizer = reactive(new ContentSynchronizer<InformationType>())
const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

/**
 * Use Information Data
 */
export const useInformationData = (userId: number = 0) => {
  const { dispatch } = useStore()
  const dataReactive = reactive<InformationType>(initInformation())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadInformation = async (informationId: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        Object.assign(dataReactive, await fetchInformation(userId, informationId))
        loading.value = false
      }
    })
  }

  const updateInformation = async (updateData: InformationType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onUpdated(await saveInformation(updateData, imageFile))
        loading.value = false
      }
    })
  }

  watch(syncUpdated, () => {
    if (syncronizer.isTarget(dataReactive)) {
      Object.assign(dataReactive, syncData.value)
    }
  })

  return {
    information: dataRef,
    loading,
    loadInformation,
    updateInformation
  }
}
