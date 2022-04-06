import { watch, Ref, UnwrapRef } from '@nuxtjs/composition-api'
import { ContentType, ContentPosition, PositionObj } from '@/types/content-type'

/**
 * Use Contet Syncronizer
 */
export function useContentSyncronizer<T extends ContentType>(
  syncronizer: ContentSynchronizer<T>,
  dataReactive: UnwrapRef<T>,
  listRef: Ref<T[]>
) {
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
}

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

