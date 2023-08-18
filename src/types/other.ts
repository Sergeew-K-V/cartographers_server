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

type IGameCardType =
  | 'city'
  | 'wood'
  | 'ground'
  | 'water'
  | 'enemy'
  | 'mountain'
  | 'ruins'
  | 'cell'

type IFieldCell = 1 | 0

interface IGameCard {
  id: string
  img: string
  name: string
  cost: number
  type: IGameCardType[]
  matrix: IFieldCell[][]
  coinsMatrix?: IFieldCell[][]
}

interface ILobby {
  id: string
  name: string
  host: string
  userList: IUser[]
  isStarted: boolean
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

interface IGameSession {
  id: string
  rules: string[]
  winner: string
  host: string
  time: number
  players: IUserGameData[]
  isStarted: boolean
  currentCard: IGameCard | null
  poolOfCards: (IGameCard | null)[]
  playedCards: (IGameCard | null)[]
  enemyCards: (IGameCard | null)[]
}

interface IGameSessionClient {
  id: string
  rules: string[]
  winner: string
  host: string
  time: number
  players: IUserGameData[]
  isStarted: boolean
  currentCard: IGameCard | null
  poolOfCardsNumber: number
  playedCards: string[]
}

export {
  IConfiguration,
  IFieldCell,
  IGameSession,
  ILobby,
  IUser,
  IUserGameData,
  IGameSessionClient,
  IGameCard,
  IGameCardType,
}
