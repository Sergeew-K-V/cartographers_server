import { AppSocket, IConfiguration, IoServerType } from '../types'
import {
  createGameSession,
  endGameSession,
  removeGameSession,
  rerollPointCards,
  startGameSession,
} from './gameSession'
import { createLobby, joinLobby, leaveLobby, disconnectSocket } from './lobby'

const MainAction = (socket: AppSocket, io: IoServerType) => {
  const configuration: IConfiguration = { socket, io }

  socket.on('CREATE_LOBBY', (userId) => createLobby(configuration, userId))

  socket.on('JOIN_LOBBY', (lobbyId, userId) =>
    joinLobby(configuration, lobbyId, userId)
  )

  socket.on('LEAVE_LOBBY', (userId) => leaveLobby(configuration, userId))

  socket.on('CREATE_GAME_SESSION', (sessionId, userId) =>
    createGameSession(configuration, sessionId, userId)
  )

  socket.on('REMOVE_GAME_SESSION', (sessionId, userId) =>
    removeGameSession(configuration, sessionId, userId)
  )

  socket.on('REROLL_POINT_CARDS', (sessionId, userId) =>
    rerollPointCards(configuration, sessionId)
  )

  socket.on('START_GAME', (sessionId) =>
    startGameSession(configuration, sessionId)
  )

  socket.on('END_GAME', (sessionId) => endGameSession(configuration, sessionId))

  socket.on('DISCONNECT', () => disconnectSocket(configuration))
}

export default MainAction
