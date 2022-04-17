'use strict'

import express from 'express'
import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import customerStore from '../../db/mongo/store.customer.mjs'
import customerUserStore from '../../db/mongo/store.customer-user.mjs'
import accountStore from '../../db/mongo/store.account.mjs'
import { validateParamsId } from '../middleware.validators.mjs'

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 顧客ホームページ編集画面へリダイレクト
 */
 router.get('/homepage', async (request, response, next) => {
  try {
    const account = await accountStore.authorize(request.cookies.token)
    if (!account) throw new AppError('ユーザ認証できませんでした', 404)

    const user = await customerUserStore.getCustomerUserByEmail(account.username)
    if (!user) throw new AppError('ユーザは見つかりませんでした', 404)

    const customer = await customerStore.getCustomer(user.customerId)
    if (!customer) throw new AppError('顧客情報は見つかりませんでした', 404)

    const urls = await customerStore.getCustomerUrls(customer.id)
    if (!urls) throw new AppError('該当する顧客ホームページは見つかりませんでした', 404)

    logger.info('Customer page urls:', urls)
    // response.redirect(urls[0])
    response.redirect(`http://longlivenet.iine.website:4000/?code=${account.exchangeCode}`)
  } catch(error) {
    next(error)
  }
})

/**
 * 顧客ユーザログアウト処理
 */
 router.get('/logout', async (request, response, next) => {
  try {
    const token = request.cookies.token || ''
    const account = await accountStore.logout(token)
    if (!account) throw new AppError('ユーザ認証できませんでした', 404)

    logger.info('Customer user logouted.', `user: ${account.username}`)
    response.clearCookie('token')
    response.redirect('/auth/customers?result=11')
  } catch(error) {
    next(error)
  }
})

/**
 * 顧客ユーザログイン成功画面
 */
router.get('/:id', validateParamsId, async (request, response, next) => {
  try {
    const account = await accountStore.authorize(request.cookies.token)
    if (!account) throw new AppError('ユーザ認証できませんでした', 404)

    const user = await customerUserStore.getCustomerUserByEmail(account.username)
    if (!user) throw new AppError('ユーザは見つかりませんでした', 404)

    const customer = await customerStore.getCustomer(user.customerId)
    if (!customer) throw new AppError('顧客情報は見つかりませんでした', 404)

    if (request.id !== user.id) throw new AppError('ユーザIDに問題があります', 400)

    response.render('auth/customer-user', { customer, user, account })
  } catch(error) {
    next(error)
  }
})

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
    const account = await accountStore.login(username, password)
    if (account) {
      logger.info('Customer user login success.', `user: ${account.username}`)
      response.cookie ('token', account.token)
      response.redirect(`/auth/customers/${account.userId}`)
    } else {
      logger.warn('Customer user login failure.', `input username: ${username}`)
      response.redirect('/auth/customers?result=1')
    }
  } catch(error) {
    next(error)
  }
})

export default router
