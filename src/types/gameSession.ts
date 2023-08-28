type IGameCardType =
  | 'city'
  | 'wood'
  | 'ground'
  | 'water'
  | 'enemy'
  | 'mountain'
  | 'ruins'
  | 'cell'

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
  playedCards: IGameCard[]
  enemyCards: (IGameCard | null)[]
}

interface IUserGameData {
  _id: string
  nickname: string
  gameField: IGameFieldMatrix
  isReady: boolean
  score: number
  coins: number
  rang: string
  points: number[][]
}

interface IGameCard {
  id: string
  img: string
  name: string
  cost: number
  type: IGameCardType[]
  matrix: ICardMatrix
  coinsMatrix?: ICardMatrix
}

interface IGameFieldCell {
  value: ICell
  type: IGameCardType
}

type ICell = 1 | 0

type ICardMatrix = ICell[][]

type IGameFieldMatrix = IGameFieldCell[][]

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
  playedCards: IGameCard[]
}

export {
  ICell,
  IGameSession,
  IUserGameData,
  IGameSessionClient,
  IGameCard,
  IGameCardType,
  IGameFieldCell,
  IGameFieldMatrix,
  ICardMatrix,
}
