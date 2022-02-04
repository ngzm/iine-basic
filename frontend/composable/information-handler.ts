import { ref, reactive } from '@nuxtjs/composition-api'
import { InformationType } from '@/types/content-type'
import { initContent } from '@/composable/content'

export default ( /* userId */ ) => {
  const information = reactive(initInformation())
  const loadInformation = (/* id: number */) => {
    /* not implimented */
  }

  const informations = ref([] as InformationType[])
  const loadInformations = () => {
    const fetchData = fetchInformations()
    informations.value.push(...fetchData);
  }

  return {
    initInformation,
    information,
    loadInformation,
    informations,
    loadInformations,
  }
}

const initInformation = (): InformationType => ({ ...initContent() } as InformationType)
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
