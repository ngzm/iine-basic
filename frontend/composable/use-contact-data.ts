import { reactive } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-types'
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
  image: {
    url: '',
    lgSize: 'cover',
    smSize: 'cover',
    lgPosition: 'center',
    smPosition: 'center',
  },
  position: 0,
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
    deleteData,
    getRecentData,
  } = useContent<ContactType>(apiEndpoint, initContact, syncronizer)

  return {
    contact: dataReactive,
    loading,
    notFound,
    endLoading,
    loadContact: loadData,
    createContact: createData,
    updateContact: updateData,
    deleteContact: deleteData,
    getRecentData,
  }
}
