'use strict'

import NewsModel from './model/model.news.mjs'
import ContentStore from './store.content.mjs'

const newstore = new ContentStore(NewsModel)
export default newstore