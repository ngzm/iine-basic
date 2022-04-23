'use strict'

import ServiceModel from './model/model.service.mjs'
import ContentStore from './store.content.mjs'

const serviceStore = new ContentStore(ServiceModel)
export default serviceStore
