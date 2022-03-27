'use strict'

import config from 'config'
import multer from 'multer'
import moment from 'moment'
import logger from '../lib/logger.mjs'
import { zeroPaddingString, getFileExtension } from '../lib/utils.mjs'
import StrageHandler from '../strage/aws-s3/strage.s3handler.mjs'

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
export const upload = multer({ storage })

/**
 * Image ファイルを Bucket Strage にアップロードする
 */
const strageHandler = new StrageHandler()
export const uploadToBucket = async (request, response, next) => {
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
 * Multipart で送信された場合の contentJson に入った JSON データをパースしてBODYにセットする
 */
 export const contentJsonToBody = (request, response, next) => {
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
 * アップロードファイル名からバケットオブジェクト名を返す
 * @param {*} prefix iineではuserIDを使用する
 * @param {*} originalname 
 * @returns 
 */
const getBucketObjectName = (prefix, originalname) => {
  const timestamp = moment().format("YYYYMMDD-HHmmSS")
  const ext = getFileExtension(originalname);
  return `${prefix}_${timestamp}.${ext}`;
}
