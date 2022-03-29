'use strict'

import EyecatchModel from './model/model.eyecatch.mjs'
import ContentStore from './store.content.mjs'

const eyecatchStore = new ContentStore(EyecatchModel)
export default eyecatchStore
