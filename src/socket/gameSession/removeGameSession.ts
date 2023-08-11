import {
  findGameSessionById,
  removePlayerFromSessionById,
  removeSessionById,
  updateSessionList,
} from '../../store'
import { IConfiguration } from '../../types'

const removeGameSession = async (
  configuration: IConfiguration,
  sessionId: string,
  userId: string
) => {
  const { io } = configuration

  const targetSession = findGameSessionById(sessionId)

  if (targetSession) {
    if (targetSession.players.length === 1) {
      removeSessionById(sessionId)
    } else {
      const updatedPlayerList = removePlayerFromSessionById(
        targetSession,
        userId
      )

      targetSession.players = updatedPlayerList
      targetSession.host = updatedPlayerList[0].nickname

      updateSessionList(targetSession)

      io.to(sessionId).emit('GAME_SESSION_UPDATED', {
        host: targetSession.host,
        players: targetSession.players,
      })
    }
  }
}

export default removeGameSession
