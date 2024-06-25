import { UserModel } from '../models'
import { IUser, IUserCreateData, IUserDocument } from '../types/other'
import bcryptjs from 'bcryptjs'

type IGameStats = {
  rate: number
  wins: number
  loses: number
}

const DEFAULT_STATS: IGameStats = { loses: 0, rate: 1000, wins: 0 } as const
const DEFAULT_RANG: string = 'Common' as const

abstract class User {
  abstract create(
    email: string,
    password: string,
    nickname: string
  ): Promise<IUser>
  abstract findById(id: string): Promise<IUser | null>
  abstract findByEmail(email: string): Promise<IUser | null>
  abstract comparePassword(password: string, id: string): Promise<boolean>
  abstract format(data: IUserDocument): IUser
}

class UserService extends User {
  format(userDocument: IUserDocument): IUser {
    const { id, email, nickname, rang, gameStats } = userDocument

    return {
      id,
      email,
      nickname,
      rang,
      gameStats,
    }
  }

  async create(
    email: string,
    password: string,
    nickname: string
  ): Promise<IUser> {
    const data: IUserCreateData = {
      email: email.trim(),
      password: password.trim(),
      nickname: nickname.trim(),
      rang: DEFAULT_RANG,
      gameStats: { ...DEFAULT_STATS },
    }

    const user = new UserModel(data)

    await user.save()

    return this.format(user)
  }

  async findById(id: string): Promise<IUser | null> {
    const user = await UserModel.findById(id)

    if (!user) {
      return null
    }

    return this.format(user)
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user = await UserModel.findOne({ email: email.trim() })

    if (!user) {
      return null
    }

    return this.format(user)
  }

  async comparePassword(password: string, id: string): Promise<boolean> {
    const candidate = await UserModel.findById(id)

    if (!candidate) {
      return false
    }

    const result = await bcryptjs.compare(password, candidate.password)

    return result
  }
}

export default new UserService()
