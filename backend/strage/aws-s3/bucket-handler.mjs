'use strict'

import config from 'config'
import AWS from 'aws-sdk'
import fs from 'fs'

const s3Config = {
  accessKeyId: process.env.BUCKET_ACCESS_KEY,
  secretAccessKey: process.env.BUCKET_SECRET_KEY,
  region: config.bucketConfig.AwsRegion,
  endpoint: config.bucketConfig.Endpoint,
  signatureVersion: 'v4'
}
if (process.env.NODE_ENV === 'development') {
  // minio の場合に必要となる、なぜかは不明だけどとにかく必要
  s3Config.s3ForcePathStyle = true
}
const s3 = new AWS.S3(s3Config)

class BucketHandler {
  bucket
  folder

  /**
   *  Constructor
   * @param {*} bucket 
   * @param {*} folder 
   */
  constructor(bucket = config.bucketConfig.Bucket, folder = config.bucketConfig.Folder) {
    this.bucket = bucket
    this.folder = folder
  }

  /**
   * Uploading files to the S3 Bucket
   * @param {*} objectName 
   * @param {*} contentType
   * @param {*} localFilePath アップロード対象のローカルに保存されたファイルパス
   */
  async uploadFile(objectName, contentType, localFilePath) {
    const params = {
      Bucket: this.bucket,
      Key: `${this.folder}/${objectName}`,
      ContentType: contentType,
      Body: fs.readFileSync(localFilePath)
    };
    return await s3.upload(params).promise()
  }

  /**
   * put object data to the S3 Bucket
   * @param {*} objectName
   * @param {*} contentType
   * @param {*} dataBuffer アップロードデータバッファ
   */
  async putObject(objectName, contentType, dataBuffer) {
    const params = {
      Bucket: this.bucket,
      Key: `${this.folder}/${objectName}`,
      ContentType: contentType,
      Body: dataBuffer
    };
    return await s3.upload(params).promise()
  }

  /**
   * S3 オブジェクトのファイルデータを取得
   * @param {String} objectName
   */
  async fetchObject(objectName) {
    if (!objectName) return null;

    const params = { Bucket: this.bucket, Key: `${this.folder}/${objectName}` }
    return await s3.getObject(params).promise()
  }
}

export default BucketHandler
