import { reactive, watch, useContext, toRefs } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-types'
import { useContent } from '@/composable/use-content'
import { ContentSynchronizer } from '@/composable/use-content/syncronizer'
import { useCurrentCustomer } from '@/composable/use-current-customer'

const apiEndpoint = '/newses'
const syncronizer = reactive(new ContentSynchronizer<NewsType>())
const initNews = (): NewsType => ({
  id: 0,
  title: '',
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
  category: '',
  publishOn: new Date(),
})

/**
 * Use News Data
 */
export const useNewsData = () => {
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
  } = useContent<NewsType>(
    apiEndpoint,
    initNews,
    syncronizer as ContentSynchronizer<NewsType>
  )

  return {
    news: dataReactive,
    newsImage: imageReactive,
    loading,
    notFound,
    endLoading,
    loadNews: loadData,
    createNews: createData,
    updateNews: updateData,
    deleteNews: deleteData,
    getRecentData,
    changeImageSetting,
  }
}

/**
 * Use News List Data
 */
export const useNewsList = () => {
  const { $axios } = useContext()
  const {
    listRef,
    loading,
    notFound,
    listLimit,
    startLoading,
    endLoading,
    resetNotFound,
    warnNotFound,
  } = useContent<NewsType>(
    apiEndpoint,
    initNews,
    syncronizer as ContentSynchronizer<NewsType>
  )
  const { customerId } = useCurrentCustomer()
  const { syncCreated, syncUpdated } = toRefs(syncronizer)

  const loadNewsList = async () => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(`${apiEndpoint}/list`, {
      params: {
        customerId,
        limit: listLimit.value,
      },
    })
    if (!data || data.length < 1) warnNotFound()

    listRef.value = data
    endLoading()
  }

  // data syncronizer watch functions
  watch(syncCreated, async () => {
    await loadNewsList()
  })
  watch(syncUpdated, async () => {
    await loadNewsList()
  })

  return {
    newsList: listRef,
    loading,
    notFound,
    loadNewsList,
    listLimit,
  }
}
