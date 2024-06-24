import { PlayerModel } from '../models'
import { IPlayer, IPlayerCreateData, IPlayerDocument } from '../types/other'
import bcryptjs from 'bcryptjs'

type IGameStats = {
  rate: number
  wins: number
  loses: number
}

const DEFAULT_STATS: IGameStats = { loses: 0, rate: 1000, wins: 0 } as const
const DEFAULT_RANG: string = 'string' as const

abstract class Player {
  abstract create(
    email: string,
    password: string,
    nickname: string
  ): Promise<IPlayer>
  abstract findById(id: string): Promise<IPlayer | null>
  abstract findByEmail(email: string): Promise<IPlayer | null>
  abstract comparePassword(password: string, id: string): Promise<boolean>
  abstract format(data: IPlayerDocument): IPlayer
}

class PlayerService extends Player {
  format(playerDocument: IPlayerDocument): IPlayer {
    const { id, email, nickname, rang, gameStats } = playerDocument

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
  ): Promise<IPlayer> {
    const data: IPlayerCreateData = {
      email: email.trim(),
      password: password.trim(),
      nickname: nickname.trim(),
      rang: DEFAULT_RANG,
      gameStats: { ...DEFAULT_STATS },
    }

    const player = new PlayerModel(data)

    await player.save()

    return this.format(player)
  }

  async findById(id: string): Promise<IPlayer | null> {
    const player = await PlayerModel.findById(id)

    if (!player) {
      return null
    }

    return this.format(player)
  }

  async findByEmail(email: string): Promise<IPlayer | null> {
    const player = await PlayerModel.findOne({ email: email.trim() })

    if (!player) {
      return null
    }

    return this.format(player)
  }

  async comparePassword(password: string, id: string): Promise<boolean> {
    const candidate = await PlayerModel.findById(id)

    if (!candidate) {
      return false
    }

    const result = await bcryptjs.compare(password, candidate.password)

    return result
  }
}

export default new PlayerService()
