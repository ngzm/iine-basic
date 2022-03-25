'use strict'

import express from 'express'
import config from 'config'
import cors from 'cors'

import logger, { setLogLevel } from './lib/logger.mjs'
import { mongooseConnect, tryMongoose } from './db/mongo/db.handler.mjs'

import newsRouter from './router/router.news.mjs'

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
  logger.info(`Example app listening on port ${port}`)
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
app.use(cors());

/**
 * check is DB Connected middleware function
 */
app.use((request, response, next) => {
  tryMongoose();
  next();
})

// ********************************
// Application Routers
// ********************************
app.use('/', newsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!')
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