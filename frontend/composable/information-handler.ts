import { ref, reactive } from '@nuxtjs/composition-api'
import { InformationType, InformationFormType } from '@/types/content-type'
import { initContent } from '@/composable/content'

const initInformation = (): InformationType => initContent() as InformationType

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

const fetchInformation = (id: number = 1): InformationType|undefined => {
  const fetchList = fetchInformations()
  return fetchList.find((i) => i.id === id)
}

/**
 * Information State
 */
const information = reactive<InformationType>(initInformation())
const informations = ref<InformationType[]>([])

/**
 * Information Handler
 */
export default ( /* userId */ ) => {
  /**
   * Information getter
   */
  const getInformation = () => information

  /**
   * Information setter
   */
  const setInformation = (data: InformationType) => {
    Object.assign(information, data)
  }

  /**
   * Load information data from database through API
   */
  const loadInformation = (id: number) => {
    setInformation(fetchInformation(id) || initInformation())
  }

  /**
   * Update information database through API
   */
  const updateInformation = (formData: InformationFormType) => {
    // update through API

    setInformation(formData)
  }

  /**
   * Information List getter
   */
  const getInformations = () => informations

  /**
   * Load Information List data from database 
   */
  const loadInformations = () => {
    informations.value.push(...fetchInformations());
  }

  return {
    getInformation,
    loadInformation,
    updateInformation,
    getInformations,
    loadInformations,
  }
}
