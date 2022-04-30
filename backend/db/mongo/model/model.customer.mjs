'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

import { CustomerUserModel } from './model.customer-user.mjs'
import ContactModel from './model.contact.mjs'
import EyecatchModel from './model.eyecatch.mjs'
import InformationModel from './model.information.mjs'
import NewsModel from './model.news.mjs'
import ServiceModel from './model.service.mjs'

const Schema = mongoose.Schema

const customerSchema = new Schema({
  id: { type: Number, required: true, index: true, unique: true },
  name: { type: String, required: true },
  template: { type: String, required: true },
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

async function deleteCascade(next) {
  const doc = await this.model.findOne(this.getFilter());
  if (doc && doc.id) {
    await ContactModel.deleteMany({ customerId: doc.id })
    await EyecatchModel.deleteMany({ customerId: doc.id })
    await InformationModel.deleteMany({ customerId: doc.id })
    await NewsModel.deleteMany({ customerId: doc.id })
    await ServiceModel.deleteMany({ customerId: doc.id })
    await CustomerUserModel.deleteMany({ customerId: doc.id })
    await CustomerUrlModel.deleteMany({ customerId: doc.id })
  }
  next();
}
customerSchema.pre('deleteMany', { document: false, query: true }, deleteCascade)
customerSchema.pre('deleteOne', { document: false, query: true }, deleteCascade)

const customerUrlSchema = new Schema({
  customerId: { type: Number, required: true, index: true },
  url: { type: String, required: true, index: true, unique: true },
  primary: { type: Boolean },
}, {
  versionKey: false,
  timestamp: false
})
customerUrlSchema.index({ customerId: 1, url: 1 })

export const CustomerModel = mongoose.model('customer', customerSchema)
export const CustomerUrlModel = mongoose.model('customer_url', customerUrlSchema)
