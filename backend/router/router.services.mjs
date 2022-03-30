'use strict'

import express from 'express'
import AppError from '../lib/app-error.mjs'
import serviceStore from '../db/mongo/store.service.mjs'
import {
  validateQueryCustomerId,
  validateParamsId,
  validateBodyRequired,
  validatePositions
} from './middleware.validators.mjs'

const router = express.Router();

/**
 * Service 一覧の position 変更
 */
 router.put('/positions', validateBodyRequired, validatePositions, async(request, response, next) => {
  try {
    const services = await serviceStore.updateContentPositions(request.body)
    response.json(services)
  } catch (error) {
    next(error)
  }
})

/**
 * Service情報取得
 */
router.get('/:id', validateParamsId, async(request, response, next) => {
  try {
    const service = await serviceStore.getContent(parseInt(request.params.id))
    if (!service) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.json(service)
  } catch (error) {
    next(error)
  }
})

/**
 * Service一覧情報取得
 */
router.get('/', validateQueryCustomerId, async(request, response, next) => {
  try {
    const services = await serviceStore.getContents({ customerId: request.query.customerId })
    response.json(services)
  } catch (error) {
    next(error)
  }
})

/**
 * Service追加
 */
router.post('/', validateQueryCustomerId, async (request, response, next) => {
    try {
      const service = await serviceStore.createContent(request.body)
      response.json(service)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * Service変更
 */
 router.put('/:id', validateParamsId, validateBodyRequired, async(request, response, next) => {
  try {
    const service = await serviceStore.updateContent(parseInt(request.params.id), request.body)
    if (!service) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.json(service)
  } catch (error) {
    next(error)
  }
})

/**
 * Service削除
 * ここでは論理削除します
 */
 router.delete('/:id', validateBodyRequired, async(request, response, next) => {
  try {
    const ret = await serviceStore.logicalDeleteContent(parseInt(request.params.id))
    if (!ret) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.status(204).send();
  } catch (error) {
    next(error)
  }
})

export default router
