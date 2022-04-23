import { ref, reactive, watch, useContext, Ref } from '@nuxtjs/composition-api'
import { useContentSyncronizer, ContentSynchronizer } from './syncronizer'
import { useContentLoading } from './loading'
import { useContentNotFound } from './not-found'
import { ContentType, ContentPosition } from '@/types/content-type'
import { useCurrentCustomer } from '@/composable/use-current-customer'

type IntilizerFunc<T> = () => T

/**
 * Use Contet Data
 */
export function useContent<T extends ContentType>(apiEndpoint: string, initializer: IntilizerFunc<T>, syncronizer: ContentSynchronizer<T>) {
  const { $axios, $auth } = useContext()
  const dataReactive = reactive<T>(initializer())
  const listRef = ref<T[]>([]) as Ref<T[]>
  const listLimit = ref(10)

  // current customer
  const { customerId } = useCurrentCustomer()

  // data syncronizer watch functions
  useContentSyncronizer(syncronizer, dataReactive, listRef)

  // data loading
  const { loading, startLoading, endLoading } = useContentLoading()

  // data not Found (404) handler
  const { notFound, resetNotFound, warnNotFound } = useContentNotFound()

  const loadList = async () => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(apiEndpoint, { params: { customerId, limit: listLimit.value } })
    if (!data || data.length < 1) warnNotFound()

    listRef.value = data
    endLoading()
  }

  const loadData = async (dataId: number) => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(`${apiEndpoint}/${dataId}`, { params: { customerId } })
    if (!data || !data.id) warnNotFound()

    Object.assign(dataReactive, data)
    endLoading()
  }

  const createData = async (newData: T, imageFile: File | null) => {
    startLoading()
    let sendData = { ...newData }

    if ($auth.loggedIn) {
      // 最初に画像ファイルアップロード
      const formData = new FormData()
      if (imageFile) {
        formData.append("imagefile", imageFile)
        const imageUrl = await $axios.$post('/uploads/image', formData, { params: { customerId } })
        sendData.image = imageUrl.fileUrl
      }
      // コンテンツデータ登録
      sendData = await $axios.$post(apiEndpoint, sendData, { params: { customerId } })
    }

    syncronizer.onCreated(sendData)
    endLoading()
   }

  const updateData = async (dataId: number, modData: T, imageFile: File | null) => {
    startLoading()
    resetNotFound()
    let sendData = { ...modData }

    if ($auth.loggedIn) {
      // 最初に画像ファイルアップロード
      const formData = new FormData()
      if (imageFile) {
        formData.append("imagefile", imageFile)
        const imageUrl = await $axios.$post('/uploads/image', formData, { params: { customerId } })
        sendData.image = imageUrl.fileUrl
      }
      // コンテンツデータ更新
      const data = await $axios.$put(`${apiEndpoint}/${dataId}`, sendData, { params: { customerId } })
      if (!data || !data.id) warnNotFound()

      sendData = data
    }

    syncronizer.onUpdated(sendData)
    endLoading()
  }

  const deleteData = async (dataId: number) => {
    startLoading()
    if ($auth.loggedIn) {
      await $axios.delete(`${apiEndpoint}/${dataId}`, { params: { customerId } })
    }
    syncronizer.onDeleted(dataReactive as T)
    endLoading()
  }

  const changePositions = async (changedList: T[]) => {
    // 画面がチラチラするので最初に変更された配列をセットしておく
    listRef.value = changedList

    const positions: ContentPosition[] = changedList.map((d, i) => ({ id: d.id, position: i + 1 } as ContentPosition))
    if ($auth.loggedIn) {
      listRef.value = await $axios.$put(`${apiEndpoint}/positions`, positions, { params: { customerId } })
    }
    syncronizer.onPotisonChanged(positions)
  }

  watch(() => syncronizer.syncCreated, () => {
    // トップ画像が何も登録されていない状態 (notFound) で、
    // 新たにデータが追加された時
    // この場合は、追加されたデータをロードする
    if (notFound) {
      loadData(syncronizer.syncData.id)
    }
  })

  return {
    dataReactive,
    listRef,
    listLimit,
    loading,
    notFound,
    startLoading,
    endLoading,
    loadList,
    loadData,
    createData,
    updateData,
    deleteData,
    changePositions,
  }
}
