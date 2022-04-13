'use strict'

import express from 'express'
import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import { isPresent, isInt } from '../../lib/utils.mjs'
import customerStore from '../../db/mongo/store.customer.mjs'
import customerUserStore from '../../db/mongo/store.customer-user.mjs'
import accountStore from '../../db/mongo/store.account.mjs'
import { validateParamsId } from '../middleware.validators.mjs'

// ########################
// Validators
// ########################

const checkCustomer = async (request, response, next) => {
  try {
    if (!isPresent(request.body.name)) {
      throw new AppError('400 Bad Request. customer name is required, 400')
    }
    next()
  } catch(error) {
    next(error)
  }
}

const checkExistUrls = async (request, response, next) => {
  try {
    const customerId = isInt(request.body.id) ? parseInt(request.body.id) : 0
    const urls = request.body.urls && Array.isArray(request.body.urls) ? request.body.urls.filter((u) => u && u.length > 0) : []
    if (await customerStore.isExistsUrls(customerId, urls)) {
      throw new AppError('400 Bad Request. Requested url duplicated', 400)
    }
    request.urls = urls
    next()
  } catch(error) {
    next(error)
  }
}

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 顧客情報削除
 */
router.get('/delete/:id', validateParamsId, async(request, response, next) => {
  try {
    const users = await customerUserStore.getCustomerUsers(request.id)
    for (const user of users) {
      await accountStore.deleteAccount(user.email)
      await customerUserStore.deleteCustomerUser(user.id)
    }
    await customerStore.deleteCustomerUrl(request.id)
    await customerStore.deleteCustomer(request.id)

    response.redirect('/admin/customers')
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客情報追加フォーム
 */
router.get('/new', async(request, response, next) => {
  try {
    const customer = {}
    response.render('admin/customer-form', { customer, method: 'post' })
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客情報変更フォーム
 */
router.get('/:id', validateParamsId, async(request, response, next) => {
  try {
    const customer = await customerStore.getCustomer(request.id)
    if (!customer) throw new AppError('該当する顧客は見つかりませんでした', 404)

    const customerUrls = await customerStore.getCustomerUrls(request.id)
    if (customerUrls) customer.urls = customerUrls

    response.render('admin/customer-form', { customer, method: 'put' })
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客一覧情報取得
 */
router.get('/', async(request, response, next) => {
  try {
    const customers = await customerStore.getCustomers()
    response.render('admin/customer-index', { customers })
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客変更
 */
router.post('/:id', validateParamsId, checkExistUrls, async(request, response, next) => {
  try {
    const customer = await customerStore.updateCustomer(request.id, { name: request.body.name, note: request.body.note })
    if (!customer) throw new AppError('変更する顧客は見つかりませんでした', 404)

    await customerStore.deleteCustomerUrl(request.id)
    customer.urls = await customerStore.addCustomerUrl(customer.id, request.urls)

    response.redirect('/admin/customers')
  } catch (error) {
    next(error)
  }
})

/**
 * 顧客追加
 */
router.post('/', checkCustomer, checkExistUrls, async(request, response, next) => {
  try {
    const customer = await customerStore.createCustomer({ name: request.body.name, note: request.body.note })
    customer.urls = await customerStore.addCustomerUrl(customer.id, request.urls)

    response.redirect('/admin/customers')
  } catch (error) {
    next(error)
  }
})

export default router
