'use strict'

import express from 'express'
import eyecatchStore from '../../db/mongo/store.eyecatch.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

// コンテンツ共通ルータ定義
contentesRouter(router, eyecatchStore)

export default router
