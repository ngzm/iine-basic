'use strict'

import express from 'express'
import logger from '../../lib/logger.mjs'
import AppError from '../../lib/app-error.mjs'
import SendMail from '../../lib/send-mail.mjs'
import { isPresent } from '../../lib/utils.mjs'
import { validateQueryCustomerId, validateBodyRequired } from '../middleware.validators.mjs'
import customerStore from '../../db/mongo/store.customer.mjs'

// ########################
// Validators
// ########################

const validateMail = (request, response, next) => {
  try {
    if (!isPresent(request.body.name)) {
      throw new AppError('400 Bad Request. Missing request inquirer name', 400)
    }
    if (!isPresent(request.body.email)) {
      throw new AppError('400 Bad Request. Missing request inquirer email', 400)
    }
    if (!isPresent(request.body.inquiry)) {
      throw new AppError('400 Bad Request. Missing request inquiry', 400)
    }
    return next()
  } catch (error) {
    next(error)
  }
}

// ########################
// Routers
// ########################

const router = express.Router();

/**
 * 問い合わせメール送信
 */
 router.post('/', validateQueryCustomerId, validateBodyRequired, validateMail, async(request, response, next) => {
  try {
    const customer = await customerStore.getCustomer(request.customerId)
    if (!customer) throw new AppError('該当する顧客は見つかりませんでした', 404)

    const mailText = `
${request.body.name} 様

${customer.name} にお問い合わせいただきまして
誠にありがとうございます。

以下のお問い合わせを承りました。
---------------

◆ お名前
${request.body.name} 様

◆ メールアドレス
${request.body.email}

◆ 電話番号
${request.body.phone || '未設定'}

◆ お問い合わせ内容
${request.body.inquiry}

-------------------
当お問い合わせにつきましては、追って担当よりご連絡いたします。
何卒今しばらくお待ちください。

今後ともよろしくお願い申し上げます。
`
    const mail = {
      to: request.body.email,
      cc: customer.defaultEmail,
      subject: `${customer.name} へのお問い合わせ`, 
      text: mailText,
    }
    logger.trace('== inquire mail ==', mail)

    const mailer = new SendMail()
    mailer.send(mail)

    response.status(204).send()

  } catch (error) {
    next(error)
  }
})

export default router
