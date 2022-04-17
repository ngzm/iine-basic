'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const accountSchema = new Schema({
  username: { type: String, required: true, index: true, unique: true },
  password: { type: String, required: true },
  userId: { type: Number, required: true },
  token: { type: String, required: true, index: true, unique: true },
  tokenExpired: { type: Date, default: null },
  exchangeCode: { type: String },
}, {
  versionKey: false,
  timestamp: false
})

export const AccountModel = mongoose.model('account', accountSchema)
