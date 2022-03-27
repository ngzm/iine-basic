'use strict'

import express from 'express'
import logger from '../lib/logger.mjs'
import AppError from '../lib/app-error.mjs'
import userStore from '../db/mongo/store.user.mjs'
import { validateParamsId } from './middleware.validators.mjs'

// ########################
// Validators
// ########################

const validateUrl = (request, response, next) => {
  logger.trace('request.query.url:', request.query.url);

  if (typeof request.query.url === 'undefined') {
    return next(new AppError(`400 Bad Request. Missing request url: [${request.query.url}]`, 400));
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
 router.get('/user-url', validateUrl, async(request, response, next) => {
  try {
    const user = await userStore.getUserByUrl(request.query.url)
    if (!user) throw new AppError('該当するユーザは見つかりませんでした', 404)

    logger.trace('user:', user.name);
    response.json(user)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ情報取得
 */
 router.get('/:id', validateParamsId, async(request, response, next) => {
  try {
    const user = await userStore.getUser(parseInt(request.params.id))
    if (!user) throw new AppError('該当するユーザは見つかりませんでした', 404)

    const userUrls = await userStore.getUserUrls(parseInt(request.params.id))
    if (userUrls) user.urls = userUrls

    response.json(user)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ一覧情報取得
 */
 router.get('/', async(request, response, next) => {
  try {
    const users = await userStore.getUsers()
    response.json(users)
  } catch (error) {
    next(error)
  }
})

/**
 * ユーザ追加
 */
 router.post('/', async(request, response, next) => {
  try {

    // TODO: --- テストデータ ---
    const user = {
      name: 'Long Live Net',
      note: '神奈川県川崎市川崎区駅前本町11番地2 川崎フロンティアビル4階',
    }
    const urls = ['longlivenet.com', 'www.longlivenet.com', 'longlivenet.iine.website' ]
    // TODO: --- テストデータ ---

    const stored = await userStore.createUser(user, urls)
    response.json(stored.user.id)
  } catch (error) {
    next(error)
  }
})

export default router
