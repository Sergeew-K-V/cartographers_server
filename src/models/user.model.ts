import { Schema, model } from 'mongoose'
import { IUser } from '../types'

const User = new Schema<IUser & { password: string }>({
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
