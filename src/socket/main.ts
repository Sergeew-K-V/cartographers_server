import GameSessionService from '../services/GameSessionService'
import LobbyService from '../services/LobbyService'
import { AppSocket, IConfiguration, IoServerType } from '../types'

const MainAction = (socket: AppSocket, io: IoServerType) => {
  const configuration: IConfiguration = { socket, io }
  console.log('connected to socket')
  socket.on(
    'CREATE_LOBBY',
    async (playerId) => await LobbyService.create(configuration, playerId)
  )

  socket.on(
    'JOIN_LOBBY',
    async (lobbyId, playerId) =>
      await LobbyService.join(configuration, lobbyId, playerId)
  )

  socket.on('LEAVE_LOBBY', (playerId) =>
    LobbyService.leaveLobby(configuration, playerId)
  )

  socket.on('CREATE_GAME_SESSION', (sessionId, playerId) =>
    GameSessionService.create(configuration, sessionId, playerId)
  )

  socket.on('REMOVE_GAME_SESSION', (sessionId, playerId) =>
    GameSessionService.delete(configuration, sessionId, playerId)
  )

  socket.on('REROLL_POINT_CARDS', (sessionId) =>
    GameSessionService.rerollPointCards(configuration, sessionId)
  )

  socket.on('PLAYER_SUBMIT_STEP', (sessionId, playerId) => {
    GameSessionService.submitPlayerStep(configuration, sessionId, playerId)
  })

  socket.on('START_GAME', (sessionId) =>
    GameSessionService.startGameSession(configuration, sessionId)
  )

  socket.on('END_GAME', (sessionId) =>
    GameSessionService.end(configuration, sessionId)
  )

  socket.on('DISCONNECT', () => {
    console.log('Disconnecting socket...')
    configuration.socket.disconnect()
  })
}

export default MainAction
