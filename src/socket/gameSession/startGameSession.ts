import { getCard, shuffleArray } from '../../helpers'
import { findGameSessionById, updateSessionList } from '../../store'
import { IConfiguration, IGameSession } from '../../types'

function removeCardFromArray(targetCard: string, targetCardArray: string[]) {
  const updatedArray = targetCardArray.filter((card) => card !== targetCard)
  return updatedArray
}

function updateCardArray(targetCard: string, targetCardArray: string[]) {
  const updatedArray = [...targetCardArray, targetCard]
  return updatedArray
}

const startGameSession = (configuration: IConfiguration, sessionId: string) => {
  const { io } = configuration
  const targetSession = findGameSessionById(sessionId)

  if (targetSession) {
    targetSession.isStarted = true
    targetSession.enemyCards = shuffleArray(targetSession.enemyCards)

    const selectedEnemyCard = getCard(targetSession.enemyCards)

    targetSession.poolOfCards = updateCardArray(
      selectedEnemyCard,
      targetSession.poolOfCards
    )

    targetSession.enemyCards = removeCardFromArray(
      selectedEnemyCard,
      targetSession.enemyCards
    )

    targetSession.poolOfCards = shuffleArray(targetSession.poolOfCards)

    const selectedCurrentCard = getCard(targetSession.poolOfCards)

    targetSession.currentCard = selectedCurrentCard
    targetSession.poolOfCards = removeCardFromArray(
      selectedCurrentCard,
      targetSession.poolOfCards
    )

    updateSessionList(targetSession)

    io.to(sessionId).emit('GAME_SESSION_UPDATED', targetSession)
  }
}

export default startGameSession
