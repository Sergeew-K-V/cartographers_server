import { AppSocket, IoServerType } from './socket'

interface IUser {
  email: string
  _id: string
  nickname: string
  rang?: string
  gameStats?: {
    rate: number
    wins: number
    loses: number
  }
}

interface IConfiguration {
  socket: AppSocket
  io: IoServerType
}

interface IFieldCell {
  id: number
  image: string
}

interface ILobby {
  id: string
  name: string
  host: string
  userList: IUser[]
  isStarted: boolean
}

interface IGameSession {
  id: string
  rules: string[]
  winner: string
  host: string
  time: number
  players: IUserGameData[]
  isStarted: boolean
  currentCard: string | null
  poolOfCards: string[]
  playedCards: string[]
  enemyCards: string[]
}

interface IUserGameData {
  _id: string
  nickname: string
  gameField: IFieldCell[][]
  isReady: boolean
  score: number
  coins: number
  rang: string
  points: number[][]
}

export {
  IConfiguration,
  IFieldCell,
  IGameSession,
  ILobby,
  IUser,
  IUserGameData,
}
