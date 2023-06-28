import { Schema, model } from 'mongoose'

const User = new Schema({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  nickname: { type: String },
  rang: { type: String },
  gameStats: {
    rate: { type: Number },
    wins: { type: Number },
    loses: { type: Number },
  },
})

export default model('User', User)
