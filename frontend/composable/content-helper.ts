import { ContentType } from '@/types/content-type'

/**
 * データ種別 enum
 */
export const contentDataTypes = {
  eyecatch: 'eyecatch',
  information: 'information',
  news: 'news',
  service: 'service',
  work: 'work',
  contact: 'contact',
  menu: 'menu',
  none: 'none'
} as const

export type ContentDataType = typeof contentDataTypes[keyof typeof contentDataTypes];

/**
 * データ種別 enum
 */
export const contentActionTypes = {
 create: 'create',
 update: 'update',
 moddel: 'moddel',
 none: 'none'
} as const

export type ContentActionType = typeof contentActionTypes[keyof typeof contentActionTypes];






/**
 * ContentType 初期化データ
 */
 export const initContent = (): ContentType => ({
  id: 0,
  userId: 0,
  title: '',
  subtitle: '',
  body: '',
  image: '',
  link: '',
})




/**
 * データ更新・追加時に同期すべきデータも更新できる仕組みを提供
 */
export class ContentSynchronizer<T extends ContentType> {
  syncCreated: boolean
  syncUpdated: boolean
  syncDeleted: boolean
  syncData: T

  constructor() {
    this.syncCreated = false
    this.syncUpdated = false
    this.syncDeleted = false
    this.syncData = {} as T
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

  isTarget(target: T) {
    return this.syncData.id && this.syncData.id === target.id
  }
}
