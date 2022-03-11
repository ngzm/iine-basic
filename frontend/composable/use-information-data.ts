import { reactive, toRefs, onUnmounted } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
import { ComparerFunction, LoaderFunction, SaverFunction } from '@/types/use-content-handler'
import { UpdateSyncronizer, ContentHandler } from '@/composable/content-handler'
import { initContent } from '@/composable/content-helper'

// データ更新時に既にロードされた同じデータを更新するシンクロナイザー
const updateSynchronizer = new UpdateSyncronizer<InformationType>()

// データ比較メソッド
const compaerer: ComparerFunction<InformationType> = (c1, c2) => (c1.id === c2.id)

// Informationデータ初期化
const initInformation = (): InformationType => ({ ...initContent() })

/**
 * Use Information Handler
 */
export const useInformationData = (userId: number = 0) => {
  const informationHandler = reactive<ContentHandler<InformationType>>(
    new ContentHandler<InformationType>(updateSynchronizer, compaerer, initInformation())
  )

  const { contentData: information, isLoading: loading } = toRefs(informationHandler)

  const loadInformation = async (informationId: number) => {
    const loader: LoaderFunction<InformationType> = () => fetchInformation(userId, informationId)
    await informationHandler.loadContent(loader)
  }

  const updateInformation = async (information: InformationType, imageFile: File | null) => {
    const saver: SaverFunction<InformationType> = () => modifyInformation(information, imageFile)
    await informationHandler.updateContent(saver)
  }

  onUnmounted(() => {
    informationHandler.destructor()
  })

  return {
    information,
    loading,
    loadInformation,
    updateInformation
  }
}

/**
 * テスト用データと操作メソッド
 * 
 */

const fetchList = (): InformationType[] => ([
  {
    id: 1,
    title: 'システムデザインとか IT 活用とか正直どうしてよいかよく解らないんですよ・・',
    image: 'https://longlivenet.com/static/images/message01.jpg',
    body: `
      <p>多くの方よりこのような悩みをご相談をいただいた気がします</p> 
      <p>
      このような悩みを解決するには、その悩みに寄り添い適切な技術をご提供できることが第一です。<br/>
      一方で、お悩みをお持ちの方ご自身や組織自体にも情報技術を正しく知っていただき、自らしっかりと活用できるチカラをある程度養っていただくことも重要です。
      最終的には、これらの技術を自ら楽しんでご活用いただくようになる事が、長期継続的な悩みの解決に繋がるものと考えます。
      </p>
      <p>
      皆様のシステム開発やクラウド導入を行いつつ、お客様ご自身や組織のチカラを向上するお手伝いができればという想いからロングリブネットを立ち上げました。<br/>
      どうぞ長い目でお付き合い頂けますと幸いです。
      </p>
      <p>ロングリブネット<br>長住 直樹（ナガズミ ナオキ）</p>
      `
  }
])

const fetchData = (id: number): InformationType|undefined => {
  const list = fetchList()
  return list.find((i) => i.id === id)
}

const fetchInformation = (userId: number, informationId: number): Promise<InformationType> => {
  console.log(userId, informationId)

  return new Promise((resolve) => setTimeout(() => {
    const information: InformationType = fetchData(informationId) || initInformation()
    resolve(information)
  }, 1000)) 
}

const modifyInformation = (updateService: InformationType, imageFile: File | null): Promise<InformationType> => {
  return new Promise((resolve) => setTimeout(() => {
    const information: InformationType = { ...updateService }
    if (imageFile) {
      Object.assign(information, { image: URL.createObjectURL(imageFile) })
    }
    resolve(information)
  }, 1000))
}
