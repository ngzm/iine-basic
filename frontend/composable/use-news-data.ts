import { reactive } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { useContent } from '@/composable/use-content2'
import { ContentSynchronizer } from '@/composable/use-content2/syncronizer'

const apiEndpoint = '/newses'
const syncronizer = reactive(new ContentSynchronizer<NewsType>())
const initNews = (): NewsType => ({
  id: 0,
  title: '',
  body: '',
  image: '',
  category: '',
  publishOn: new Date(),
})

/**
 * Use News Data
 */
export const useNewsData = () => {
  const {
    dataReactive,
    loading,
    notFound,
    endLoading,
    loadData,
    createData,
    updateData,
    deleteData
  } = useContent<NewsType>(
    apiEndpoint,
    initNews,
    syncronizer as ContentSynchronizer<NewsType>
  )

  return {
    news: dataReactive,
    loading,
    notFound,
    endLoading,
    loadNews: loadData,
    createNews: createData,
    updateNews: updateData,
    deleteNews: deleteData 
  }
}

/**
 * Use News List Data
 */
export const useNewsList = () => {
  const {
    listRef,
    loading,
    notFound,
    loadList,
    listLimit
  } = useContent<NewsType>(
    apiEndpoint,
    initNews,
    syncronizer as ContentSynchronizer<NewsType>
  )

  return {
    newsList: listRef,
    loading,
    notFound,
    loadNewsList: loadList,
    listLimit
  }
}
