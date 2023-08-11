import { DECK_OF_CARDS, DECK_OF_ENEMY_CARDS } from '../../constants'
import { findGameSessionById, updateSessionList } from '../../store'
import { IConfiguration } from '../../types'

const endGameSession = (configuration: IConfiguration, sessionId: string) => {
  const { io } = configuration
  const targetSession = findGameSessionById(sessionId)

  if (targetSession) {
    targetSession.isStarted = false

    targetSession.enemyCards = [...DECK_OF_ENEMY_CARDS]
    targetSession.poolOfCards = [...DECK_OF_CARDS]
    targetSession.currentCard = null

    updateSessionList(targetSession)

    io.to(sessionId).emit('GAME_SESSION_UPDATED', {
      poolOfCards: targetSession.poolOfCards,
      enemyCards: targetSession.enemyCards,
      currentCard: targetSession.currentCard,
      isStarted: targetSession.isStarted,
    })
  }
}

export default endGameSession
