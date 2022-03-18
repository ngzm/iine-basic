import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchNews, saveNews } from '@/utils/data-service'

const initNews = (): NewsType => ({
  ...initContent(),
  category: '',
  publishOn: new Date(),
})

const syncronizer = reactive(new ContentSynchronizer<NewsType>())
const { /* syncCreated,  */ syncUpdated, syncData } = toRefs(syncronizer)

/**
 * Use News Data
 */
export const useNewsData = (userId: number = 0) => {
  const { commit, dispatch } = useStore()
  const dataReactive = reactive<NewsType>(initNews())
  const loading = ref(false)
  const dataRef= computed(() => dataReactive)

  const loadNews = async (newsId: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        Object.assign(dataReactive, await fetchNews(userId, newsId))
        loading.value = false
      }
    })
  }

  const updateNews = async (updateData: NewsType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onUpdated(await saveNews(updateData, imageFile))
        loading.value = false
      }
    })

    // Store データを更新
    commit('news/mergeNewsList', syncData.value)
  }

  watch(syncUpdated, () => {
    if (syncronizer.shouldUpdate(dataReactive as NewsType)) {
      Object.assign(dataReactive, syncData.value)
    }
  })

  return {
    news: dataRef,
    loading,
    loadNews,
    updateNews
  }
}

/**
 * Use News List stored using vuex state
 */
export const useStoreNewsList = (userId: number = 0) => {
  const { getters, dispatch } = useStore()
  const storedList = computed(() => getters['news/newsList'])

  const listRef = ref([] as NewsType[])
  const loading = ref(false)
  let offset: number = 0

  const loadNewsList = async (limit: number = 10) => {
    await dispatch('buzy/runBuzyJob', { job: fetchNewsList })
    offset = limit
    listRef.value = storedList.value.slice(0, offset)
  }

  const loadMoreNewsList = async (limit: number = 10) => {
    await dispatch('buzy/runBuzyJob', { job: fetchNewsList })
    offset += limit
    if (offset > storedList.value.length) offset = storedList.value.length
    listRef.value = storedList.value.slice(0, offset)
  }

  const fetchNewsList = async () => {
    if (getters['news/isFetched']) return

    loading.value = true
    await dispatch('news/fetchNewsList', { userId, maxLimit: 1000 })
    loading.value = false
  }

  return {
    newsList: listRef,
    loading,
    loadNewsList,
    loadMoreNewsList
  }
}
