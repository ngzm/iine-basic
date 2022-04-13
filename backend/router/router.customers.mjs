'use strict'

import express from 'express'
import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import { isPresent } from '../lib/utils.mjs'
import customerStore from '../db/mongo/store.customer.mjs'
import { validateParamsId } from './middleware.validators.mjs'

// ########################
// Validators
// ########################

const validateUrl = (request, response, next) => {
  logger.trace('request.query.url:', request.query.url)
  try {
    if (!isPresent(request.query.url)) {
      throw new AppError('400 Bad Request. Missing request url', 400)
    }
    return next();
  } catch (error) {
    next(error)
  }
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
    const customer = await customerStore.getCustomer(request.id)
    if (!customer) throw new AppError('該当するユーザは見つかりませんでした', 404)

    const customerUrls = await customerStore.getCustomerUrls(request.id)
    if (customerUrls) customer.urls = customerUrls

    response.json(customer)
  } catch (error) {
    next(error)
  }
})

export default router
