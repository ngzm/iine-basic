import { reactive, ref, computed, watch } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
import { initContent } from '@/composable/content-helper'
import { fetchInformation, saveInformation } from '@/utils/data-service'

const initInformation = () => ({ ...initContent() })

const synchronizer = ref(false)
const syncronizeData = ref({} as InformationType)

/**
 * Use Information Data
 */
export const useInformationData = (userId: number = 0) => {
  const dataReactive = reactive<InformationType>(initInformation())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadInformation = async (informationId: number) => {
    loading.value = true
    const fetchedData = await fetchInformation(userId, informationId)
    Object.assign(dataReactive, fetchedData)
    loading.value = false
  }

  const updateInformation = async (updateData: InformationType, imageFile: File | null) => {
    loading.value = true
    const savedData = await saveInformation(updateData, imageFile)

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
    information: dataRef,
    loading,
    loadInformation,
    updateInformation
  }
}
