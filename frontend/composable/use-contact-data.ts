import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchContact, saveContact } from '@/utils/data-service'

const initContact = () => ({ ...initContent() })

const syncronizer = reactive(new ContentSynchronizer<ContactType>())
const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

/**
 * Use Contact Data
 */
export const useContactData = (userId: number = 0) => {
  const { dispatch } = useStore()
  const dataReactive = reactive<ContactType>(initContact())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadContact = async (contactId: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        Object.assign(dataReactive, await fetchContact(userId, contactId))
        loading.value = false
      }
    })
  }

  const updateContact = async (updateData: ContactType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onUpdated(await saveContact(updateData, imageFile))
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
    contact: dataRef,
    loading,
    loadContact,
    updateContact
  }
}
