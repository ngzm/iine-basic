import { reactive, toRefs, onUnmounted } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import { ComparerFunction, LoaderFunction, SaverFunction } from '@/types/use-content-handler'
import { UpdateSyncronizer, ContentHandler } from '@/composable/content-handler'
import { initContent } from '@/composable/content-helper'

// データ更新時に既にロードされた同じデータを更新するシンクロナイザー
const updateSynchronizer = new UpdateSyncronizer<ContactType>()

// データ比較メソッド
const compaerer: ComparerFunction<ContactType> = (c1, c2) => (c1.id === c2.id)

// Contactデータ初期化
const initContact = (): ContactType => ({ ...initContent() })

/**
 * Use Contact Handler
 */
export const useContactData = (userId: number = 0) => {
  const contactHandler = reactive<ContentHandler<ContactType>>(
    new ContentHandler<ContactType>(updateSynchronizer, compaerer, initContact())
  )

  const { contentData: contact, isLoading: loading } = toRefs(contactHandler)

  const loadContact = async (contactId: number) => {
    const loader: LoaderFunction<ContactType> = () => fetchContact(userId, contactId)
    await contactHandler.loadContent(loader)
  }

  const updateContact = async (contact: ContactType, imageFile: File | null) => {
    const saver: SaverFunction<ContactType> = () => modifyContact(contact, imageFile)
    await contactHandler.updateContent(saver)
  }

  onUnmounted(() => {
    contactHandler.destructor()
  })

  return {
    contact,
    loading,
    loadContact,
    updateContact
  }
}

/**
 * テスト用データと操作メソッド
 * 
 */

const fetchList = (): ContactType[] => ([{
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

const fetchData = (id: number): ContactType|undefined => {
  const list = fetchList()
  return list.find((i) => i.id === id)
}

const fetchContact = (userId: number, contactId: number): Promise<ContactType> => {
  console.log(userId, contactId)

  return new Promise((resolve) => setTimeout(() => {
    const contact: ContactType = fetchData(contactId) || initContact()
    resolve(contact)
  }, 1000)) 
}

const modifyContact = (updateNews: ContactType, imageFile: File | null): Promise<ContactType> => {
  return new Promise((resolve) => setTimeout(() => {
    const contact: ContactType = { ...updateNews }
    if (imageFile) {
      Object.assign(contact, { image: URL.createObjectURL(imageFile) })
    }
    resolve(contact)
  }, 1000))
}