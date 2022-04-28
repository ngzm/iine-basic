'use strict'

import { CustomerModel, CustomerUrlModel } from './model/model.customer.mjs'
import { modelToObject, modelToArrayObject } from './db.handler.mjs'

/**
 * 顧客情報リスト取得
 * @param {object} select 取得フィールド
 * @param {object} sort sort条件
 * @param {number} skip offset 0 以下の時は無視される
 * @param {number} limit limit 0 以下の時は無視される
 */
const getCustomers = async (select = { _id: 0 }, sort = { id: 1 }, skip = 0, limit = 0) => {
  const aggregate = CustomerModel.aggregate([ { $project: select }, { $sort: sort } ]);
  if (skip && skip > 0) aggregate.skip(skip)
  if (limit && limit > 0) aggregate.limit(limit)

  aggregate.lookup({ from: 'customer_urls', localField: 'id', foreignField: 'customerId', as: 'urls' })
  return await aggregate.exec()
}

/**
 * 顧客情報取得
 * @param {number} id 取得対象ID
 * @param {object} select 取得フィールド
 */
const getCustomer = async (id, select = { _id: 0 }) => modelToObject(await CustomerModel.findOne({ id }, select).exec())

/**
 * 顧客URL情報取得
 * @param {number} id 取得対象ID
 * @param {object} select 取得フィールド
 */
 const getCustomerUrls = async (id, select = { _id: 0 }) => modelToArrayObject(await CustomerUrlModel.find({ customerId: id }, select).exec())

/**
 * 顧客追加
 * @param {object} customer 情報
 */
const createCustomer = async (customer) => {
  const customerModel = new CustomerModel(customer)
  return modelToObject(await customerModel.save())
}

/**
 * 顧客 URLs 追加
 * @param {number} customerId 更新対象顧客ID
 * @param {string[]} customer の URL
 */
const addCustomerUrl = async (customerId, urls) => {
  const promisses = urls.map(
    (u) => CustomerUrlModel.create({
      customerId,
      url: u.url,
      primary: u.primary || null,
    })
  )
  return modelToArrayObject(await Promise.all(promisses))
}

/**
 * 顧客情報更新
 * @param {number} id 更新対象ID
 * @param {object} customer 更新情報
 */
const updateCustomer = async (id, customer) => {
  const customerModel = await CustomerModel.findOne({ id }).exec()
  if (!customerModel) return null

  Object.assign(customerModel, customer)
  return modelToObject(await customerModel.save())
}

/**
 * 顧客情報を削除する
 * @param {number} id 削除対象ID
 */
 const deleteCustomer = async (id) => {
  return await CustomerModel.deleteMany({ id })
}

/**
 * 削除対象となる 顧客 URLs を削除する
 * @param {number} customerId 削除対象顧客ID
 */
const deleteCustomerUrl = async (customerId) => {
  return await CustomerUrlModel.deleteMany({ customerId })
}

/**
 * URL から該当する顧客情報取得
 * @param {string} url 顧客が使用しているURL
 * @param {object} select 取得フィールド
 */
const getCustomerByUrl = async (url, select = { _id: 0 }) => {
  const regFilter = new RegExp(`^https?:\/\/${url}\/?$`)
  const customerUrl = await CustomerUrlModel.findOne({ url: regFilter }).exec()
  if (!(customerUrl && customerUrl.customerId)) return null

  return modelToObject(await CustomerModel.findOne({ id: customerUrl.customerId }, select).exec())
}

/**
 * 顧客 URL 配列が登録済みかどうか
 * @param {Number} id 更新対象顧客ID
 * @param {string[]} url 顧客が使用しているURL配列
 */
const isExistsUrls = async (id, urls) => {
  const customerId = id || 0
  const urlArray = urls.map(u => u.url)

  const customerUrls = await CustomerUrlModel.find({
    customerId: { $ne: customerId },
    url: { $in: urlArray }
  }).exec()

  return Array.isArray(customerUrls) && customerUrls.length > 0
}

export default {
  getCustomers,
  getCustomer,
  getCustomerUrls,
  createCustomer,
  addCustomerUrl,
  updateCustomer,
  deleteCustomer,
  deleteCustomerUrl,
  getCustomerByUrl,
  isExistsUrls
}
