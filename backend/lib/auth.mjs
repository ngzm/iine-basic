'use strict'

import crypto from 'crypto'

/**
 * SHA256 Hash digest を返す
 * @param {*} value
 * @returns SHA256 Hash digest
 */
export const generateHash = (value) => {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}
