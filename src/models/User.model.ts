import { Schema } from 'mongoose'

const User = new Schema({
  email: { type: String },
  password: { type: String },
})
