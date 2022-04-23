'use strict'

import express from 'express'
import serviceStore from '../../db/mongo/store.service.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

// コンテンツ共通ルータ定義
contentesRouter(router, serviceStore)

export default router
