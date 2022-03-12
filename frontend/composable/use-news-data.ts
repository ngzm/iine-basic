import { reactive, ref, computed, watch, useStore } from '@nuxtjs/composition-api'
import { NewsType } from '@/types/content-type'
import { initContent } from '@/composable/content-helper'
import { fetchNews, saveNews } from '@/utils/data-service'

const initNews = (): NewsType => ({
  ...initContent(),
  category: '',
  publishOn: new Date(),
})

const synchronizer = ref(false)
const syncronizeData = ref({} as NewsType)

/**
 * Use News Data
 */
export const useNewsData = (userId: number = 0) => {
  const { commit } = useStore()
  const newsData = reactive<NewsType>(initNews())
  const loading = ref(false)
  const newsRef= computed(() => newsData)

  const loadNews = async (newsId: number) => {
    loading.value = true
    const fetchedData = await fetchNews(userId, newsId)
    Object.assign(newsData, fetchedData)
    loading.value = false
  }

  const updateNews = async (updateData: NewsType, imageFile: File | null) => {
    loading.value = true
    const savedData = await saveNews(updateData, imageFile)

    // 同期フラグを変更
    syncronizeData.value = savedData
    synchronizer.value = !synchronizer.value

    // Store データを更新
    commit('news/mergeNewsList', savedData)
    loading.value = false
  }

  watch(synchronizer, () => {
    if (syncronizeData.value && syncronizeData.value.id === newsData.id) {
      Object.assign(newsData, syncronizeData.value)
    }
  })

  return {
    news: newsRef,
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

  const newsListRef = ref([] as NewsType[])
  const loading = ref(false)
  let offset: number = 0

  const loadNewsList = async (limit: number = 10) => {
    if (!storedList.value || storedList.value.length <= 0) {
      loading.value = true
      await dispatch('news/fetchNewsList', { userId, maxLimit: 1000 })
      loading.value = false
    }
    offset = limit
    newsListRef.value = storedList.value.slice(0, offset)
  }

  const loadMoreNewsList = async (limit: number = 10) => {
    if (!storedList.value || storedList.value.length <= 0) {
      loading.value = true
      await dispatch('news/fetchNewsList', { userId, maxLimit: 1000 })
      loading.value = false
    }
    offset += limit
    if (offset > storedList.value.length) offset = storedList.value.length
    newsListRef.value = storedList.value.slice(0, offset)
  }

  return {
    newsList: newsListRef,
    loading,
    loadNewsList,
    loadMoreNewsList
  }
}
