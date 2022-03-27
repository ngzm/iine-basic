import { ref, reactive, watch, useContext, useStore, Ref } from '@nuxtjs/composition-api'
import { ContentType, ContentPosition } from '@/types/content-type'

type IntilizerFunc<T> = () => T

/**
 * Use Service Data
 */
export function useContentCommon<T extends ContentType>(
  userId: number,
  apiEndpoint: string,
  initializer: IntilizerFunc<T>,
  syncronizer: ContentSynchronizer<T>
) {
  const { $axios } = useContext()
  const { dispatch } = useStore()

  const dataReactive = reactive<T>(initializer())
  const listRef = ref<T[]>([]) as Ref<T[]>
  const listLimit = ref(10)

  const loading = ref(false)
  const buzyId = dispatch('buzy/buzyId')

  const startLoading = () => {
    loading.value = true
    dispatch('buzy/buzyOn', buzyId)
  }

  const endLoading = () => {
    loading.value = false
    dispatch('buzy/buzyOff', buzyId)
  }

  const loadList = async () => {
    startLoading()
    listRef.value = await $axios.$get(apiEndpoint, { params: { userId, limit: listLimit.value } })
    endLoading()
  }

  const loadData = async (dataId: number) => {
    startLoading()
    const data = await $axios.$get(`${apiEndpoint}/${dataId}`, { params: { userId } })
    Object.assign(dataReactive, data)
    endLoading()
  }

  const createData = async (newData: T, imageFile: File | null) => {
    const formData = new FormData()
    formData.append('contentJson', JSON.stringify({ ...newData, userId }))
    if (imageFile) formData.append("imagefile", imageFile);
    
    startLoading()
    const data = await $axios.$post(apiEndpoint, formData, { params: { userId } })
    syncronizer.onCreated(data)
    endLoading()
   }

  const updateData = async (dataId: number, modData: T, imageFile: File | null) => {
    console.log(imageFile)

    startLoading()
    const data = await $axios.$put(`${apiEndpoint}/${dataId}`, modData, { params: { userId } })
    syncronizer.onUpdated(data)
    endLoading()
  }

  const deleteData = async (dataId: number) => {
    startLoading()
    await $axios.delete(`${apiEndpoint}/${dataId}`, { params: { userId } })
    syncronizer.onDeleted(dataReactive as T)
    endLoading()
  }

  const changePositions = async (changedList: T[]) => {
    // 画面がチラチラするので最初に変更された配列をセットしておく
    listRef.value = changedList

    const positions: ContentPosition[] = changedList.map((d, i) => ({ id: d.id, position: i + 1 } as ContentPosition))
    listRef.value = await $axios.$put(`${apiEndpoint}/positions`, positions, { params: { userId } })
    syncronizer.onPotisonChanged(positions)
  }

  watch(() => syncronizer.syncCreated, () => {
    listRef.value.push(syncronizer.syncData)
  })

  watch(() => syncronizer.syncUpdated, () => {
    const target = listRef.value.find((d) => syncronizer.isTarget(d))
    if (target) {
      Object.assign(target, syncronizer.syncData)
    }

    if (syncronizer.isTarget(dataReactive  as T)) {
      Object.assign(dataReactive, syncronizer.syncData)
    }
  })

  watch(() => syncronizer.syncDeleted, () => {
    const targetIndex = listRef.value.findIndex((d) => syncronizer.isTarget(d))
    if (targetIndex >= 0) {
      listRef.value.splice(targetIndex, 1)
    }

    if (syncronizer.isTarget(dataReactive  as T)) {
      Object.assign(dataReactive, { removed: true })
    }
  })

  watch(() => syncronizer.syncPotisonChanged, () => {
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
    $axios,
    dataReactive,
    listRef,
    listLimit,
    loading,
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

/**
 * Class - ContentSynchronizer
 * データ更新などの際にロードしている他のデータを
 * 同期して更新するためのクラス
 */
type PositionObj = { [key: number]: number}
export class ContentSynchronizer<T extends ContentType> {
  syncCreated: boolean
  syncUpdated: boolean
  syncDeleted: boolean
  syncPotisonChanged: boolean
  syncData: T
  syncPositionObj: PositionObj

  constructor() {
    this.syncCreated = false
    this.syncUpdated = false
    this.syncDeleted = false
    this.syncPotisonChanged = false
    this.syncData = {} as T
    this.syncPositionObj = {} as PositionObj
  }

  onCreated(data: T) {
    this.syncData = data
    this.syncCreated = !this.syncCreated
  }

  onUpdated(data: T) {
    this.syncData = data
    this.syncUpdated = !this.syncUpdated
  }

  onDeleted(data: T) {
    this.syncData = data
    this.syncDeleted = !this.syncDeleted
  }

  onPotisonChanged(positions: ContentPosition[]) {
    this.syncPositionObj = positions.reduce((target, key) => {
      target[key.id] = key.position
      return target
    }, {} as PositionObj)
    this.syncPotisonChanged = !this.syncPotisonChanged
  }

  isTarget(target: T) {
    return this.syncData.id && this.syncData.id === target.id
  }
}
