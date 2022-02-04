import { reactive, ref } from '@nuxtjs/composition-api'
import { ContactType } from '@/types/content-type'
import { initContent } from '@/composable/content'

export default ( /* userId */ ) => {
  const contact = reactive(initContact())
  const loadContact = (/* id: number */) => {
    Object.assign(contact, fetchContact())
  }

  const contacts = ref([] as ContactType[])
  const loadContacts = () => {
    /* not implemanted */
  }

  return {
    contact,
    loadContact,
    contacts,
    loadContacts,
  }
}

const initContact = (): ContactType => ({ ...initContent() } as ContactType)
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
