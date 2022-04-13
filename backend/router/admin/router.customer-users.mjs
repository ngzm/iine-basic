'use strict'

import express from 'express'
import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import { isDefined, isPresent, isInt } from '../../lib/utils.mjs'
import customerStore from '../../db/mongo/store.customer.mjs'
import customerUserStore from '../../db/mongo/store.customer-user.mjs'
import accountStore from '../../db/mongo/store.account.mjs'
import { validateParamsId } from '../middleware.validators.mjs'

// ########################
// Validators
// ########################

/**
 * Request params customerId 形式チェック Middleware
 */
const validateParamsCustomer = async (request, response, next) => {
  logger.trace('request.params.customerId:', request.params.customerId)
  try {
    const { customerId } = request.params

    if (!isDefined(customerId)) throw new AppError('400 Bad Request. customerId is required', 400)
    if (!isInt(customerId)) throw new AppError('400 Bad Request. customerId is wrong', 400)

    const customer = await customerStore.getCustomer(customerId)
    if (!customer) throw new AppError('該当する顧客は見つかりませんでした', 404)

    request.customer = customer
    next()
  } catch (error) {
    next(error)
  }
}

const checkUser = async (request, response, next) => {
  logger.trace('request.body:', request.body)
  try {
    const { email, name, customerId } = request.body
    if (!isPresent(email)) throw new AppError('400 Bad Request. customer email is required, 400')
    if (!isPresent(name)) throw new AppError('400 Bad Request. customer name is required, 400')
    if (!isPresent(customerId)) throw new AppError('400 Bad Request. customer customerId is required, 400')

    next()
  } catch (error) {
    next(error)
  }
}

const checkAccount = async (request, response, next) => {
  try {
    const { password } = request.body
    if (!isPresent(password)) throw new AppError('400 Bad Request. password is required, 400')

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
 * 顧客ユーザ情報削除
 * ログインアカウント情報も併せて削除する
 */
router.get(
  '/:customerId/users/delete/:id',
  validateParamsCustomer,
  validateParamsId,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const user = await customerUserStore.getCustomerUser(request.id)
      if (!user) throw new AppError('該当するユーザは見つかりませんでした', 404)

      await accountStore.deleteAccount(user.email)
      await customerUserStore.deleteCustomerUser(user.id)
      response.redirect(`/admin/customers/${customer.id}/users`)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * 顧客ユーザ情報追加フォーム
 */
router.get(
  '/:customerId/users/new',
  validateParamsCustomer,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const user = {}
      response.render('admin/customer-user-form', { customer, user, method: 'post' })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * 顧客ユーザ情報変更フォーム
 */
router.get(
  '/:customerId/users/:id',
  validateParamsCustomer,
  validateParamsId,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const user = await customerUserStore.getCustomerUser(request.id)
      if (!user) throw new AppError('該当するユーザは見つかりませんでした', 404)

      response.render('admin/customer-user-form', { customer, user, method: 'put' })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * 顧客ユーザ一覧情報取得
 */
router.get(
  '/:customerId/users',
  validateParamsCustomer,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const users = await customerUserStore.getCustomerUsers(customer.id)
      response.render('admin/customer-user-index', { customer, users })
    } catch (error) {
      next(error)
    }
  }
)

/**
 * 顧客ユーザ変更
 */
router.post(
  '/:customerId/users/:id',
  validateParamsCustomer,
  validateParamsId,
  checkUser,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const user = await customerUserStore.updateCustomerUser(request.id, {
        customerId: customer.id,
        email: request.body.email,
        name: request.body.name,
        note: request.body.note,
      })

      if (isPresent(request.body.password)) {
        await accountStore.updateAccount(user.email, {
          password: request.body.password,
        })
      }

      response.redirect(`/admin/customers/${customer.id}/users`)
    } catch (error) {
      next(error)
    }
  }
)

/**
 * 顧客ユーザ追加
 */
router.post(
  '/:customerId/users',
  validateParamsCustomer,
  checkUser,
  checkAccount,
  async(request, response, next) => {
    try {
      const customer = request.customer
      const user = await customerUserStore.createCustomerUser({
        customerId: customer.id,
        email: request.body.email,
        name: request.body.name,
        note: request.body.note,
      })

      await accountStore.createAccount({
        username: user.email,
        password: request.body.password,
        userId: user.id,
      })

      response.redirect(`/admin/customers/${customer.id}/users`)
    } catch (error) {
      next(error)
    }
  }
)

export default router
