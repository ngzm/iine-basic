'use strict'

import express from 'express'
import cookieParser from 'cookie-parser'
import config from 'config'
import cors from 'cors'
import passport from 'passport'

import logger, { setLogLevel } from './lib/logger.mjs'
import { mongooseConnect, tryMongoose } from './db/mongo/db.handler.mjs'

// Admin pages Routers
import adminLoginRouter from './router/page/admin/router.admin-login.mjs'
import adminCustomersRouter from './router/page/admin/router.customers.mjs'
import adminCustomerUsersRouter from './router/page/admin/router.customer-users.mjs'

// API Routers
import authRouter from './router/api/router.auth.mjs'
import uploadsRouter from './router/api/router.uploads.mjs'
import customersRouter from './router/api/router.customers.mjs'
import eyecatchesRouter from './router/api/router.eyecatches.mjs'
import informationsRouter from './router/api/router.informations.mjs'
import newsesRouter from './router/api/router.newses.mjs'
import servicesRouter from './router/api/router.services.mjs'
import contactsRouter from './router/api/router.contacts.mjs'
import inquireRouter from './router/api/router.inquire.mjs'

/**
 * Log4j - set log level
 */
setLogLevel(config.appConfig.logLevel)

/**
 * Define node express application
 */
const app = express()
const port = config.appConfig.port || 3000
app.listen(port || 3000, () => {
  logger.info(`iine application listening on port ${port}`)
})

/**
 * connect mongo through Mongoose
 */
mongooseConnect(`mongodb://${config.dbConfig.host}:${config.dbConfig.port}/${config.dbConfig.database}`, {
  user: process.env['IINE_DB_UERNAME'],
  pass: process.env['IINE_DB_PASSWORD']
})

/**
 * Template engine
 */
app.set('view engine', 'ejs');

// ********************************
// Middlewares for all Routers
// ********************************
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())
app.use(passport.initialize());

/**
 * Debug print Access Path & Method
 */
app.use((request, response, next) => {
  try {
    logger.debug('====== path', request.path) 
    logger.debug('===== method', request.method) 
    next()
  } catch (error) {
    next(error)
  }
})

/**
 * check is DB Connected middleware function
 */
app.use((request, response, next) => {
  try {
    tryMongoose()
    next()
  } catch (error) {
    next(error)
  }
})

// ********************************
// Admin pages Routers
// ********************************
app.use('/admin/customers/login', adminLoginRouter)
app.use('/admin/customers', adminCustomersRouter)
app.use('/admin/customers', adminCustomerUsersRouter)

// ********************************
// Api Routers
// ********************************
app.use('/auth', authRouter)
app.use('/customers', customersRouter)
app.use('/uploads', uploadsRouter)
app.use('/eyecatches', eyecatchesRouter)
app.use('/informations', informationsRouter)
app.use('/newses', newsesRouter)
app.use('/services', servicesRouter)
app.use('/contacts', contactsRouter)
app.use('/inquire', inquireRouter)

/**
 * 共通エラーハンドラー
 * ここで next(error) されたものが全てロギングされエラーレスポンスされる
 */
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  const status = error.status || 500;
  if (status < 500) {
    logger.warn(error.message);
    logger.warn(error.stack);
  } else {
    logger.error(error.message);
    logger.error(error.stack);
  }
  response.status(status).json({ message: error.message });
});
