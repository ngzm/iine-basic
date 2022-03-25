'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

const newsSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  userId: { type: Number, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  body: { type: String },
  image: { type: String },
  link: { type: String },
  position: { type: Number },
  removed: { type: Boolean },
  category: { type: String, required: true },
  publishOn: { type: Date },
},{
  collection: 'newses',
  versionKey: false,
  timestamp: true
})

newsSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { _id: 'newsId' },
      { $inc: { value: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.value
  }
  return next()
})

export default mongoose.model('newses', newsSchema)
