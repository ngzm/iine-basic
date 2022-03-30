'use strict'

import express from 'express'
import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import customerStore from '../db/mongo/store.customer.mjs'
import { validateParamsId } from './middleware.validators.mjs'

// ########################
// Validators
// ########################

const validateUrl = (request, response, next) => {
  logger.trace('request.query.url:', request.query.url)

  if (typeof request.query.url === 'undefined') {
    return next(new AppError(`400 Bad Request. Missing request url: [${request.query.url}]`, 400))
  }
  return next();
}

const checkExistUrls = async (request, response, next) => {
  // TODO: --- テストデータ ---
  request.body.customer = {
    name: 'Long Live Net',
    note: '神奈川県川崎市川崎区駅前本町11番地2 川崎フロンティアビル4階',
  }
  request.body.urls = ['longlivenet.com', 'www.longlivenet.com', 'longlivenet.iine.website' ]
  // TODO: --- テストデータ ---

  logger.trace('request.body.urls:', request.body.urls)

  if (await customerStore.isExistsUrls(request.body.urls)) {
    return next(new AppError(`400 Bad Request. Requested url duplicated: [${request.body.urls}]`, 400))
  }
  return next();
}

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * URL から該当するユーザ情報取得
 */
 router.get('/customer-url', validateUrl, async(request, response, next) => {
  try {
    const customer = await customerStore.getCustomerByUrl(request.query.url)
    if (!customer) throw new AppError('該当するユーザは見つかりませんでした', 404)

    logger.trace('customer:', customer.name);
    response.json(customer)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ情報取得
 */
 router.get('/:id', validateParamsId, async(request, response, next) => {
  try {
    const customer = await customerStore.getCustomer(parseInt(request.params.id))
    if (!customer) throw new AppError('該当するユーザは見つかりませんでした', 404)

    const customerUrls = await customerStore.getCustomerUrls(parseInt(request.params.id))
    if (customerUrls) customer.urls = customerUrls

    response.json(customer)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ一覧情報取得
 */
 router.get('/', async(request, response, next) => {
  try {
    const customers = await customerStore.getCustomers()
    response.json(customers)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ追加
 */
 router.post('/', checkExistUrls, async(request, response, next) => {
  try {
    const customer = await customerStore.createCustomer(request.body.customer)
    customer.urls = await customerStore.addCustomerUrl(customer.id, request.body.urls)
    response.json(customer)
  } catch (error) {
    next(error)
  }
})

export default router
