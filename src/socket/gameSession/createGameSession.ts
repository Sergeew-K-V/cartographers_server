import userModel from '../../models/player.model'
import {
  addGameSession,
  convetSessionForClient,
  findGameSessionById,
  findPlayerInSessionById,
  initNewGameSession,
  initNewPlayer,
  updateSessionList,
} from '../../store'
import { IConfiguration } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  sessionId: string,
  userId: string
) => {
  const { io, socket } = configuration
  const targetUser = await userModel.findById(userId)

  if (targetUser) {
    const player = initNewPlayer(targetUser)

    const targetSession = findGameSessionById(sessionId)

    if (targetSession) {
      const targetPlayer = findPlayerInSessionById(targetSession, userId)

      //refresh browser page, we are returning your user to lobby and give a session
      if (targetPlayer) {
        socket.join(sessionId)
        io.to(sessionId).emit(
          'GAME_SESSION_CREATED',
          convetSessionForClient(targetSession)
        )
        return
      }

      targetSession.players.push(player)

      updateSessionList(targetSession)

      socket.emit('GAME_SESSION_CREATED', convetSessionForClient(targetSession))

      io.to(sessionId).emit('GAME_SESSION_UPDATED', {
        players: targetSession.players,
      })
    } else {
      const gameSession = initNewGameSession(sessionId, player)

      addGameSession(gameSession)

      io.to(sessionId).emit(
        'GAME_SESSION_CREATED',
        convetSessionForClient(gameSession)
      )
    }
  }
}

export default createGameSession
