import { reactive } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import { useContent } from '@/composable/use-content'
import { ContentSynchronizer } from '@/composable/use-content/syncronizer'

const apiEndpoint = '/contacts'
const syncronizer = reactive(new ContentSynchronizer<ContactType>())
const initContact = () => ({
  id: 0,
  customerId: 0,
  title: '',
  subtitle: '',
  body: '',
  image: '',
  position: 0
})

/**
 * Use Contact Data
 */
export const useContactData = () => {
  const {
    dataReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData
  } = useContent<ContactType>(
    apiEndpoint,
    initContact,
    syncronizer
  )

  return {
    contact: dataReactive,
    loading,
    notFound,
    endLoading,
    loadContact: loadData,
    createContact: createData,
    updateContact: updateData,
    deleteContact: deleteData 
  }
}




// import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
// import { ContactType } from '@/types/content-type'
// import { initContent, ContentSynchronizer } from '@/composable/content-helper'
// import { fetchContact, saveContact } from '@/utils/data-service'

// const initContact = () => ({ ...initContent() })

// const syncronizer = reactive(new ContentSynchronizer<ContactType>())
// const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

// /**
//  * Use Contact Data
//  */
// export const useContactData = (customerId: number = 0) => {
//   const { dispatch } = useStore()
//   const dataReactive = reactive<ContactType>(initContact())
//   const loading = ref(false)
//   const dataRef= computed(() => dataReactive)

//   const loadContact = async (contactId: number) => {
//     const job = async () => {
//       loading.value = true
//       Object.assign(dataReactive, await fetchContact(customerId, contactId))
//       loading.value = false
//     }
//     await dispatch('buzy/runBuzyJob', { job })
//   }

//   const updateContact = async (updateData: ContactType, imageFile: File | null) => {
//     const job = async () => {
//       loading.value = true
//       syncronizer.onUpdated(await saveContact(updateData, imageFile))
//       loading.value = false
//     }
//     await dispatch('buzy/runBuzyJob', { job })
//   }

//   watch(syncUpdated, () => {
//     if (syncronizer.isTarget(dataReactive)) {
//       Object.assign(dataReactive, syncData.value)
//     }
//   })

//   return {
//     contact: dataRef,
//     loading,
//     loadContact,
//     updateContact
//   }
// }
