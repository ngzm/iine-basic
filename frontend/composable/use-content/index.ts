import {
  ref,
  reactive,
  toRefs,
  watch,
  useContext,
  Ref,
} from '@nuxtjs/composition-api'
import debounce from 'lodash/debounce'
import { ContentSynchronizer } from './syncronizer'
import { useContentLoading } from './loading'
import { useContentNotFound } from './not-found'
import {
  ContentType,
  ContentPosition,
  ImageSetting,
} from '@/types/content-types'
import { useCurrentCustomer } from '@/composable/use-current-customer'
import { useAuthenticated } from '@/composable/use-authenticated'

type IntilizerFunc<T> = () => T

/**
 * Use Contet Data
 */
export function useContent<T extends ContentType>(
  apiEndpoint: string,
  initializer: IntilizerFunc<T>,
  syncronizer: ContentSynchronizer<T>
) {
  const { $axios } = useContext()
  const { isAuthenticated } = useAuthenticated()
  const dataReactive = reactive<T>(initializer())
  const listRef = ref<T[]>([]) as Ref<T[]>
  const listLimit = ref(10)
  const imageReactive = reactive<ImageSetting>({
    url: '',
    lgSize: 'cover',
    smSize: 'cover',
    lgPosition: 'center',
    smPosition: 'center',
    lgParallax: false,
    smParallax: false,
  })

  // current customer
  const { customerId } = useCurrentCustomer()

  // data syncronizer watch functions
  const { syncCreated, syncUpdated, syncDeleted, syncPotisonChanged } =
    toRefs(syncronizer)

  // data loading
  const { loading, startLoading, endLoading } = useContentLoading()

  // data not Found (404) handler
  const { notFound, resetNotFound, warnNotFound } = useContentNotFound()

  const loadList = async () => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(apiEndpoint, {
      params: { customerId, limit: listLimit.value },
    })
    if (!data || data.length < 1) warnNotFound()

    listRef.value = data
    endLoading()
  }

  const loadData = async (dataId: number) => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(`${apiEndpoint}/${dataId}`, {
      params: { customerId },
    })
    if (!data?.id) warnNotFound()

    Object.assign(dataReactive, data)
    Object.assign(imageReactive, dataReactive.image ?? {})
    endLoading()
  }

  const getRecentData = async () => {
    startLoading()
    resetNotFound()

    const data = await $axios.$get(`${apiEndpoint}/recent`, {
      params: { customerId },
    })
    if (!data?.id) warnNotFound()

    endLoading()
    return data
  }

  const createData = async (newData: T, imageFile: File | null) => {
    if (!isAuthenticated) return

    startLoading()
    const sendData = { ...newData }

    // 最初に画像ファイルアップロード
    const formData = new FormData()
    if (imageFile) {
      formData.append('imagefile', imageFile)
      const imageUrl = await $axios.$post('/uploads/image', formData, {
        params: { customerId },
      })
      sendData.image = {
        url: imageUrl.fileUrl,
        lgSize: 'cover',
        smSize: 'cover',
        lgPosition: 'center',
        smPosition: 'center',
        lgParallax: false,
        smParallax: false,
      } as ImageSetting
    }

    // コンテンツデータ登録
    const response = await $axios.$post(apiEndpoint, sendData, {
      params: { customerId },
    })

    syncronizer.onCreated(response)
    endLoading()
  }

  const updateData = async (
    dataId: number,
    modData: T,
    imageFile: File | null
  ) => {
    if (!isAuthenticated) return

    startLoading()
    resetNotFound()
    const sendData = { ...modData }

    // 最初に画像ファイルアップロード
    const formData = new FormData()
    if (imageFile) {
      formData.append('imagefile', imageFile)
      const imageUrl = await $axios.$post('/uploads/image', formData, {
        params: { customerId },
      })
      sendData.image = {
        url: imageUrl.fileUrl,
        lgSize: 'cover',
        smSize: 'cover',
        lgPosition: 'center',
        smPosition: 'center',
        lgParallax: false,
        smParallax: false,
      } as ImageSetting
    }

    // コンテンツデータ更新
    const response = await $axios.$put(`${apiEndpoint}/${dataId}`, sendData, {
      params: { customerId },
    })
    if (!response || !response.id) warnNotFound()

    syncronizer.onUpdated(response)
    endLoading()
  }

  const deleteData = async (dataId: number) => {
    if (!isAuthenticated) return

    startLoading()
    await $axios.delete(`${apiEndpoint}/${dataId}`, {
      params: { customerId },
    })
    syncronizer.onDeleted(dataReactive as T)
    endLoading()
  }

  const changePositions = async (changedList: T[]) => {
    // 画面がチラチラするので最初に変更された配列をセットしておく
    listRef.value = changedList

    const positions: ContentPosition[] = changedList.map(
      (d, i) => ({ id: d.id, position: i + 1 } as ContentPosition)
    )
    if (isAuthenticated) {
      listRef.value = await $axios.$put(`${apiEndpoint}/positions`, positions, {
        params: { customerId },
      })
    }
    syncronizer.onPotisonChanged(positions)
  }

  const changeImageSetting = debounce(
    async (dataId: number, imageSetting: ImageSetting) => {
      if (!isAuthenticated) return

      resetNotFound()
      const response = await $axios.$put(
        `${apiEndpoint}/${dataId}/image-setting`,
        imageSetting,
        { params: { customerId } }
      )
      if (!response || !response.id) warnNotFound()

      syncronizer.onUpdated(response as T)
    },
    600
  )

  watch(syncCreated, async () => {
    if (process.client) {
      // リストリロード
      await loadList()

      if (notFound) {
        // トップ画像が何も登録されていない状態 (notFound) で、
        // 新たにデータが追加された時
        // この場合は、追加されたデータをロードする
        await loadData(syncronizer.syncData.id)
      }
    }
  })

  watch(syncUpdated, () => {
    const target = listRef.value.find((d) => syncronizer.isTarget(d))
    if (target) {
      Object.assign(target, syncronizer.syncData)
    }

    if (syncronizer.isTarget(dataReactive as T)) {
      Object.assign(dataReactive, syncronizer.syncData)
      Object.assign(imageReactive, dataReactive?.image ?? {})
    }
  })

  watch(syncDeleted, () => {
    const targetIndex = listRef.value.findIndex((d) => syncronizer.isTarget(d))
    if (targetIndex >= 0) {
      listRef.value.splice(targetIndex, 1)
    }

    if (syncronizer.isTarget(dataReactive as T)) {
      const id = dataReactive.id
      Object.assign(dataReactive, initializer(), { id })
      Object.assign(imageReactive, dataReactive?.image ?? {})
    }
  })

  watch(syncPotisonChanged, () => {
    listRef.value.forEach((d) => {
      const modPosition = syncronizer.syncPositionObj[d.id]
      if (modPosition !== undefined || modPosition !== null) {
        d.position = modPosition
      }
    })

    const modPosition = syncronizer.syncPositionObj[dataReactive.id]
    if (modPosition !== undefined || modPosition !== null) {
      dataReactive.position = modPosition
    }
  })

  return {
    dataReactive,
    imageReactive,
    listRef,
    listLimit,
    loading,
    startLoading,
    endLoading,
    notFound,
    resetNotFound,
    warnNotFound,
    loadList,
    loadData,
    getRecentData,
    createData,
    updateData,
    deleteData,
    changePositions,
    changeImageSetting,
  }
}
