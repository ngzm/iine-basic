'use strict'

import express from 'express'
import config from 'config'
import cors from 'cors'
import logger, { setLogLevel } from './lib/logger.mjs'
import { mongooseConnect, tryMongoose } from './db/mongo/db.handler.mjs'
import uploadsRouter from './router/router.uploads.mjs'
import customersRouter from './router/router.customers.mjs'
import eyecatchesRouter from './router/router.eyecatches.mjs'
import servicesRouter from './router/router.services.mjs'

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

// ********************************
// Middlewares for all Routers
// ********************************
app.use(express.json())
app.use(cors());

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
// Application Routers
// ********************************
app.use('/customers', customersRouter);
app.use('/uploads', uploadsRouter);
app.use('/eyecatches', eyecatchesRouter);
app.use('/services', servicesRouter);

app.get('/', async (req, res) => {
  res.send('This is the iine-dot-website')
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
