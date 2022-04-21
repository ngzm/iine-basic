'use strict'

import express from 'express'
import informationStore from '../../db/mongo/store.information.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

// コンテンツ共通ルータ定義
contentesRouter(router, informationStore)

export default router
