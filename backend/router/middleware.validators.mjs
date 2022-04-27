'use strict';

import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import { isDefined, isInt } from '../lib/utils.mjs'

/**
 * Request params id 形式チェック Middleware
 */
export const validateParamsId = (request, response, next) => {
  logger.trace('request.params.id:', request.params.id)
  try {
    if (!isDefined(request.params.id)) throw new AppError('400 Bad Request. Missing request id', 400)
    if (!isInt(request.params.id)) throw new AppError('400 Bad Request. not number of request id', 400)

    request.id = parseInt(request.params.id)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * Request query customerId 形式チェック Middleware
 * **Queryです**
 */
export const validateQueryCustomerId = (request, response, next) => {
  logger.trace('request.query.customerId:', request.query.customerId)
  try {
    if (!isDefined(request.query.customerId)) throw new AppError('400 Bad Request. Missing request customerId', 400)
    if (!isInt(request.query.customerId)) throw new AppError('400 Bad Request. not number of request customerId', 400)

    request.customerId = parseInt(request.query.customerId)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * request body 存在チェック Middleware
 */
export const validateBodyRequired = (request, response, next) => {
  logger.trace('request.body:', JSON.stringify(request.body, null, 2))
  try {
    if (!isDefined(request.body) || !Object.keys(request.body).length) throw new AppError('400 Bad Request. Missing request body', 400)
    next()
  } catch (error) {
    next(error)
  }
}

/**
 * request body Service 一覧 position データチェック Middleware
 */
export const validatePositions = (request, response, next) => {
  try {
    if (!isDefined(request.body)) throw new AppError('400 Bad Request. Missing request body', 400)
    if (!Array.isArray(request.body)) throw new AppError('400 Bad Request. positions data is not Array', 400)

    next()
  } catch(error) {
    next(error)
  }
}
