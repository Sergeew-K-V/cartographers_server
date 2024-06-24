import { Schema, model } from 'mongoose'
import { IPlayerCreateData, IPlayerDocument } from '../types/other'

const PlayerSchema = new Schema<IPlayerCreateData>({
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

const PlayerModel = model<IPlayerDocument>('Player', PlayerSchema)

export default PlayerModel
