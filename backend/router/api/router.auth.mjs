'use strict'

import express from 'express'
import passport from 'passport'
import BearerStrategy from 'passport-http-bearer'

import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import { isDefined, isPresent } from '../../lib/utils.mjs'
import customerStore from '../../db/mongo/store.customer.mjs'
import customerUserStore from '../../db/mongo/store.customer-user.mjs'
import accountStore from '../../db/mongo/store.account.mjs'

// ########################
// Auth middleware
// ########################

passport.use(new BearerStrategy(
  async (token, done) => {
    logger.trace('=== access token ===', token)

    try {
      const account = await accountStore.authorize(token)
      if (!account) throw new AppError('ユーザ認証できませんでした', 401)

      done(null, { ...account });
    } catch(error) {
      done(error)
    }
  }
))

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 認証コードから認証済みユーザを検索してそのtokenを返す
 */
 router.post('/customer-user', async(request, response, next) => {
  try {
    console.log('request.body', request.body)

    if (!isDefined(request.body) || !isPresent(request.body.code)) {
      throw new AppError('ユーザ認証できませんでした', 401)
    }

    const account = await accountStore.exchangeToken(request.body.code)
    if (!account) throw new AppError('ユーザ認証できませんでした', 401)

    const user = await customerUserStore.getCustomerUserByEmail(account.username)
    if (!user) throw new AppError('ユーザは見つかりませんでした', 401)

    const customer = await customerStore.getCustomer(user.customerId)
    if (!customer) throw new AppError('顧客情報は見つかりませんでした', 401)

    logger.trace('account:', { ...account, password: '!!MASK!!' });
    response.json({ token: account.token })
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客ユーザ情報取得
 */
 router.get('/customer-user', passport.authenticate('bearer', { session: false }), async(request, response, next) => {
  try {
    console.log('request.user', request.user)

    const user = await customerUserStore.getCustomerUserByEmail(request.user.username)
    if (!user) throw new AppError('ユーザは見つかりませんでした', 401)

    response.json({ user })
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客ユーザログアウト
 */
 router.delete('/customer-user', passport.authenticate('bearer', { session: false }), async(request, response, next) => {
  try {
    await accountStore.logout(request.user.token)
    response.status(204).send()
  } catch (error) {
    next(error)
  }
})

export default router
