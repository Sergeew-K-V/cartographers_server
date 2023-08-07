import userModel from '../../models/user.model'
import { getGameSession, removeGameSession } from '../../store'
import { IConfiguration } from '../../types'

const onRemoveGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { socket } = configuration

  removeGameSession(lobbyId, userId)

  const session = getGameSession(lobbyId)

  socket.emit('UPDATE_GAME_SESSION', session)
}

export default onRemoveGameSession
