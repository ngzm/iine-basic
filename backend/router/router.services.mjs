'use strict'

import express from 'express'
import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import { upload, uploadToBucket, contentJsonToBody } from './middleware.uploads.mjs'
import serviceStore from '../db/mongo/store.service.mjs'
import { validateQueryUserId, validateParamsId, validateBodyRequired, validatePositions } from './middleware.validators.mjs'

const router = express.Router();

/**
 * Service 一覧の position 変更
 */
 router.put('/positions', validateBodyRequired, validatePositions, async(request, response, next) => {
  try {
    const services = await serviceStore.updateServicePositions(request.body)
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
    const service = await serviceStore.getService(parseInt(request.params.id))
    if (!service) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.json(service)
  } catch (error) {
    next(error)
  }
})

/**
 * Service一覧情報取得
 */
router.get('/', validateQueryUserId, async(request, response, next) => {
  try {
    const services = await serviceStore.getServices({ userId: request.query.userId })
    response.json(services)
  } catch (error) {
    next(error)
  }
})

/**
 * Service追加
 */
router.post(
   '/',
  validateQueryUserId,
  upload.single('imagefile'),
  uploadToBucket,
  contentJsonToBody,
  async (request, response, next) => {
    try {
      logger.trace(request.body)
      const service = await serviceStore.createService(request.body)
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
    const service = await serviceStore.updateService(parseInt(request.params.id), request.body)
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
    const ret = await serviceStore.logicalDeleteService(parseInt(request.params.id))
    if (!ret) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.status(204).send();
  } catch (error) {
    next(error)
  }
})

export default router
