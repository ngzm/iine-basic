'use strict';

import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import { isInt } from '../lib/utils.mjs'

/**
 * Request params id 形式チェック Middleware
 */
export const validateParamsId = (request, response, next) => {
  logger.trace('request.params.id:', request.params.id)

  if (typeof request.params.id === 'undefined') {
    return next(new AppError(`400 Bad Request. Missing request id: [${request.params.id}]`, 400))
  }
  if (!isInt(request.params.id)) {
    return next(new AppError(`400 Bad Request. not number of request id: [${request.params.id}]`, 400))
  }
  next()
}

/**
 * Request query customerId 形式チェック Middleware
 * **Queryです**
 */
export const validateQueryCustomerId = (request, response, next) => {
  logger.trace('request.query.customerId:', request.query.customerId)

  if (typeof request.query.customerId === 'undefined') {
    return next(new AppError(`400 Bad Request. Missing request customerId: [${request.query.customerId}]`, 400))
  }
  if (!isInt(request.query.customerId)) {
    return next(new AppError(`400 Bad Request. not number of request customerId: [${request.query.customerId}]`, 400))
  }
  next()
}

/**
 * request body 存在チェック Middleware
 */
export const validateBodyRequired = (request, response, next) => {
  logger.trace('request.body:', JSON.stringify(request.body, null, 2))

  if (typeof request.body === 'undefined') {
    return next(new AppError('400 Bad Request. Missing request body', 400))
  }
  next()
}

/**
 * request body Service 一覧 position データチェック Middleware
 */
export const validatePositions = (request, response, next) => {
  if (!request.body || !Array.isArray(request.body)) {
    return next(new AppError(`400 Bad Request. positions data is not Array: [${positions}]`, 400))
  }
  next()
}
