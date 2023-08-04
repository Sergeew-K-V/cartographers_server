import { getGameSession } from '../../store/gameSession'
import { IConfiguration } from '../../types'

const sendingGameSession = (configuration: IConfiguration, lobbyId: string) => {
  const { socket } = configuration
  const session = getGameSession(lobbyId)

  socket.emit('GAME_SESSION_CREATED', session)
}

export default sendingGameSession
