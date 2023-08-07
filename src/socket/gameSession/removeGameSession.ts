import { getGameSession, removeGameSession } from '../../store'
import { IConfiguration } from '../../types'

const onRemoveGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io } = configuration

  removeGameSession(lobbyId, userId)

  const session = getGameSession(lobbyId)

  io.to(lobbyId).emit('UPDATE_GAME_SESSION', session)
}

export default onRemoveGameSession
