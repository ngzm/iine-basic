'use strict'

import { v4 as uuidv4 } from 'uuid'
import { AccountModel } from './model/model.account.mjs'
import { modelToObject } from './db.handler.mjs'
import { generateHash } from '../../lib/auth.mjs'

/**
 * ユーザアカウント取得
 * @param {string} username 取得対象アカウント名（email）
 * @param {object} select 取得フィールド
 */
const getAccount = async (username, select = { _id: 0 }) => modelToObject(await AccountModel.findOne({ username }, select).exec())

/**
 * アカウント追加
 * @param {object} account 情報
 */
const createAccount = async (account) => {
  const accountModel = new AccountModel(account)
  accountModel.password = generateHash(account.password, 'utf8')
  return modelToObject(await accountModel.save())
}

/**
 * アカウント変更
 * @param {string} username 変更対象アカウント名（email）
 * @param {object} account 情報
 */
const updateAccount = async (username, account) => {
  const accountModel = await AccountModel.findOne({ username }).exec()
  if (!accountModel) return null

  Object.assign(accountModel, account)
  accountModel.password = generateHash(account.password, 'utf8')
  return modelToObject(await accountModel.save())
}

/**
 * アカウント物理削除
 * @param {string} username 変更対象アカウント名（email）
 */
const deleteAccount = async (username) => await AccountModel.deleteOne({ username }).exec()

/**
 * アカウント認証
 */
const authorize = async (username, password) => {
  const hash = generateHash(password, 'utf8')
  const accountModel = await AccountModel.findOne({ username, password: hash }).exec()
  if (!accountModel) return null

  // 認証できたのでtokenを更新
  accountModel.token = `${uuidv4()}-${uuidv4()}` 
  accountModel.exchangeCode = uuidv4()
  return modelToObject(await accountModel.save())
}

export default {
  getAccount,
  createAccount,
  updateAccount,
  deleteAccount,
  authorize
}
