import { Socket, Server } from 'socket.io'
import { ILobby, IGameSession, IUser } from './other'

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

type IUpdateDataLobby = IUpdateData<ILobby>

type IUpdateDataGameSession = IUpdateData<IGameSession>

type IUpdateData<T> = {
  [key in keyof Omit<T, 'id'>]?: T[key]
}

interface ServerToClientEvents {
  LOBBY_CREATED: (lobby: ILobby) => Promise<void>
  LOBBY_DELETED: (lobbyId: string) => void
  LOBBY_UPDATED: (lobbyId: string, data: IUpdateDataLobby) => void

  GAME_SESSION_CREATED: (session: IGameSession) => void
  GAME_SESSION_UPDATED: (data: IUpdateDataGameSession) => void
}

interface ClientToServerEvents {
  CONNECTION: () => void
  DISCONNECT: () => void
  CREATE_LOBBY: (userId: string) => Promise<void>
  JOIN_LOBBY: (lobbyId: string, userId: string) => void
  LEAVE_LOBBY: (userId: string) => void

  CREATE_GAME_SESSION: (lobbyId: string, userId: string) => Promise<void>
  REMOVE_GAME_SESSION: (lobbyId: string, userId: string) => Promise<void>
  REROLL_POINT_CARDS: (lobbyId: string, userId: string) => void

  START_GAME: (sessionId: string) => void
  END_GAME: (sessionId: string) => void
}

interface InterServerEvents {}

interface SocketData {}

export {
  AppSocket,
  ClientToServerEvents,
  InterServerEvents,
  IoServerType,
  ServerToClientEvents,
  SocketData,
}
