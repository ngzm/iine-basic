'use strict'

import express from 'express'
import logger from '../../../lib/logger.mjs'
import AppError from '../../../lib/app-error.mjs'
import { passwordComplexity } from '../../../lib/utils.mjs'
import customerStore from '../../../db/mongo/store.customer.mjs'
import customerUserStore from '../../../db/mongo/store.customer-user.mjs'
import accountStore from '../../../db/mongo/store.account.mjs'
import { validateParamsId } from '../../middleware.validators.mjs'

// ########################
// Validators
// ########################

/**
 * 認証されているかどうかをチェックする Middleware
 * 認証ユーザが有効かどうかも確認する
 */
 const checkAuthorized = async (request, response, next) => {
  try {
    const account = await accountStore.authorize(request.cookies.token || '')
    if (!account) throw new AppError('ユーザ認証できませんでした', 401)

    const user = await customerUserStore.getCustomerUserByEmail(account.username)
    if (!user) throw new AppError('ユーザは見つかりませんでした', 404)

    const customer = await customerStore.getCustomer(user.customerId)
    if (!customer) throw new AppError('顧客情報は見つかりませんでした', 404)

    request.authorizedUserInfo = { account, user, customer }
    next()
  } catch (error) {
    next(error)
  }
}


// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 顧客ホームページ編集画面へリダイレクト
 */
 router.get('/homepage', checkAuthorized, async (request, response, next) => {
  try {
    const { account, customer } = request.authorizedUserInfo
    const urls = await customerStore.getCustomerUrls(customer.id)
    logger.info('Customer page urls:', urls)
    if (!urls) throw new AppError('該当する顧客ホームページは見つかりませんでした', 404)

    const { exchangeCode } = await accountStore.generateExchangeCode(account.token)
    logger.info('ExchangeCode:', exchangeCode)

    // const hpUrl = `http://${urls[0]}/auth/customer-user?code=${exchangeCode}`
    const hpUrl = `http://longlivenet.iine.website:4000/auth/customer-user?code=${exchangeCode}`
    response.redirect(hpUrl)
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
    if (!account) throw new AppError('ユーザ認証できませんでした', 401)

    logger.info('Customer user logouted.', `user: ${account.username}`)
    response.clearCookie('token')
    response.redirect('/member/login?result=11')
  } catch(error) {
    next(error)
  }
})

/**
 * 顧客ユーザパスワード変更フォーム画面
 */
router.get('/:id/password', validateParamsId, checkAuthorized, async (request, response, next) => {
  try {
    const { user, customer } = request.authorizedUserInfo
    if (request.id !== user.id) throw new AppError('ユーザIDに問題があります', 400)

    const result = request.query.result || null
    response.render('auth/customer-user-password-form', { customer, user, result })
  } catch(error) {
    next(error)
  }
})

/**
 * 顧客ユーザログイン成功画面
 */
router.get('/:id', validateParamsId, checkAuthorized, async (request, response, next) => {
  try {
    const { account, user, customer } = request.authorizedUserInfo
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
 * 顧客ユーザパスワード変更
 */
router.post('/:id/password', validateParamsId, checkAuthorized, async(request, response, next) => {
  try {
    const { account, user } = request.authorizedUserInfo
    if (request.id !== user.id) throw new AppError('ユーザIDに問題があります', 400)

    const { password, passwordConfirm } = request.body
    if (password !== passwordConfirm) {
      response.redirect(`/member/login/${user.id}/password?result=1`)
      return
    }
    if (password.length < 8) {
      response.redirect(`/member/login/${user.id}/password?result=2`)
      return
    }
    if (!passwordComplexity(password)) {
      response.redirect(`/member/login/${user.id}/password?result=3`)
      return
    }

    await accountStore.updatePassword(account.username, password)
    response.redirect(`/member/login/${account.userId}`)
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
      response.redirect(`/member/login/${account.userId}`)
    } else {
      logger.warn('Customer user login failure.', `input username: ${username}`)
      response.redirect('/member/login?result=1')
    }
  } catch(error) {
    next(error)
  }
})

export default router
