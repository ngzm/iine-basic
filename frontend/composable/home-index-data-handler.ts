import { reactive, ref } from '@nuxtjs/composition-api'
import {
  EyeCatchType,
  InformationType,
  NewsType,
  ServiceType,
  ContactType,
} from '@/types/content-type'

export default ( /* userId */ ) => {
  const eyeCatch: EyeCatchType = reactive({
    id: 0,
    title: '',
    subtitle: '',
    image: ''
  })
  const informations = ref([] as InformationType[] )
  const newses = ref([] as NewsType[])
  const services = ref([] as ServiceType[])
  const contact: ContactType = reactive({
    id: 0,
    title: '',
    subtitle: '',
    image: '',
    body: ''
  })

  const loadEyeCatch = () => {
    const fetchData = fetchEyeCatch()
    Object.assign(eyeCatch, fetchData)
  }

  const loadInformations = () => {
    const fetchData = fetchInformations()
    informations.value.push(...fetchData);
  }

  const loadNewses = () => {
    const fetchData = fetchNewses()
    newses.value.push(...fetchData)
  }

  const loadServices = () => {
    const fetchData = fetchServices()
    services.value.push(...fetchData)
  }

  const loadContact = () => {
    const fetchData = fetchContact()
    Object.assign(contact, fetchData)
  }

  return {
    eyeCatch,
    loadEyeCatch,
    informations,
    loadInformations,
    loadNewses,
    newses,
    services,
    loadServices,
    contact,
    loadContact
  }
}


// ============= TEST =======================
const fetchEyeCatch = (): EyeCatchType => ({
  id: 1,
  title: '情報技術をチカラにしたい！',
  subtitle: 'ロングリブネットがサポートいたします',
  image: 'https://longlivenet.com/static/images/top01.jpg',
})

const fetchInformations = (): InformationType[] => ([
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

const fetchContact = (): ContactType => ({
  id: 1,
  title: 'ご連絡はこちらまで',
  subtitle: 'お気軽にご相談ください',
  image: 'https://longlivenet.com/static/images/contact01.jpg',
  body: `
    <p>
      〒210-0007<br />
      神奈川県川崎市川崎区駅前本町11番地2 川崎フロンティアビル4階<br />
      ロングリブネット 長住直樹
    </p>
    <p>
      TEL: 050-5241-3096<br />
      URL: https://www.longlivenet.com/
    </p>
    `
})


const fetchNewses = (): NewsType[] => ([
  { id: 1, category: 'I', title: '当事業所のホームページを作成いたしました', publishOn: new Date('2020-02-23 10:00:00'.replace(/-/g, '/')) },
  { id: 2, category: 'S', title: '初仕事で開発したサイトがリリースされました', publishOn: new Date('2020-04-10 01:00:00'.replace(/-/g, '/')) },
  { id: 3, category: 'W', title: '開発したWebサイトがリリースされました', publishOn: new Date('2020-10-05 00:00:00'.replace(/-/g, '/')) },
  { id: 4, category: 'T', title: 'おかげさまで一周年です！', publishOn: new Date('2020-02-27 00:00:00'.replace(/-/g, '/')) },
  { id: 5, category: 'N', title: 'テストテストこれはテスト、少し長い文字列ですが', publishOn: new Date('2020-02-25 00:00:00'.replace(/-/g, '/')) },
])

const fetchServices = () :ServiceType[] => ([
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
// ============= TEST =======================

