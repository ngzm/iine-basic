'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

const customerUserSchema = new Schema({
  id: { type: Number, required: true, index: true, unique: true },
  customerId: { type: Number, required: true, index: true },
  email: { type: String, required: true, index: true, unique: true },
  name: { type: String, required: true },
  note: { type: String },
}, {
  versionKey: false,
  timestamp: true
})

customerUserSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { idKey: 'customerUserId' },
      { $inc: { idValue: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.idValue
  }
  return next()
})

export const CustomerUserModel = mongoose.model('customerUser', customerUserSchema)
