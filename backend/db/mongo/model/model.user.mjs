'use strict'

import mongoose from 'mongoose'
import IdSequence from './model.sequences.mjs'

const Schema = mongoose.Schema

const userSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  note: { type: String },
  removed: { type: Boolean, default: false },
}, {
  versionKey: false,
  timestamp: true
})

userSchema.pre('validate', async function(next) {
  if (this.isNew) {
    const idSeq = await IdSequence.findOneAndUpdate(
      { idKey: 'userId' },
      { $inc: { idValue: 1 } },
      { new: true, upsert: true }
    )
    this.id = idSeq.idValue
  }
  return next()
})

const userUrlSchema = new Schema({
  userId: { type: Number, required: true },
  url: { type: String, required: true, unique: true },
}, {
  versionKey: false,
  timestamp: false
})
// userUrlSchema.index({ userId: 1, url: 1 }, { unique: true });

export const UserModel = mongoose.model('user', userSchema)
export const UserUrlModel = mongoose.model('user_url', userUrlSchema)
