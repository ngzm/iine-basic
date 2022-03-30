'use strict'

import { CustomerModel, CustomerUrlModel } from './model/model.customer.mjs'
import { modelToObject, modelToArrayObject } from './db.handler.mjs'

/**
 * 顧客サイト情報リスト取得
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
 * 顧客サイト情報取得
 * @param {object} select 取得フィールド
 * @param {number} id 取得対象ID
 */
const getCustomer = async (id, select = { _id: 0 }) => modelToObject(await CustomerModel.findOne({ id }, select).exec())

/**
 * 顧客サイトURL情報取得
 * @param {object} select 取得フィールド
 * @param {number} id 取得対象ID
 */
 const getCustomerUrls = async (id, select = { _id: 0 }) => modelToArrayObject(await CustomerUrlModel.find({ customerId: id }, select).exec())

/**
 * 顧客サイト追加
 * @param {object} customer 情報
 */
const createCustomer = async (customer) => {
  const customerModel = new CustomerModel(customer)
  return modelToObject(await customerModel.save())
}

/**
 * 顧客サイト URLs 追加
 * @param {object} customer 情報
 * @param {string[]} customer の URL
 */
const addCustomerUrl = async (customerId, urls) => {
  const promisses = urls.map((url) => CustomerUrlModel.create({ customerId, url }))
  return modelToArrayObject(await Promise.all(promisses))
}

/**
 * URL から該当する顧客サイト情報取得
 * @param {string} url 顧客サイトが使用しているURL
 * @param {object} select 取得フィールド
 */
const getCustomerByUrl = async (url, select = { _id: 0 }) => {
  const customerUrl = await CustomerUrlModel.findOne({ url }).exec()
  if (!(customerUrl && customerUrl.customerId)) return null

  return modelToObject(await CustomerModel.findOne({ id: customerUrl.customerId }, select).exec())
}

/**
 * 顧客サイト URL 配列が登録済みかどうか
 * @param {string[]} url 顧客サイトが使用しているURL配列
 */
 const isExistsUrls = async (urls) => {
  const customerUrls = await CustomerUrlModel.find({ url: { $in: urls } }).exec()
  return Array.isArray(customerUrls) && customerUrls.length > 0
}

export default {
  getCustomers,
  getCustomer,
  getCustomerUrls,
  createCustomer,
  addCustomerUrl,
  getCustomerByUrl,
  isExistsUrls
}
