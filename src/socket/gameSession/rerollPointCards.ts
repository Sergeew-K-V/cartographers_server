import { getPointCards } from '../../helpers'
import { findGameSessionById, updateSessionList } from '../../store'
import { IConfiguration } from '../../types'

const rerollPointCards = (configuration: IConfiguration, sessionId: string) => {
  const { io } = configuration

  const targetSession = findGameSessionById(sessionId)

  if (targetSession) {
    targetSession.rules = [...getPointCards()]

    updateSessionList(targetSession)

    io.to(sessionId).emit('GAME_SESSION_UPDATED', {
      rules: targetSession.rules,
    })
  }
}

export default rerollPointCards
