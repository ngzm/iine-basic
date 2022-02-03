import { ref, reactive } from '@nuxtjs/composition-api'
import { ServiceType } from '@/types/content-type'
import { initContent } from '@/composable/content'

export default ( /* userId */ ) => {
  const service: ServiceType = reactive(initService())
  const loadService = (/* id: number */) => {
    /* not implimented */
  }

  const services = ref([] as ServiceType[])
  const loadServices = () => {
    const fetchData = fetchServices()
    services.value.push(...fetchData);
  }

  return {
    initService,
    service,
    loadService,
    services,
    loadServices,
  }
}

const initService = (): ServiceType => ({ ...initContent() })
const fetchServices = (): ServiceType[] => ([
  {
    id: 1,
    title: 'AWSクラウド導入',
    image: 'https://longlivenet.com/static/images/s-service-aws.jpg',
    comment: '代表ナガズミはアマゾンウェブサービスジャパン (AWS) のエンジニアとしての経歴がございます。そのキャリアによる技術知見を元に適切なサポートをご提供いたします。'
  },
  {
    id: 2,
    title: 'ソフトウェア開発',
    image: 'https://longlivenet.com/static/images/s-service-system.jpg',
    comment: 'お客様のWebアプリケーションなど各種ソフトウェア開発を行います。上流工程から下流工程まで、また、PM や PMO 業務などの開発管理につきましてもお気軽にご相談ください。'
  },
  {
    id: 3,
    title: '技術顧問',
    image: 'https://longlivenet.com/static/images/s-service-advisor.jpg',
    comment: '特に AWS を前提とするシステムアーキテクチャについて、または開発や組織のマネージメント強化、あるいは技術者育成や環境整備といった内容についてご相談いただけます。'
  },
  {
    id: 4,
    title: 'ホームページ作成',
    image: 'https://longlivenet.com/static/images/s-service-hp.jpg',
    comment: 'PC からスマホまでレスポンシブなデザインのホームページを作成いたします。またチャットなどインタラクティブな Web サイトの開発についてもぜひご相談ください。'
  },
  {
    id: 5,
    title: 'ITエンジニア育成',
    image: 'https://longlivenet.com/static/images/s-service-education.jpg',
    comment: 'インドや中国出身のグローバルで活躍するエンジニアが増えていますが、我が国出身のエンジニアはまだまだ少ないように思えます。グローバルに活躍できるエンジニアの育成は、ロングリブネットにおける今後の大きなビジョンです。'
  },
  {
    id: 6,
    title: '各種IT相談',
    image: 'https://longlivenet.com/static/images/s-service-consul.jpg',
    comment: '組織におけるビジネスシステムを設計しているが現構成で大丈夫か不安、新たなシステム責任者となったが協力会社から提案された内容が正しいのか判断つかない、このようなご相談をプロ目線にてお受けします。1時間単位でご相談いただけます。'
  },
])
