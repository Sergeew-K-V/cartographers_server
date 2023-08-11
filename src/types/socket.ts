import { Socket, Server } from 'socket.io'
import { ILobby, IGameSession } from './other'

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
  LOBBY_DELETED: (lobby: ILobby) => void
  LOBBY_UPDATED: (lobby: ILobby) => void

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
