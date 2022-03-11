import { reactive, toRefs, onUnmounted } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { ComparerFunction, LoaderFunction, SaverFunction } from '@/types/use-content-handler'
import { UpdateSyncronizer, ContentHandler, ContentListHandler } from '@/composable/content-handler'
import { initContent } from '@/composable/content-helper'

// データ更新時に既にロードされた同じデータを更新するシンクロナイザー
const updateSynchronizer = new UpdateSyncronizer<ServiceType>()

// データ比較メソッド
const compaerer: ComparerFunction<ServiceType> = (c1, c2) => (c1.id === c2.id)

// Serviceデータ初期化
const initService = (): ServiceType => ({ ...initContent() })

/**
 * Use Service Handler
 */
export const useServiceData = (userId: number = 0) => {
  const serviceHandler = reactive<ContentHandler<ServiceType>>(
    new ContentHandler<ServiceType>(updateSynchronizer, compaerer, initService())
  )

  const { contentData: service, isLoading: loading } = toRefs(serviceHandler)

  const loadService = async (serviceId: number) => {
    const loader: LoaderFunction<ServiceType> = () => fetchService(userId, serviceId)
    await serviceHandler.loadContent(loader)
  }

  const updateService = async (service: ServiceType, imageFile: File | null) => {
    const saver: SaverFunction<ServiceType> = () => modifyService(service, imageFile)
    await serviceHandler.updateContent(saver)
  }

  onUnmounted(() => {
    serviceHandler.destructor()
  })

  return {
    service,
    loading,
    loadService,
    updateService
  }
}

/**
 * Use ServiceList Handler
 */
 export const useServiceList = (userId: number = 0) => {
  const serviceListHandler = reactive<ContentListHandler<ServiceType>>(
    new ContentListHandler<ServiceType>(updateSynchronizer, compaerer, [])
  )

  const { contentListData: serviceList, isLoading: loading } = toRefs(serviceListHandler)

  const loadServiceList = async (limit: number = 20) => {
    const loader: LoaderFunction<ServiceType[]> = () => fetchServiceList(userId, limit)
    await serviceListHandler.searchContentList(loader)
  }

  const loadMoreServiceList = async (limit: number = 20) => {
    const loader: LoaderFunction<ServiceType[]> = () => fetchServiceList(userId, limit)
    await serviceListHandler.searchContentList(loader)
  }

  onUnmounted(() => {
    serviceListHandler.destructor()
  })

  return {
    serviceList,
    loading,
    loadServiceList,
    loadMoreServiceList
  }
}

/**
 * テスト用データと操作メソッド
 * 
 */

const fetchList = (): ServiceType[] => ([
  {
    id: 1,
    title: 'AWSクラウド導入',
    image: 'https://longlivenet.com/static/images/s-service-aws.jpg',
    body: '代表ナガズミはアマゾンウェブサービスジャパン (AWS) のエンジニアとしての経歴がございます。そのキャリアによる技術知見を元に適切なサポートをご提供いたします。'
  },
  {
    id: 2,
    title: 'ソフトウェア開発',
    image: 'https://longlivenet.com/static/images/s-service-system.jpg',
    body: 'お客様のWebアプリケーションなど各種ソフトウェア開発を行います。上流工程から下流工程まで、また、PM や PMO 業務などの開発管理につきましてもお気軽にご相談ください。'
  },
  {
    id: 3,
    title: '技術顧問',
    image: 'https://longlivenet.com/static/images/s-service-advisor.jpg',
    body: '特に AWS を前提とするシステムアーキテクチャについて、または開発や組織のマネージメント強化、あるいは技術者育成や環境整備といった内容についてご相談いただけます。'
  },
  {
    id: 4,
    title: 'ホームページ作成',
    image: 'https://longlivenet.com/static/images/s-service-hp.jpg',
    body: 'PC からスマホまでレスポンシブなデザインのホームページを作成いたします。またチャットなどインタラクティブな Web サイトの開発についてもぜひご相談ください。'
  },
  {
    id: 5,
    title: 'ITエンジニア育成',
    image: 'https://longlivenet.com/static/images/s-service-education.jpg',
    body: 'インドや中国出身のグローバルで活躍するエンジニアが増えていますが、我が国出身のエンジニアはまだまだ少ないように思えます。グローバルに活躍できるエンジニアの育成は、ロングリブネットにおける今後の大きなビジョンです。'
  },
  {
    id: 6,
    title: '各種IT相談',
    image: 'https://longlivenet.com/static/images/s-service-consul.jpg',
    body: '組織におけるビジネスシステムを設計しているが現構成で大丈夫か不安、新たなシステム責任者となったが協力会社から提案された内容が正しいのか判断つかない、このようなご相談をプロ目線にてお受けします。1時間単位でご相談いただけます。'
  },
])

const fetchData = (id: number = 1): ServiceType|undefined => {
  const list = fetchList()
  return list.find((i) => i.id === id)
}

const fetchServiceList = (userId: number, limit: number): Promise<ServiceType[]> => {
  console.log(userId)
  console.log(limit)

  return new Promise((resolve) => setTimeout(() => {
    const serviceList: ServiceType[] = fetchList()
    resolve(serviceList)
  }, 1000)) 
}

const fetchService = (userId: number, serviceId: number): Promise<ServiceType> => {
  console.log(userId, serviceId)

  return new Promise((resolve) => setTimeout(() => {
    const service: ServiceType = fetchData(serviceId) || initService()
    resolve(service)
  }, 1000)) 
}

const modifyService = (updateService: ServiceType, imageFile: File | null): Promise<ServiceType> => {
  return new Promise((resolve) => setTimeout(() => {
    const service: ServiceType = { ...updateService }
    if (imageFile) {
      Object.assign(service, { image: URL.createObjectURL(imageFile) })
    }
    resolve(service)
  }, 1000))
}
