'use strict'

import InformationModel from './model/model.information.mjs'
import ContentStore from './store.content.mjs'

const informationStore = new ContentStore(InformationModel)
export default informationStore
