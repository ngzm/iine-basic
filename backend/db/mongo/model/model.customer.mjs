'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

// TODO: Add template
const customerSchema = new Schema({
  id: { type: Number, required: true, index: true, unique: true },
  name: { type: String, required: true },
  note: { type: String },
}, {
  versionKey: false,
  timestamp: true
})

customerSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { idKey: 'customerId' },
      { $inc: { idValue: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.idValue
  }
  return next()
})

const customerUrlSchema = new Schema({
  customerId: { type: Number, required: true, index: true },
  url: { type: String, required: true, index: true, unique: true },
}, {
  versionKey: false,
  timestamp: false
})
customerUrlSchema.index({ customerId: 1, url: 1 })

export const CustomerModel = mongoose.model('customer', customerSchema)
export const CustomerUrlModel = mongoose.model('customer_url', customerUrlSchema)
