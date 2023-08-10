import { AppSocket, IConfiguration, IoServerType } from '../types'
import {
  createGameSession,
  removeGameSession,
  rerollPointCards,
} from './gameSession'
import { createLobby, joinLobby, leaveLobby, disconnectSocket } from './lobby'

const MainAction = (socket: AppSocket, io: IoServerType) => {
  const configuration: IConfiguration = { socket, io }

  socket.on('CREATE_LOBBY', (userId) => createLobby(configuration, userId))

  socket.on('JOIN_LOBBY', (lobbyId, userId) =>
    joinLobby(configuration, lobbyId, userId)
  )

  socket.on('LEAVE_LOBBY', (userId) => leaveLobby(configuration, userId))

  socket.on('CREATE_GAME_SESSION', (lobbyId, userId) =>
    createGameSession(configuration, lobbyId, userId)
  )

  socket.on('REMOVE_GAME_SESSION', (lobbyId, userId) =>
    removeGameSession(configuration, lobbyId, userId)
  )

  socket.on('REROLL_POINT_CARDS', (lobbyId, userId) =>
    rerollPointCards(configuration, lobbyId)
  )

  socket.on('DISCONNECT', () => disconnectSocket(configuration))
}

export default MainAction
