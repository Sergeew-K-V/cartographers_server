import { Socket, Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

enum SocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',

  GET_GAME_SESSION = 'getGameSession',

  JOIN_LOBBY = 'joinLobby',
  LEAVE_LOBBY = 'leaveLobby',

  LOBBY_CREATED = 'lobbyCreated',
  CREATE_LOBBY = 'createLobby',

  USER_LEAVE_LOBBY = 'userLeaveLobby',
  UPDATE_LOBBY = 'lobbyUpdate',
  DELETE_LOBBY = 'deleteLobby',
}

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

  GAME_SESSION_CREATED: (session: ILobbyPlayerMap) => void
}

interface ClientToServerEvents {
  CONNECTION: () => void
  DISCONNECT: () => void
  CREATE_LOBBY: (userId: string) => Promise<void>
  JOIN_LOBBY: (lobbyId: string, userId: string) => void
  LEAVE_LOBBY: (userId: string) => void

  GET_GAME_SESSION: (lobbyId: string) => void
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

interface IGameSessions {
  [lobbyId: string]: ILobbyPlayerMap
}

interface ILobbyPlayerMap {
  [userId: string]: IUserGameData
}

interface IUserGameData {
  nickname: string
  gameField: IFieldCell[][]
  isReady: boolean
  score: number
  coins: number
  points: number[][]
}

export {
  SocketEvents,
  IUser,
  ILobby,
  IConfiguration,
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  AppSocket,
  IoServerType,
  IGameSessions,
  IFieldCell,
}
