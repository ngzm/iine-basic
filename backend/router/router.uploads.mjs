'use strict'

import express from 'express'
import config from 'config'
import multer from 'multer'
import moment from 'moment'

import logger from '../lib/logger.mjs'
import StrageHandler from '../strage/aws-s3/strage.s3handler.mjs'
import { validateQueryUserId } from './middleware.validators.mjs'
import { zeroPaddingString, getFileExtension } from '../lib/utils.mjs'

// ********************************
// Middlewares 
// ********************************

/**
 * Uploader based on multer
 */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

/**
 * Image ファイルを Bucket Strage にアップロードする
 */
const strageHandler = new StrageHandler()
const uploadToBucket = async (request, response, next) => {
  try {
    const userId = request.query.userId
    const file = request.file
    if (!userId || !file) return next()

    const prefix = zeroPaddingString(request.query.userId, 6)
    const objectName = getBucketObjectName(prefix, file.originalname)
    const contentType = file.mimetype || 'application/octet-stream'
    const localFilePath = file.path
    await strageHandler.uploadFile(objectName, contentType, localFilePath)
    request.body.imageObjectName = objectName
    logger.trace('imageObjectName: ', request.body.imageObjectName)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * アップロードファイル名からバケットオブジェクト名を返す
 * @param {*} prefix iineではuserIDを使用する
 * @param {*} originalname 
 * @returns 
 */
const getBucketObjectName = (prefix, originalname) => {
  const timestamp = moment().format("YYYYMMDD-HHmmSS")
  const ext = getFileExtension(originalname);
  return `${prefix}_${timestamp}.${ext}`
}

// ********************************
// Routers
// ********************************
const router = express.Router();

/**
 * 各 content の image file アップロード
 */
router.post('/image', validateQueryUserId, upload.single('imagefile'), uploadToBucket, async (request, response, next) => {
    try {
      const uploadedFileUrl = `${config.bucketConfig.BucketUrl}/${request.body.imageObjectName}`
      logger.trace('uploadedFileUrl: ', uploadedFileUrl)

      response.json({ fileUrl: uploadedFileUrl})
    } catch (error) {
      next(error)
    }
  }
)

export default router
