import { initContent } from '@/composable/content-helper'


/**
 * Eyecatchデータ
 * 
 */
 const initEyecatch = () => ({ id: 0, title: '', subtitle: '', image: '' })

const eyecatchDataArray = () => ([
  {
    id: 1,
    title: '情報技術をチカラにしたい！',
    subtitle: 'ロングリブネットがサポートいたします',
    image: 'https://longlivenet.com/static/images/top01.jpg',
  }
])

export const fetchEyecatches = (userId, limit) => {
  console.log(userId)
  console.log(limit)

  return new Promise((resolve) => setTimeout(() => {
    const list = eyecatchDataArray()
    resolve(list)
  }, 1000)) 
}

export const fetchEyecatch = (userId, eyecatchId) => {
  console.log(userId)

  return new Promise((resolve) => setTimeout(() => {
    const list = eyecatchDataArray()
    const data = list.find((d) => d.id === eyecatchId) || initEyecatch()
    resolve(data)
  }, 1000)) 
}

export const saveEyecatch = (updateata, imageFile) => {
  return new Promise((resolve) => setTimeout(() => {
    const data = { ...updateata }
    if (imageFile) {
      Object.assign(data, { image: URL.createObjectURL(imageFile) })
    }
    resolve(data)
  }, 1000))
}


/**
 * Informationデータ
 * 
 */

// Informationデータ初期化
const initInformation = () => ({ ...initContent() })

const informationDataArray = () => ([
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
  },
  {
    id: 2,
    title: 'システムデザインとかその2ですよ',
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

const informationDataObject = (id) => {
  const list = informationDataArray()
  return list.find((i) => i.id === id)
}

export const fetchInformations = (userId, limit) => {
  console.log(userId)
  console.log(limit)

  return new Promise((resolve) => setTimeout(() => {
    const list = informationDataArray()
    resolve(list)
  }, 1000)) 
}

export const fetchInformation = (userId, informationId) => {
  console.log(userId, informationId)

  return new Promise((resolve) => setTimeout(() => {
    const information = informationDataObject(informationId) || initInformation()
    resolve(information)
  }, 1000)) 
}

export const saveInformation = (updateService, imageFile) => {
  return new Promise((resolve) => setTimeout(() => {
    const information = { ...updateService }
    if (imageFile) {
      Object.assign(information, { image: URL.createObjectURL(imageFile) })
    }
    resolve(information)
  }, 1000))
}


/**
 * News 
 *
 */
const initNews = () => ({
  ...initContent(),
  category: '',
  publishOn: new Date(),
})

const newsDataArray = () => {
  let idSeq = 0;
  return [
  {
    id: ++idSeq,
    category: 'I',
    title: '当事業所のホームページを作成いたしました',
    body: `<p>ご覧いただいておりますとおり、ロングリブネットのホームページを作成いたしました。</p>

<p>こちらのサイトは django という Python で作成されたサーバサイドの Web フレームワークをベースとして作成いたしました。</p>

<p>まだまだ取り敢えずという形で最低限の建てつけとなっておりますが、今後徐々にコンテンツを増やすとともに、必要に応じて Javascript によるアプリケーションも追加していきたいと考えております。</p>

<p>今後ともよろしくお願いいたします。</p>`,
    image: 'https://longlivenet.com/media/tphotos/learn-2001940_1280.jpg',
    publishOn: new Date('2020-02-23 10:00:00'.replace(/-/g, '/')),
  },
  {
    id: ++idSeq,
    category: 'S',
    title: '初仕事で開発したサイトがリリースされました',
    body: `Long Live net として初めて頂いた仕事で開発していた Web サイト がリリースされました。
詳しいことは公表できないのですが、人材募集とかキューレーション関連のWebサービスとなります。

技術的な要素としては以下の通りです。

フロントエント: Nuxt.js, Vue.js, Element-UI, Apollo GraphQL
バックエンド: Ruby on Rails, GraphQL, MySQL, Docker
インフラ: AWS - S3, EC2, ALB, CloudFront, RDS, Elastic Beans Talk

多くの皆さんがご利用くだされば嬉しいです。`,
    image: 'https://longlivenet.com/media/tphotos/banner-995563_1920.jpg',
    publishOn: new Date('2020-04-10 01:00:00'.replace(/-/g, '/')),
  },
  {
    id: ++idSeq,
    category: 'W',
    title: '開発したWebサイトがリリースされました',
    body: `ここ数ヶ月は、海外のスタートアップ情報を紹介する Web サイト開発の仕事を頂いておりましたが、ついに10月はじめにリリースすることができました。


本開発における技術的要素は次の通りです。

フロントエント: Nuxt.js, Vue.js, Bootstrap-Vue
バックエンド: Ruby on Rails, MySQL, Docker
インフラ: AWS - S3, ECS, EC2, ALB, CloudFront, Aurora RDS

ロングリブネットとして開発したシステムとしては、2つ目のシステムととなりますが、予定通り無事にリリースできました。本当に嬉しい限りです。`,
    image: 'https://longlivenet.com/media/tphotos/startup-4045676_1280.jpg',
    publishOn: new Date('2020-10-05 00:00:00'.replace(/-/g, '/')),
  },
  {
    id: ++idSeq,
    category: 'T',
    title: 'おかげさまで一周年です！',
    body: `2021年2月10日、ロングリブネットを開業して一周年となりました。

コロナで大変な一年となりましたが、お客様にも恵まれ、何とか継続することができました。ひとえに、これまでお付き合いいただきましたお客様を始め、ご支援、ご協力いただきました多くの皆様のお陰と感謝いたしております。誠にありがとうございます。

まだしばらくはコロナの影響が継続するかと存じますが、今後は現在の開発やAWSコンサルといった業務に加え、ITエンジニア育成事業にも本格的に参画していく所存です。

まだまだこれからが勝負かと思いますが、今後も変わらぬお付き合いのほど、どうぞよろしくお願い申し上げます。`,
    image: 'https://longlivenet.com/media/tphotos/smile-5128742_1280.jpg',
    publishOn: new Date('2020-02-27 00:00:00'.replace(/-/g, '/')),
  },
  {
    id: ++idSeq,
    category: 'N',
    title: 'テストテストこれはテスト、少し長い文字列ですが',
    body: `某バンク系列の金融システムをオンプレミスからAWSクラウドに移行する案件に参画し、インフラやアプリのアーキテクチャに関する要件定義を行いました。
本格的な開発はこれからの予定ということですが、このような大きな金融機関でも AWS などクラウドを積極的に活用したいという意思を間近で感じることができ、私もますます気合が入った次第です。`,
    image: 'https://longlivenet.com/media/tphotos/technology-3406895_1280.jpg',
    publishOn: new Date('2020-02-25 00:00:00'.replace(/-/g, '/'))
  },
]
}

const newsDataObject = (id = 1) => {
  const list = newsDataArray()
  return list.find((i) => i.id === id)
}

export const fetchNewsList = (userId, limit) => {
  console.log(userId)
  console.log(limit)

  return new Promise((resolve) => setTimeout(() => {
    const newsList = newsDataArray()
    resolve(newsList)
  }, 1000)) 
}

export const fetchNews = (userId, newsId) => {
  console.log(userId, newsId)

  return new Promise((resolve) => setTimeout(() => {
    const news = newsDataObject(newsId) || initNews()
    resolve(news)
  }, 1000)) 
}

export const saveNews = (updateNews, imageFile) => {
  return new Promise((resolve) => setTimeout(() => {
    const news = { ...updateNews }
    if (imageFile) {
      Object.assign(news, { image: URL.createObjectURL(imageFile) })
    }
    resolve(news)
  }, 1000))
}

/**
 * テスト用Serviceデータと操作メソッド
 * 
 */
const initService = () => ({ ...initContent() })
const ServicefetchList = () => ([
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

const ServicefetchData = (id) => {
  const list = ServicefetchList()
  return list.find((i) => i.id === id)
}

export const fetchServiceList = (userId, limit) => {
  console.log(userId)
  console.log(limit)

  return new Promise((resolve) => setTimeout(() => {
    const serviceList = ServicefetchList()
    resolve(serviceList)
  }, 4000)) 
}

export const fetchService = (userId, serviceId) => {
  console.log(userId, serviceId)

  return new Promise((resolve) => setTimeout(() => {
    const service = ServicefetchData(serviceId) || initService()
    resolve(service)
  }, 1000)) 
}

export const saveService = (updateService, imageFile) => {
  return new Promise((resolve) => setTimeout(() => {
    const service = { ...updateService }
    if (imageFile) {
      Object.assign(service, { image: URL.createObjectURL(imageFile) })
    }
    resolve(service)
  }, 1000))
}

/**
 * テスト用Contactデータと操作メソッド
 * 
 */
 const initContact = () => ({ ...initContent() })
 const contactFetchList = () => ([{
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
}])

const conatctFetchData = (id) => {
  const list = contactFetchList()
  return list.find((i) => i.id === id)
}

export const fetchContact = (userId, contactId) => {
  console.log(userId, contactId)

  return new Promise((resolve) => setTimeout(() => {
    const contact = conatctFetchData(contactId) || initContact()
    resolve(contact)
  }, 1000)) 
}

export const saveContact = (updateNews, imageFile) => {
  return new Promise((resolve) => setTimeout(() => {
    const contact = { ...updateNews }
    if (imageFile) {
      Object.assign(contact, { image: URL.createObjectURL(imageFile) })
    }
    resolve(contact)
  }, 1000))
}
