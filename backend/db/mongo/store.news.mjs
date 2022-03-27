'use strict'

import News from './model/model.news.mjs'
import { modelToArrayObject } from './db.handler.mjs'

/**
 * 環境法規メール情報リストデータアクセス処理
 * @param {object} filter 検索条件
 * @param {object} select select条件
 * @param {object} sort sort条件
 * @param {number} skip offset 0 以下の時は無視される
 * @param {number} limit limit 0 以下の時は無視される
 */
export const getNewsList = async (filter = {}, select = { _id: 0 }, sort = { publishOn: -1 }, skip = 0, limit = 0) => {
  let query = News.find(filter).select(select).sort(sort)
  if (skip && skip > 0) query = query.skip(skip)
  if (limit && limit > 0) query = query.limit(limit)
  return modelToArrayObject(await query.exec())
}
