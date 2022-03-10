import {
  SyncronizerFunction,
  Syncronizer,
  SaverFunction,
  LoaderFunction,
  ComparerFunction,
} from '@/types/use-content-handler'

/**
 * データ更新時に既にロードされた同じデータを更新する
 * ために必要なクラス
 */
export class UpdateSyncronizer<T> {
  synchronizers: Syncronizer<T>[]
  synchronizerId: number

  constructor() {
    this.synchronizers = []
    this.synchronizerId = 0
  }

  addSyncronizeFunc(func: SyncronizerFunction<T>): number {
    this.synchronizers.push({ id: ++this.synchronizerId, func })
    return this.synchronizerId
  }

  removeSyncronizeFunc(id: number): void {
    this.synchronizers = this.synchronizers.filter((s) => s.id !== id)
  }

  synchronize(updateData: T): void {
    this.synchronizers.forEach((s) => s.func(updateData))
  }
}

/**
 * コンテンツのロードやセーブに際する処理の雛形クラス
 */
export class ContentHandler<T> {
  contentData: T
  isLoading: boolean
  compareFunc: ComparerFunction<T>
  synchronizer: UpdateSyncronizer<T>
  synchronizerId: number

  constructor(
    synchronizer: UpdateSyncronizer<T>,
    compare: ComparerFunction<T>,
    content: T = {} as T
  ) {
    this.contentData = content
    this.isLoading = false
    this.compareFunc = compare
    this.synchronizer = synchronizer
    this.synchronizerId = this.synchronizer.addSyncronizeFunc(this.mergeContent)
  }

  destructor() {
    this.synchronizer.removeSyncronizeFunc(this.synchronizerId)
  }

  async loadContent(loader: LoaderFunction<T>) {
    this.isLoading = true
    this.contentData = await loader()
    this.isLoading = false
  }

  async createContent(saver: SaverFunction<T>) {
    this.isLoading = true
    this.contentData = await saver()
    this.synchronizer.synchronize(this.contentData)
    this.isLoading = false
  }

  async updateContent(saver: SaverFunction<T>) {
    this.isLoading = true
    this.contentData = await saver()
    this.synchronizer.synchronize(this.contentData)
    this.isLoading = false
  }

  // this を束縛しないように絶対にアロー関数
  mergeContent = (updateData: T): void => {
    if (this.compareFunc(this.contentData, updateData)) {
      this.contentData = updateData
    }
  }
}

/**
 * コンテンツリストのロードやセーブに際する処理の雛形クラス
 */
export class ContentListHandler<T> {
  contentListData: T[]
  isLoading: boolean
  compareFunc: ComparerFunction<T>
  synchronizer: UpdateSyncronizer<T>
  synchronizerId: number

  constructor(
    synchronizer: UpdateSyncronizer<T>,
    compare: ComparerFunction<T>,
    contentList: T[] = []
  ) {
    this.contentListData = contentList
    this.isLoading = false
    this.compareFunc = compare
    this.synchronizer = synchronizer
    this.synchronizerId = this.synchronizer.addSyncronizeFunc(this.mergeMatchContent)
  }

  destructor() {
    this.synchronizer.removeSyncronizeFunc(this.synchronizerId)
  }

  async searchContentList(loader: LoaderFunction<T[]>) {
    this.isLoading = true
    this.contentListData = await loader()
    this.isLoading = false
  }

  // this を束縛しないように絶対にアロー関数
  mergeMatchContent = (updateData: T): void => {
    const target = this.contentListData.find((c) => this.compareFunc(c, updateData))
    if (target) {
      Object.assign(target, updateData)
    }
  }
}

