import { getPointCards } from '../../helpers'
import { findGameSessionById, updateSessionList } from '../../store'
import { IConfiguration } from '../../types'

const rerollPointCards = (configuration: IConfiguration, lobbyId: string) => {
  const { io } = configuration

  const targetSession = findGameSessionById(lobbyId)

  if (targetSession) {
    targetSession.rules = [...getPointCards()]

    updateSessionList(targetSession)

    io.to(lobbyId).emit('GAME_SESSION_UPDATED', targetSession)
  }
}

export default rerollPointCards
