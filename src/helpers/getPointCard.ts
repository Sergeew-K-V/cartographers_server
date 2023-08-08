import { GAME_POINTS_CARDS } from '../constants'

const getPointCards = () => {
  const gameSessionPointsCards: string[] = []

  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  Object.values(GAME_POINTS_CARDS).forEach((listOfTypeRule) => {
    const randomCard = getRandomCard(listOfTypeRule.length)
    gameSessionPointsCards.push(listOfTypeRule[randomCard])
  })

  return gameSessionPointsCards
}

export default getPointCards
