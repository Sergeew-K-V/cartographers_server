import { GAME_POINTS_CARDS } from '../constants'

const getPointCards = () => {
  const gameSessionPointsCards: string[] = []

  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  Object.values(GAME_POINTS_CARDS).forEach((listOfTypeRule) => {
    const randomCard = getRandomCard(listOfTypeRule.length)
    const randomPosition = getRandomCard(gameSessionPointsCards.length + 1)
    gameSessionPointsCards.splice(randomPosition, 0, listOfTypeRule[randomCard])
  })

  return gameSessionPointsCards
}

export default getPointCards
