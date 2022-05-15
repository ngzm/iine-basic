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
    lgParallax: false,
    smParallax: false,
  },
  position: 0,
})

/**
 * Use Contact Data
 */
export const useContactData = () => {
  const {
    dataReactive,
    imageReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData,
    getRecentData,
    changeImageSetting,
  } = useContent<ContactType>(apiEndpoint, initContact, syncronizer)

  return {
    contact: dataReactive,
    contactImage: imageReactive,
    loading,
    notFound,
    endLoading,
    loadContact: loadData,
    createContact: createData,
    updateContact: updateData,
    deleteContact: deleteData,
    getRecentData,
    changeImageSetting,
  }
}
