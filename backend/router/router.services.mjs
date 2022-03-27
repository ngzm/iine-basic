'use strict'

import express from 'express'
import config from 'config'
import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import { upload } from './common-utils.mjs'
import { toPaddedString, getBucketObjectName } from '../lib/utils.mjs'
import BucketHandler from '../strage/aws-s3/bucket-handler.mjs'
import serviceStore from '../db/mongo/store.service.mjs'
import { validateQueryUserId, validateParamsId, validateBodyRequired } from './common-validator.mjs'

// ########################
// Middlewares
// ########################
const bucketHandler = new BucketHandler();

/*
 * Image ファイルを Bucket Strage にアップロードする
 */
const uploadToBucket = async (request, response, next) => {
  try {
    const userId = request.query.userId
    const file = request.file
    if (!userId || !file) return next()

    const prefix = toPaddedString(request.query.userId, 6)
    const objectName = getBucketObjectName(prefix, file.originalname)
    const contentType = file.mimetype || 'application/octet-stream'
    const localFilePath = file.path
    await bucketHandler.uploadFile(objectName, contentType, localFilePath)
    request.body.imageObjectName = objectName
    logger.trace('imageObjectName: ', request.body.imageObjectName)
    next()
  } catch (error) {
      next(error)
  }
}

/**
 * Multipart で送信された場合の contentJson に入った JSON データをパースしてBODYにセットする
 */
const contentJsonToBody = (request, response, next) => {
  try {
    const contentData = JSON.parse(request.body.contentJson || '{}')
    for (const [key, value] of Object.entries(contentData)) {
      request.body[key] = value
    }
    request.body.image = `${config.bucketConfig.BucketUrl}/${request.body.imageObjectName}`
    logger.trace('request.body.image: ', request.body.image)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * request body Service 一覧 position データチェック Middleware
 */
 const validatePositions = (request, response, next) => {
  if (!request.body || !Array.isArray(request.body)) {
    return next(new AppError(`400 Bad Request. positions data is not Array: [${positions}]`, 400))
  }
  next()
}

// ########################
// Routers
// ########################

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
    console.log('ret', ret)
    if (!ret) throw new AppError('該当する情報は見つかりませんでした', 404)

    response.status(204).send();
  } catch (error) {
    next(error)
  }
})

export default router
