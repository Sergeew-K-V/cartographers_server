import { Socket, Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

enum SocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',

  JOIN_LOBBY = 'joinLobby',
  LEAVE_LOBBY = 'leaveLobby',

  LOBBY_CREATED = 'lobbyCreated',
  CREATE_LOBBY = 'createLobby',

  USER_LEAVE_LOBBY = 'userLeaveLobby',
  UPDATE_LOBBY = 'lobbyUpdate',
  DELETE_LOBBY = 'deleteLobby',
}

interface IUser {
  email: string
  _id?: string
  nickname: string
  rang?: string
  gameStats?: {
    rate: number
    wins: number
    loses: number
  }
}

interface IConfiguration {
  socket: Socket
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
  LobbyList: ILobby[]
  UsersMap: Record<string, string>
}

interface ILobby {
  id: string
  name: string
  host: string
  userList: IUser[]
  isStarted: boolean
}

export { SocketEvents, IUser, ILobby, IConfiguration }
