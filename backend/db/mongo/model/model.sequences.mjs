'use strict'

import mongoose from 'mongoose'

const Schema = mongoose.Schema
const idSequenceSchema = new Schema({
  idKey: { type: String, required: true, index: true, unique: true },
  idValue: { type: Number, required: true }
}, {
  versionKey: false,
  timestamp: false
})

export default mongoose.model('id_sequence', idSequenceSchema)
