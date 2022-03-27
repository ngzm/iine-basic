'use strict'

import ServiceModel from './model/model.service.mjs'
import { modelToObject, modelToArrayObject } from './db.handler.mjs'

/**
 * Service情報リスト取得
 * @param {object} filter ユーザIDなど絞り込み条件
 * @param {object} select 取得フィールド
 * @param {object} sort sort条件
 * @param {number} skip offset 0 以下の時は無視される
 * @param {number} limit limit 0 以下の時は無視される
 */
const getServices = async (filter = {}, select = { _id: 0 }, sort = { id: 1 }, skip = 0, limit = 0) => {
  const sFilter = { ...filter, removed: false }
  const sSort = { position: 1, ...sort }

  let query = ServiceModel.find(sFilter).select(select).sort(sSort)
  if (skip && skip > 0) query = query.skip(skip)
  if (limit && limit > 0) query = query.limit(limit)

  return modelToArrayObject(await query.exec())
}

/**
 * Service情報取得
 * @param {number} id 取得対象ID
 * @param {object} select 取得フィールド
 */
const getService = async (id, select = { _id: 0 }) => modelToObject(
  await ServiceModel.findOne({ id, removed: false }, select).exec()
)

/**
 * Service追加
 * @param {object} service 情報
 */
const createService = async (service) => {
  const serviceModel = new ServiceModel(service)
  return modelToObject(await serviceModel.save())
}

/**
 * Service更新
 * @param {number} 更新対象 service id
 * @param {object} service 情報
 */
const updateService = async (id, service) => {
  const serviceModel = await ServiceModel.findOne({ id }).exec()
  if (!serviceModel) return null

  Object.assign(serviceModel, service)
  return modelToObject(await serviceModel.save())
}

/**
 * Service 物理削除
 * @param {number} id 削除対象id
 */
const deleteService = async (id) => await ServiceModel.deleteOne({ id }).exec()

/**
 * Service 論理削除 削除フラグ設定
 * @param {number} 論理削除対象 service id
 */
const logicalDeleteService = async (id) => {
  const serviceModel = await ServiceModel.findOne({ id }).exec()
  if (!serviceModel) return null

  serviceModel.removed = true
  return modelToObject(await serviceModel.save())
}

/**
 * Service リスト Position 更新
 * @param {Array} service リスト Position 情報
 */
const updateServicePositions = async (positions) => {
  const promises = positions.map((p) => (
    ServiceModel.findOneAndUpdate({ id: p.id }, { position: p.position }, { new: true })
  ))
  return modelToArrayObject(await Promise.all(promises))
}

export default {
  getServices,
  getService,
  createService,
  updateService,
  deleteService,
  logicalDeleteService,
  updateServicePositions
}
