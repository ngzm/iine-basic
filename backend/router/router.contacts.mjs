'use strict'

import express from 'express'
import contactStore from '../db/mongo/store.contact.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

// コンテンツ共通ルータ定義
contentesRouter(router, contactStore)

export default router
