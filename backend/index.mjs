'use strict'

import express from 'express'
import cookieParser from 'cookie-parser'
import config from 'config'
import cors from 'cors'
import logger, { setLogLevel } from './lib/logger.mjs'
import { mongooseConnect, tryMongoose } from './db/mongo/db.handler.mjs'

// Admin pages Routers
import adminCustomersRouter from './router/admin/router.customers.mjs'
import adminCustomerUsersRouter from './router/admin/router.customer-users.mjs'

// Auth Pages Routers
import authCustomerUsersRouter from './router/auth/router.customer-user.mjs'

// API Routers
import uploadsRouter from './router/router.uploads.mjs'
import customersRouter from './router/router.customers.mjs'
import eyecatchesRouter from './router/router.eyecatches.mjs'
import informationsRouter from './router/router.informations.mjs'
import newsesRouter from './router/router.newses.mjs'
import servicesRouter from './router/router.services.mjs'
import contactsRouter from './router/router.contacts.mjs'

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
app.use('/admin/customers', adminCustomersRouter)
app.use('/admin/customers', adminCustomerUsersRouter)

// ********************************
// Auth pages Routers
// ********************************
app.use('/auth/customers', authCustomerUsersRouter)

// ********************************
// Api Routers
// ********************************
app.use('/customers', customersRouter)
app.use('/uploads', uploadsRouter)
app.use('/eyecatches', eyecatchesRouter)
app.use('/informations', informationsRouter)
app.use('/newses', newsesRouter)
app.use('/services', servicesRouter)
app.use('/contacts', contactsRouter)


import passport from 'passport'
import BearerStrategy from 'passport-http-bearer'

passport.use(new BearerStrategy(
  function(token, done) {
    console.log('token', token)
    if (token.length > 20) {
      return done(null, { id: 1, email: 'nagazumi@longlivenet.com', nickname: 'Naoki', fullname: '長住直樹' }, { scope: 'read' });
    } else {
      return done(new Error('401: --- unauthrized ---'));
    }
  }
));


app.get('/need', passport.authenticate('bearer', { session: false }), async (req, res, next) => {
  console.log('req', req)

  res.send('OK!');
})

app.get('/login', async (req, res) => {
  res.oidc.login({ returnTo: '/' })
})

app.get('/logouted', async (req, res) => {
  res.send('logouted bye')
})


/**
 * 共通エラーハンドラー
 * ここで next(error) されたものが全てロギングされエラーレスポンスされる
 */
// eslint-disable-next-line no-unused-vars
app.use((error, request, response, next) => {
  const status = error.status || 500;
  if (status < 500) {
    logger.warn(error.message);
  } else {
    logger.error(error.message);
  }
  response.status(status).json({ message: error.message });
});
