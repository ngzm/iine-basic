'use strict'

import express from 'express'
import AppError from '../lib/app-error.mjs'
import eyecatchStore from '../db/mongo/store.eyecatch.mjs'
import { validateQueryUserId, validateParamsId, validateBodyRequired, validatePositions } from './middleware.validators.mjs'

const router = express.Router();

/**
 * Eyecatch 一覧の position 変更
 */
 router.put('/positions', validateBodyRequired, validatePositions, async(request, response, next) => {
  try {
    const eyecatches = await eyecatchStore.updateContentPositions(request.body)
    response.json(eyecatches)
  } catch (error) {
    next(error)
  }
})

/**
 * Eyecatch情報取得
 */
router.get('/:id', validateParamsId, async(request, response, next) => {
  try {
    const eyecatch = await eyecatchStore.getContent(parseInt(request.params.id))
    if (!eyecatch) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.json(eyecatch)
  } catch (error) {
    next(error)
  }
})

/**
 * Eyecatch一覧情報取得
 */
router.get('/', validateQueryUserId, async(request, response, next) => {
  try {
    const eyecatches = await eyecatchStore.getContents({ userId: request.query.userId })
    response.json(eyecatches)
  } catch (error) {
    next(error)
  }
})

/**
 * Eyecatch追加
 */
router.post('/', validateQueryUserId, async (request, response, next) => {
    try {
      const eyecatch = await eyecatchStore.createContent(request.body)
      response.json(eyecatch)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Eyecatch変更
 */
 router.put('/:id', validateParamsId, validateBodyRequired, async(request, response, next) => {
  try {
    const eyecatch = await eyecatchStore.updateContent(parseInt(request.params.id), request.body)
    if (!eyecatch) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.json(eyecatch)
  } catch (error) {
    next(error)
  }
})

/**
 * Eyecatch削除
 * ここでは論理削除します
 */
 router.delete('/:id', validateBodyRequired, async(request, response, next) => {
  try {
    const ret = await eyecatchStore.logicalDeleteContent(parseInt(request.params.id))
    if (!ret) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.status(204).send();
  } catch (error) {
    next(error)
  }
})

export default router
