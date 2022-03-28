import { reactive } from '@nuxtjs/composition-api'
import { EyecatchType } from '@/types/content-type'
import { useContent, ContentSynchronizer } from '~/composable/use-content'

const apiEndpoint = '/eyecatch'
const syncronizer = reactive(new ContentSynchronizer<EyecatchType>())
const initEyecatch = (): EyecatchType => ({
  id: 0,
  userId: 0,
  title: '',
  subtitle: '',
  image: ''
})

/**
 * Use Service Data
 */
export const useEyecatchData = (userId: number = 0) => {
  const {
    dataReactive,
    loading,
    loadData,
    updateData,
  } = useContent<EyecatchType>(
    userId,
    apiEndpoint,
    initEyecatch,
    syncronizer
  )

  return {
    eyecatch: dataReactive,
    loading,
    loadEyecatch: loadData,
    updateEyecatch: updateData
  }
}


// const syncronizer = reactive(new ContentSynchronizer<EyecatchType>())
// const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

// /**
//  * Use Eyecatch Data
//  */
// export const useEyecatchData = (userId: number = 0) => {
//   const { dispatch } = useStore()
//   const dataReactive = reactive<EyecatchType>(initEyecatch())
//   const loading = ref(false)
//   const dataRef= computed(() => dataReactive)

//   const loadEyecatch = async (eyecatchId: number) => {
//     await dispatch('buzy/runBuzyJob', {
//       job: async () => {
//         loading.value = true
//         Object.assign(dataReactive, await fetchEyecatch(userId, eyecatchId))
//         loading.value = false
//       }
//     })
//   }

//   const updateEyecatch = async (updateData: EyecatchType, imageFile: File | null) => {
//     await dispatch('buzy/runBuzyJob', {
//       job: async () => {
//         loading.value = true
//         syncronizer.onUpdated(await saveEyecatch(updateData, imageFile))
//         loading.value = false
//       }
//     })
//   }

//   watch(syncUpdated, () => {
//     if (syncronizer.isTarget(dataReactive)) {
//       Object.assign(dataReactive, syncData.value)
//     }
//   })

//   return {
//     eyecatch: dataRef,
//     loading,
//     loadEyecatch,
//     updateEyecatch
//   }
// }

