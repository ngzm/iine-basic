'use strict'

import express from 'express'
import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import accountStore from '../../db/mongo/store.account.mjs'

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 顧客ユーザログイン画面表示
 */
router.get('/', (request, response, next) => {
  try {
    const result = request.query.result || null
    response.render('auth/customer-user-login', { result })
  } catch(error) {
    next(error)
  }
})

/**
 * 顧客ユーザログイン
 */
router.post('/', async(request, response, next) => {
  try {
    const { username, password } = request.body
    const customerUser = await accountStore.authorize(username, password)
    if (customerUser) {
      logger.info('Customer user login success.', `user: ${customerUser.username}`)

      // TODO: ログイン成功後の画面 (サイト編集ボタン、パスワード変更ボタン)
      response.redirect(`/auth/customers`)
    } else {
      logger.warn('Customer user login failure.', `input username: ${username}`)
      response.redirect(`/auth/customers?result=1`)
    }
  } catch(error) {
    next(error)
  }
})

export default router
