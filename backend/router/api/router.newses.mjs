'use strict'

import express from 'express'
import newsStore from '../../db/mongo/store.news.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

// コンテンツ共通ルータ定義
contentesRouter(router, newsStore)

export default router
