import { Schema, model } from 'mongoose'
import { IUserCreateData, IUserDocument } from '../types/other'

const UserSchema = new Schema<IUserCreateData>({
  email: { type: String, require: true, unique: true },
  password: { type: String, require: true },
  nickname: { type: String, require: true },
  rang: { type: String },
  gameStats: {
    rate: { type: Number },
    wins: { type: Number },
    loses: { type: Number },
  },
})

const UserModel = model<IUserDocument>('User', UserSchema)

export default UserModel
