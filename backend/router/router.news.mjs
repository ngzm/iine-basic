'use strict'

import express from 'express'
import { getNewsList } from '../db/mongo/db.news.mjs'

const router = express.Router();

/**
 * NEWS一覧情報取得
 */
 router.get('/news-list', async(request, response, next) => {
  try {
    const newsList = await getNewsList()
    response.json(newsList)
  } catch (error) {
    next(error)
  }
})

export default router
