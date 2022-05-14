'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

const newsSchema = new Schema({
  id: { type: Number, required: true, index: true, unique: true },
  customerId: { type: Number, required: true, index: true  },
  title: { type: String, required: true },
  subtitle: { type: String },
  body: { type: String, required: true },
  image: {
    url: { type: String },
    lgSize: { type: String },
    smSize: { type: String },
    lgPosition: { type: String },
    smPosition: { type: String },
  },
  category: { type: String, required: true },
  publishOn: { type: Date,  required: true, index: true },
  tags: [{ type: String }],
},{
  collection: 'newses',
  versionKey: false,
  timestamp: true
})

newsSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { idKey: 'newsId' },
      { $inc: { idValue: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.idValue
  }
  return next()
})

export default mongoose.model('newses', newsSchema)
