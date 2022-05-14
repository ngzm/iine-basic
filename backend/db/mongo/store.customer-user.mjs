'use strict'

import { CustomerUserModel } from './model/model.customer-user.mjs'
import { modelToObject } from './db.handler.mjs'

/**
 * 顧客管理ユーザ取得
 * @param {number} customerId 所属する顧客ID
 * @param {object} select 取得フィールド
 * @param {object} sort sort条件
 * @param {number} skip offset 0 以下の時は無視される
 * @param {number} limit limit 0 以下の時は無視される
 */
const getCustomerUsers = async (customerId, select = { _id: 0 }, sort = { id: 1 }, skip = 0, limit = 0) => {
  const aggregate = CustomerUserModel.aggregate([
    { $match: { customerId } },
    { $project: select },
    { $sort: sort },
  ]);
  if (skip && skip > 0) aggregate.skip(skip)
  if (limit && limit > 0) aggregate.limit(limit)

  aggregate.lookup({ from: 'accounts', localField: 'id', foreignField: 'customerUserId', as: 'urls' })
  return await aggregate.exec()
}

/**
 * 顧客管理ユーザ取得
 * @param {number} id 取得対象ID
 * @param {object} select 取得フィールド
 */
const getCustomerUser = async (id, select = { _id: 0 }) => modelToObject(await CustomerUserModel.findOne({ id }, select).exec())

/**
 * 顧客管理ユーザ取得
 * @param {string} email 取得対象ユーザのEmail
 * @param {object} select 取得フィールド
 */
const getCustomerUserByEmail = async (email, select = { _id: 0 }) => modelToObject(await CustomerUserModel.findOne({ email }, select).exec())

/**
 * 顧客管理ユーザ追加
 * @param {object} customerUser 情報
 */
const createCustomerUser = async (customerUser) => {
  const customerUserModel = new CustomerUserModel(customerUser)
  return modelToObject(await customerUserModel.save())
}

/**
 * 顧客管理ユーザ変更
 * @param {object} customerUser 情報
 */
const updateCustomerUser = async (id, customerUser) => {
  const customerUserModel = await CustomerUserModel.findOne({ id }).exec()
  if (!customerUserModel) return null

  Object.assign(customerUserModel, customerUser)
  return modelToObject(await customerUserModel.save())
}

/**
 * 顧客管理ユーザ物理削除
 * @param {number} id 削除対象id
 */
const deleteCustomerUser = async (id) => await CustomerUserModel.deleteOne({ id }).exec()

export default {
  getCustomerUsers,
  getCustomerUser,
  getCustomerUserByEmail,
  createCustomerUser,
  updateCustomerUser,
  deleteCustomerUser,
}
