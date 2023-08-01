import { getGameSession } from '../../store/gameSession'

const sendingGameSession = (lobbyId: string) => {
  const session = getGameSession(lobbyId)
  return session
}

export default sendingGameSession
