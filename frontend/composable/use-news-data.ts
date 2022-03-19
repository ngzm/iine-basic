import { reactive, ref, toRefs, computed, watch, useStore } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { initContent, ContentSynchronizer } from '@/composable/content-helper'
import { fetchNews, saveNews, removeNews } from '@/utils/data-service'

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
  const createNews = async (createData: NewsType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onCreated(await saveNews(createData, imageFile))
        loading.value = false
      }
    })
    commit('news/addToNewsList', syncData.value)
  }

  const updateNews = async (updateData: NewsType, imageFile: File | null) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        syncronizer.onUpdated(await saveNews(updateData, imageFile))
        loading.value = false
      }
    })
    commit('news/mergeToNewsList', syncData.value)
  }

  const deleteNews = async (id: number) => {
    await dispatch('buzy/runBuzyJob', {
      job: async () => {
        loading.value = true
        await removeNews(id)
        syncronizer.onUpdated({ ...dataReactive as NewsType, removed: true })
        loading.value = false
      }
    })
    commit('news/reoveFromNewsList', id)
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
    createNews,
    updateNews,
    deleteNews
  }
}

/**
 * Use News List stored using vuex state
 */
export const useStoreNewsList = (userId: number = 0, limit: number = 10) => {
  const { getters, dispatch } = useStore()

  const loading = ref(false)
  const offset = ref(limit)
  const storedList = computed(() => getters['news/newsList'])
  const newsList = computed(() => storedList.value.slice(0, offset.value))

  const loadNewsList = async () => {
    offset.value = limit
    await dispatch('buzy/runBuzyJob', { job: fetchNewsList })
  }

  const loadMoreNewsList = async () => {
    let newOffset = offset.value + limit
    if (newOffset > storedList.value.length) newOffset = storedList.value.length
    offset.value = newOffset

    await dispatch('buzy/runBuzyJob', { job: fetchNewsList })
  }

  const fetchNewsList = async () => {
    if (getters['news/isFetched']) return

    loading.value = true
    await dispatch('news/fetchNewsList', { userId, maxLimit: 1000 })
    loading.value = false
  }

  return {
    newsList,
    loading,
    loadNewsList,
    loadMoreNewsList
  }
}
