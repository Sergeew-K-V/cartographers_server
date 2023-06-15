import { Schema, model } from 'mongoose'

const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
})

export default model('User', User)
