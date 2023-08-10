import {
  findGameSessionById,
  removePlayerFromSessionById,
  removeSessionById,
  updateSessionList,
} from '../../store'
import { IConfiguration } from '../../types'

const removeGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io } = configuration

  const currentGameSession = findGameSessionById(lobbyId)

  if (currentGameSession) {
    if (currentGameSession.players.length === 1) {
      removeSessionById(lobbyId)
    } else {
      const updatedPlayerList = removePlayerFromSessionById(
        currentGameSession,
        userId
      )

      currentGameSession.players = updatedPlayerList
      currentGameSession.host = updatedPlayerList[0].nickname

      updateSessionList(currentGameSession)
      io.to(lobbyId).emit('GAME_SESSION_UPDATED', currentGameSession)
    }
  }
}

export default removeGameSession
