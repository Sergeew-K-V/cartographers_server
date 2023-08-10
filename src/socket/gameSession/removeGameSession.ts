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

  const currentGameSession = findGameSessionById(sessionId)

  if (currentGameSession) {
    if (currentGameSession.players.length === 1) {
      removeSessionById(sessionId)
    } else {
      const updatedPlayerList = removePlayerFromSessionById(
        currentGameSession,
        userId
      )

      currentGameSession.players = updatedPlayerList
      currentGameSession.host = updatedPlayerList[0].nickname

      updateSessionList(currentGameSession)
      io.to(sessionId).emit('GAME_SESSION_UPDATED', currentGameSession)
    }
  }
}

export default removeGameSession
