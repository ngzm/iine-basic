import { ContentType } from '@/types/content-type'

/**
 * ContentType 初期化データ
 */
export const initContent = (): ContentType => ({
  id: 0,
  title: '',
  subtitle: '',
  body: '',
  image: '',
  link: '',
})

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
 * データ更新・追加時に同期すべきデータも更新できる仕組みを提供
 */
export class ContentSynchronizer<T extends { id: number }> {
  syncCreated: boolean
  syncUpdated: boolean
  syncData: T

  constructor() {
    this.syncCreated = false
    this.syncUpdated = false
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

  shouldUpdate(target: T) {
    return this.syncData.id && this.syncData.id === target.id
  }
}
