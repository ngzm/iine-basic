'use strict'

import express from 'express'
import passport from 'passport'
import dayjs from 'dayjs'
import { validateQueryCustomerId } from '../middleware.validators.mjs'
import newsStore from '../../db/mongo/store.news.mjs'
import contentesRouter from './router.contents.mjs'

const router = express.Router()

/**
* news 一覧データを返すが、下記の点で contents#index と異なる
* 公開日を過ぎたデータのみの一覧か、関係なく全ての一覧かを制御できる
* 並び順は常に公開日の新しい順となる
*/
router.get('/list', validateQueryCustomerId, async(request, response, next) => {
  const filter = { customerId: request.customerId }
  const select = { _id: 0 }
  const sort = { publishOn: -1 }
  const skip = 0
  const limit = request.query.limit || 20

  // passport.authenticate bearer で 認証されたユーザを利用する
  const listNewsFunc = async (err, user) => {
    try {
      if (err) throw new AppError(err.message, 400)
      if (!user) {
        Object.assign(filter, { publishOn: { $lte: dayjs().toISOString() } })
      }
      const newses = await newsStore.getContents(filter, select, sort, skip, limit)
      response.json(newses)
    } catch (error) {
      next(error)
    }
  }

  try {
    passport.authenticate('bearer', listNewsFunc)(request, response, next)
  } catch (error) {
    next(error)
  }
})

// コンテンツ共通ルータ定義
contentesRouter(router, newsStore)

export default router
