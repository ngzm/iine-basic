'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

const serviceSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  customerId: { type: Number, required: true, index: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  body: { type: String, required: true },
  image: { type: String, required: true },
  link: { type: String },
  position: { type: Number, required: true },
  removed: { type: Boolean, default: false },
},{
  versionKey: false,
  timestamp: true
})

serviceSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { idKey: 'serviceId' },
      { $inc: { idValue: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.idValue
    this.position ||= this.id
  }
  return next()
})

export default mongoose.model('service', serviceSchema)
