import { ContentType, ContentPosition, PositionObj } from '@/types/content-type'
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

