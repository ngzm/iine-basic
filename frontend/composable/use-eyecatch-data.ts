import { reactive, toRefs, onUnmounted } from '@nuxtjs/composition-api'
import { EyecatchType } from '@/types/content-type'
import { ComparerFunction, LoaderFunction, SaverFunction } from '@/types/use-content-handler'
import { UpdateSyncronizer, ContentHandler } from '@/composable/use-content-handler'

// データ更新時に既にロードされた同じデータを更新するシンクロナイザー
const updateSynchronizer = new UpdateSyncronizer<EyecatchType>()

// データ比較メソッド
const compaerer: ComparerFunction<EyecatchType> = (c1, c2) => (c1.id === c2.id)

// Eyecatchデータ初期化
const initEyecatch = (): EyecatchType => ({ id: 0, title: '', subtitle: '', image: '' })

/**
 * Use Eyecatch Handler
 */
export const useEyecatchData = (userId: number = 0) => {
  const eyecatchHandler = reactive<ContentHandler<EyecatchType>>(
    new ContentHandler<EyecatchType>(updateSynchronizer, compaerer, initEyecatch())
  )

  const { contentData: eyecatch, isLoading: loading } = toRefs(eyecatchHandler)

  const loadEyecatch = async () => {
    const loader: LoaderFunction<EyecatchType> = () => fetchEyecatch(userId)
    await eyecatchHandler.loadContent(loader)
  }

  const updateEyecatch = async (eyecatch: EyecatchType, imageFile: File | null) => {
    const saver: SaverFunction<EyecatchType> = () => modifyEyecatch(eyecatch, imageFile)
    await eyecatchHandler.updateContent(saver)
  }

  onUnmounted(() => {
    eyecatchHandler.destructor()
  })

  return {
    eyecatch,
    loading,
    loadEyecatch,
    updateEyecatch
  }
}

/**
 * テスト用データと操作メソッド
 * 
 */
const fetchEyecatch = (userId: number = 1): Promise<EyecatchType> => {
  console.log(userId)

  return new Promise((resolve) => setTimeout(() => {
    const eyecatch: EyecatchType = {
      id: userId,
      title: '情報技術をチカラにしたい！',
      subtitle: 'ロングリブネットがサポートいたします',
      image: 'https://longlivenet.com/static/images/top01.jpg',
    }
    resolve(eyecatch)
  }, 1000)) 
}

const modifyEyecatch = (updateEyecatch: EyecatchType, imageFile: File | null): Promise<EyecatchType> => {
  return new Promise((resolve) => setTimeout(() => {
    const eyecatch: EyecatchType = { ...updateEyecatch }
    if (imageFile) {
      Object.assign(eyecatch,  { image: URL.createObjectURL(imageFile) })
    }
    resolve(eyecatch)
  }, 1000))
}