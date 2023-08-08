import { Socket, Server } from 'socket.io'

type AppSocket = Socket<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

type IoServerType = Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>

interface ServerToClientEvents {
  LOBBY_CREATED: (lobby: ILobby) => Promise<void>
  DELETE_LOBBY: (lobby: ILobby) => void
  USER_LEAVE_LOBBY: (lobby: ILobby) => void
  UPDATE_LOBBY: (lobby: ILobby) => void

  GAME_SESSION_CREATED: (session: IGameSession) => void
  GAME_SESSION_UPDATED: (session: IGameSession) => void
}

interface ClientToServerEvents {
  CONNECTION: () => void
  DISCONNECT: () => void
  CREATE_LOBBY: (userId: string) => Promise<void>
  JOIN_LOBBY: (lobbyId: string, userId: string) => void
  LEAVE_LOBBY: (userId: string) => void

  CREATE_GAME_SESSION: (lobbyId: string, userId: string) => Promise<void>
  REMOVE_GAME_SESSION: (lobbyId: string, userId: string) => Promise<void>
}

interface InterServerEvents {}

interface SocketData {}

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
  time: number
  remainingCards: string[]
  playedCards: string[]
  enemyCards: string[]
  players: IUserGameData[]
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
  IUser,
  ILobby,
  IConfiguration,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  AppSocket,
  IoServerType,
  IGameSession,
  IFieldCell,
}
