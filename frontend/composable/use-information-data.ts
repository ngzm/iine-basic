import { reactive } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
import { useContent } from '@/composable/use-content2'
import { ContentSynchronizer } from '@/composable/use-content2/syncronizer'

const apiEndpoint = '/informations'
const syncronizer = reactive(new ContentSynchronizer<InformationType>())
const initInformation = () => ({
  id: 0,
  customerId: 0,
  title: '',
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



// import { initContent, ContentSynchronizer } from '@/composable/content-helper'
// import { fetchInformation, saveInformation } from '@/utils/data-information'

// const initInformation = () => ({ ...initContent() })

// const syncronizer = reactive(new ContentSynchronizer<InformationType>())
// const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

// /**
//  * Use Information Data
//  */
// export const useInformationData = (customerId: number = 0) => {
//   const { dispatch } = useStore()
//   const dataReactive = reactive<InformationType>(initInformation())
//   const loading = ref(false)
//   const dataRef= computed(() => dataReactive)

//   const loadInformation = async (informationId: number) => {
//     await dispatch('buzy/runBuzyJob', {
//       job: async () => {
//         loading.value = true
//         Object.assign(dataReactive, await fetchInformation(customerId, informationId))
//         loading.value = false
//       }
//     })
//   }

//   const updateInformation = async (updateData: InformationType, imageFile: File | null) => {
//     await dispatch('buzy/runBuzyJob', {
//       job: async () => {
//         loading.value = true
//         syncronizer.onUpdated(await saveInformation(updateData, imageFile))
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
//     information: dataRef,
//     loading,
//     loadInformation,
//     updateInformation
//   }
// }
