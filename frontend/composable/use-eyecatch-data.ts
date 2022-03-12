import { reactive, ref, computed, watch } from '@nuxtjs/composition-api'
import { EyecatchType } from '@/types/content-type'
import { fetchEyecatch, saveEyecatch } from '@/utils/data-service'

const initEyecatch = (): EyecatchType => ({ id: 0, title: '', subtitle: '', image: '' })
const synchronizer = ref(false)
const syncronizeData = ref({} as EyecatchType)

/**
 * Use Eyecatch Data
 */
export const useEyecatchData = (userId: number = 0) => {
  const dataReactive = reactive<EyecatchType>(initEyecatch())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadEyecatch = async (eyecatchId: number) => {
    loading.value = true
    const fetchedData = await fetchEyecatch(userId, eyecatchId)
    Object.assign(dataReactive, fetchedData)
    loading.value = false
  }

  const updateEyecatch = async (updateData: EyecatchType, imageFile: File | null) => {
    loading.value = true
    const savedData = await saveEyecatch(updateData, imageFile)

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
    eyecatch: dataRef,
    loading,
    loadEyecatch,
    updateEyecatch
  }
}
