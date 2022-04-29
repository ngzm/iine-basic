'use strict'

import express from 'express'
import config from 'config'
import multer from 'multer'
import sharp from 'sharp'
import dayjs from 'dayjs'

import logger from '../../lib/logger.mjs'
import { zeroPaddingString, getFileExtension } from '../../lib/utils.mjs'
import StrageHandler from '../../strage/aws-s3/strage.s3handler.mjs'

// ********************************
// Middlewares 
// ********************************
const uploadDir = 'uploads/'
const lgMax = 300000
// const smMax = 150000 

/**
 * Uploader based on multer
 */
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
})
const upload = multer({ storage })

/**
 * Image ファイルをリサイズする
 */
const resizeImage = async (request, response, next) => {
  try {
    const file = request.file
    logger.trace('size', file.size)

    if (file.size > lgMax) {
      const lgResizedPath =  `${uploadDir}lg_${file.originalname}`
      logger.trace('lgResizedPath', lgResizedPath)

      logger.trace('---- resize start----')
      const result = await sharp(file.path).resize({ width: 1440, height: 1440, fit: 'inside', withoutEnlargement: true }).toFile(lgResizedPath)
      logger.trace('result', result) 
      logger.trace('---- resize end ----')

      request.lgResizedPath = lgResizedPath
    }

    // TODO: スマホなどの画像 optimize については将来検討するが、ヒントとして残しておく
    // if (file.size > smMax) {
    //   const smResizedPath =  `${uploadDir}sm_${file.originalname}`
    //   await sharp(file.path).resize({ width: 800, height: 800, fit: 'outside' })
    //   request.smResizedPath = smResizedPath
    // }

    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Image ファイルを Bucket Strage にアップロードする
 */
const strageHandler = new StrageHandler()
const uploadToBucket = async (request, response, next) => {
  try {
    const customerId = request.query.customerId
    const file = request.file
    if (!customerId || !file) return next()

    const prefix = zeroPaddingString(request.query.customerId, 6)
    const objectName = getBucketObjectName(prefix, file.originalname)
    const contentType = file.mimetype || 'application/octet-stream'
    const localFilePath = request.lgResizedPath || file.path
    logger.trace('localFilePath: ', localFilePath)

    logger.trace('---- S3 uploadFile start----')
    await strageHandler.uploadFile(objectName, contentType, localFilePath)
    logger.trace('---- S3 uploadFile end ----')

    request.imageObjectName = objectName
    logger.trace('imageObjectName: ', request.imageObjectName)
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
  const timestamp = dayjs().format("YYYYMMDD-HHmmss-SSS")
  const ext = getFileExtension(originalname);
  return `${prefix}/${timestamp}.${ext}`
}

// ********************************
// Routers
// ********************************
const router = express.Router();

/**
 * 各 content の image file アップロード
 */
router.post(
  '/image',
  upload.single('imagefile'),
  resizeImage,
  uploadToBucket,
  async (request, response, next) => {
    try {
      const uploadedFileUrl = `${config.bucketConfig.BucketUrl}/${request.imageObjectName}`
      logger.trace('uploadedFileUrl: ', uploadedFileUrl)

      response.json({ fileUrl: uploadedFileUrl})
    } catch (error) {
      next(error)
    }
  }
)

export default router
