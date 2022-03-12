import { reactive, ref, computed, watch } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import { initContent } from '@/composable/content-helper'
import { fetchContact, saveContact } from '@/utils/data-service'

const initContact = () => ({ ...initContent() })

const synchronizer = ref(false)
const syncronizeData = ref({} as ContactType)

/**
 * Use Contact Data
 */
export const useContactData = (userId: number = 0) => {
  const dataReactive = reactive<ContactType>(initContact())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadContact = async (contactId: number) => {
    loading.value = true
    const fetchedData = await fetchContact(userId, contactId)
    Object.assign(dataReactive, fetchedData)
    loading.value = false
  }

  const updateContact = async (updateData: ContactType, imageFile: File | null) => {
    loading.value = true
    const savedData = await saveContact(updateData, imageFile)

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
    contact: dataRef,
    loading,
    loadContact,
    updateContact
  }
}
