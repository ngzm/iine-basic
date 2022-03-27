'use strict'

import { UserModel, UserUrlModel } from './model/model.user.mjs'
import { modelToObject, modelToArrayObject } from './db.handler.mjs'

/**
 * ユーザ情報リスト取得
 * @param {object} select 取得フィールド
 * @param {object} sort sort条件
 * @param {number} skip offset 0 以下の時は無視される
 * @param {number} limit limit 0 以下の時は無視される
 */
const getUsers = async (select = { _id: 0 }, sort = { id: 1 }, skip = 0, limit = 0) => {
  const aggregate = UserModel.aggregate([ { $project: select }, { $sort: sort } ]);
  if (skip && skip > 0) aggregate.skip(skip)
  if (limit && limit > 0) aggregate.limit(limit)

  aggregate.lookup({ from: 'user_urls', localField: 'id', foreignField: 'userId', as: 'urls' })
  return await aggregate.exec()
}

/**
 * ユーザ情報取得
 * @param {object} select 取得フィールド
 * @param {number} id 取得対象ID
 */
const getUser = async (id, select = { _id: 0 }) => modelToObject(await UserModel.findOne({ id }, select).exec())

/**
 * ユーザURL情報取得
 * @param {object} select 取得フィールド
 * @param {number} id 取得対象ID
 */
 const getUserUrls = async (id, select = { _id: 0 }) => modelToArrayObject(await UserUrlModel.find({ userId: id }, select).exec())

/**
 * ユーザ追加
 * @param {object} user 情報
 * @param {string[]} user の URL
 */
const createUser = async (user, urls) => {
  const userModel = new UserModel(user)
  const storedUser = modelToObject(await userModel.save())

  const promisses = urls.map((url) => UserUrlModel.create({ userId: storedUser.id, url }))
  const storedUrls = modelToArrayObject(await Promise.all(promisses))

  return { user: storedUser, urls: storedUrls }
}

/**
 * URL から該当するユーザ情報取得
 * @param {object} select 取得フィールド
 * @param {string} url ユーザが使用しているURL
 */
const getUserByUrl = async (url, select = { _id: 0 }) => {
  const userUrl = await UserUrlModel.findOne({ url }).exec()
  if (!(userUrl && userUrl.userId)) return null

  return modelToObject(await UserModel.findOne({ id: userUrl.userId }, select).exec())
}

export default {
  getUsers,
  getUser,
  getUserUrls,
  createUser,
  getUserByUrl
}
