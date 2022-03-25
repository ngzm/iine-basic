'use strict'

import mongoose from 'mongoose';

/**
 * connect mongodb through Mongoose
 */
export const mongooseConnect = async function(url, options) {
  console.log(url, options)
  await mongoose.connect(url, {
    user: options.user,
    pass: options.pass,
    retryWrites: false
  });
}

/**
 * check is mongodb connected ?
 */
export const tryMongoose = function() {
  if (!mongoose.connection.readyState) {
    throw new Error(`Mongoose Connection not ready: readyState is ${mongoose.connection.readyState}`);
  }
}

/**
 * Mongoose model から plain なオブジェクトへの変換
 */
// (注) mongoose object を操作する場合は plain object に変換する必要がある
export const modelToObject = (model) => model ? model.toObject() : null

/**
 * Mongoose model 配列 から plain なオブジェクト配列への変換
 */
export const modelToArrayObject = (models) => models && Array.isArray(models) ? models.map((m) => m.toObject()) : []
