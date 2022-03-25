'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const idSequence = new Schema({
  _id: { type: String, required: true },
  value: { type: Number, required: true }
})

export default mongoose.model('idSequence', idSequence)
