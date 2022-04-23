'use strict'

import ContactModel from './model/model.contact.mjs'
import ContentStore from './store.content.mjs'

const contactStore = new ContentStore(ContactModel)
export default contactStore
