'use strict'

import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid'

const Schema = mongoose.Schema

const accountSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number },
  token: { type: String, required: true, index: true, unique: true },
  tokenExpired: { type: Date, default: null },
  exchangeCode: { type: String },
}, {
  versionKey: false,
  timestamp: false
})

accountSchema.pre('validate', async function(next) {
  this.token = `${uuidv4()}-${uuidv4()}` 
  return next()
})

export const AccountModel = mongoose.model('account', accountSchema)
