'use strict'

import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { AccountModel } from './model/model.account.mjs'
import { modelToObject } from './db.handler.mjs'
import { generateHash } from '../../lib/auth.mjs'
import { isPresent } from '../../lib/utils.mjs'

/**
 * ユーザアカウント取得
 * @param {string} username 取得対象アカウント名（email）
 * @param {object} select 取得フィールド
 */
const getAccount = async (username, select = {}) => modelToObject(await AccountModel.findOne({ username }, select).exec())

/**
 * アカウント追加
 * @param {object} account 情報
 */
const createAccount = async (account) => {
  const accountModel = new AccountModel(account)
  accountModel.password = generateHash(account.password, 'utf8')
  accountModel.token = `${uuidv4()}-${uuidv4()}` 
  return modelToObject(await accountModel.save())
}

/**
 * アカウント物理削除
 * @param {string} username 変更対象アカウント名（email）
 */
const deleteAccount = async (username) => await AccountModel.deleteOne({ username }).exec()

/**
 * アカウントパスワード変更
 * @param {string} username 変更対象アカウント名（email）
 * @param {object} password
 */
const updatePassword = async (username, password) => {
  const accountModel = await AccountModel.findOne({ username }).exec()
  if (!accountModel) return null

  if (isPresent(password)) {
    accountModel.password = generateHash(password, 'utf8')
  }
  return modelToObject(await accountModel.save())
}

/**
 * ログイン認証
 */
const login = async (username, password) => {
  const hash = generateHash(password, 'utf8')
  const accountModel = await AccountModel.findOne({ username, password: hash }).exec()
  if (!accountModel) return null

  accountModel.token = `${uuidv4()}-${uuidv4()}` 
  accountModel.tokenExpired = dayjs().add(1, 'day').toDate()
   return modelToObject(await accountModel.save())
}

/**
 * ログアウト処理
 */
 const logout = async (token) => {
  const accountModel = await AccountModel.findOne({ token }).exec()
  if (!accountModel) return null

  accountModel.token = `${uuidv4()}-${uuidv4()}` 
  accountModel.tokenExpired = null
  return modelToObject(await accountModel.save())
}

/**
 * token 認証処理
 * @param {string} itoken
 */
const authorize = async (token) => {
  const accountModel = await AccountModel.findOne({ token }).exec()
  if (!accountModel) return null

  const tokenExpired = dayjs(accountModel.tokenExpired)
  const nowDate = dayjs()
  if (nowDate.isAfter(tokenExpired)) {
    accountModel.token = `${uuidv4()}-${uuidv4()}` 
    accountModel.tokenExpired = null
    await accountModel.save()
    return null
  }

  return modelToObject(accountModel)
}


export default {
  getAccount,
  authorize,
  createAccount,
  updatePassword,
  deleteAccount,
  login,
  logout,
}
