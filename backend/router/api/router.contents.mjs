'use strict'

import passport from 'passport'
import AppError from '../../lib/app-error.mjs'
import {
  validateQueryCustomerId,
  validateParamsId,
  validateBodyRequired,
  validatePositions
} from '../middleware.validators.mjs'

export default function(router, store) {
  /**
   * Content 一覧の position 変更
   */
  router.put('/positions', passport.authenticate('bearer', { session: false }), validateBodyRequired, validatePositions, async(request, response, next) => {
    try {
      const contents = await store.updateContentPositions(request.body)
      response.json(contents)
    } catch (error) {
      next(error)
    }
  })

  /**
   * Content 情報取得
   */
  router.get('/:id', validateParamsId, async(request, response, next) => {
    try {
      const content = await store.getContent(request.id)
      if (!content) throw new AppError('該当する情報は見つかりませんでした', 404)

      response.json(content)
    } catch (error) {
      next(error)
    }
  })

  /**
   * Content一覧情報取得
   */
  router.get('/', validateQueryCustomerId, async(request, response, next) => {
    try {
      const contents = await store.getContents({ customerId: request.customerId })
      response.json(contents)
    } catch (error) {
      next(error)
    }
  })

  /**
   * Content追加
   */
  router.post('/', passport.authenticate('bearer', { session: false }), validateQueryCustomerId, async (request, response, next) => {
      try {
        const content = await store.createContent(request.body)
        response.json(content)
      } catch (error) {
        next(error)
      }
    }
  )

  /**
   * Content変更
   */
  router.put('/:id', passport.authenticate('bearer', { session: false }), validateParamsId, validateBodyRequired, async(request, response, next) => {
    try {
      const content = await store.updateContent(request.id, request.body)
      if (!content) throw new AppError('該当する情報は見つかりませんでした', 404)

      response.json(content)
    } catch (error) {
      next(error)
    }
  })

  /**
   * Content削除
   * ここでは論理削除します
   */
  router.delete('/:id', passport.authenticate('bearer', { session: false }), validateBodyRequired, async(request, response, next) => {
    try {
      const ret = await store.logicalDeleteContent(request.id)
      if (!ret) throw new AppError('該当する情報は見つかりませんでした', 404)

      response.status(204).send();
    } catch (error) {
      next(error)
    }
  })
}
