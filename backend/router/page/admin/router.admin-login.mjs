'use strict'

import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import logger from '../../../lib/logger.mjs'
import AppError from '../../../lib/app-error.mjs'

let adminToken = `${uuidv4()}-${uuidv4()}` 

// ########################
// Validators
// ########################

/**
 * 認証されているかどうかをチェックする Middleware
 * 認証ユーザが有効かどうかも確認する
 */
 export const checkAuthorized = async (request, response, next) => {
  try {
    if (request.cookies['admin-token'] !== adminToken) {
      throw new AppError('管理者認証できませんでした', 401)
    }
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
 * システム管理者ログイン画面表示
 */
router.get('/', (request, response, next) => {
  try {
    const result = request.query.result || null
    response.render('admin/admin-login', { result })
  } catch(error) {
    next(error)
  }
})

/**
 * システム管理者ログイン画面表示
 */
router.post('/', (request, response, next) => {
  try {
    const { password } = request.body
    if (password === process.env['ADMIN_PASSWORD']) {
      logger.info('ADMIN USER !! login success.')
      adminToken = `${uuidv4()}-${uuidv4()}` 
      response.cookie ('admin-token', adminToken)
      response.redirect('/admin/customers')
    } else {
      logger.warn('ADMIN USER login failure')
      response.redirect('/admin/customers/login?result=1')
    }
  } catch(error) {
    next(error)
  }
})

export default router
