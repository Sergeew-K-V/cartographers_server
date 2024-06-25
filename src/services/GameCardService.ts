import { GAME_POINTS_CARDS } from '../constants'
import { IGameCard } from '../types'

interface IGameCardService {
  getCard: (poolOfCards: IGameCard[]) => IGameCard
  getPointCards: () => string[]
  shuffleArray: (arr: IGameCard[]) => IGameCard[]
  removeCardFromArray: (
    targetCard: IGameCard,
    targetCardArray: IGameCard[]
  ) => IGameCard[]
  updateCardArray: (card: IGameCard, array: IGameCard[]) => IGameCard[]
}

class GameCardService implements IGameCardService {
  getCard(poolOfCards: IGameCard[]) {
    const filterPoolOfCards = poolOfCards.filter((card) => card !== null)
    const getRandomCard = (type: number) => {
      return Math.floor(Math.random() * type)
    }

    const cardPosition = getRandomCard(filterPoolOfCards.length)
    const card = filterPoolOfCards[cardPosition]

    return card
  }

  getPointCards() {
    const gameSessionPointsCards: string[] = []

    const getRandomCard = (type: number) => {
      return Math.floor(Math.random() * type)
    }

    Object.values(GAME_POINTS_CARDS).forEach((listOfTypeRule: string[]) => {
      const randomCard = getRandomCard(listOfTypeRule.length)
      const randomPosition = getRandomCard(gameSessionPointsCards.length + 1)

      gameSessionPointsCards.splice(
        randomPosition,
        0,
        listOfTypeRule[randomCard]
      )
    })

    return gameSessionPointsCards
  }

  removeCardFromArray(
    targetCard: IGameCard,
    targetCardArray: IGameCard[]
  ): IGameCard[] {
    const updatedArray: IGameCard[] = []
    targetCardArray.forEach((card) =>
      card !== targetCard ? null : updatedArray.push(card)
    )

    return updatedArray
  }

  shuffleArray(array: IGameCard[]): Array<IGameCard> {
    const shuffledArray = [...array]
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))

      ;[shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]
    }

    return shuffledArray
  }

  updateCardArray(
    targetCard: IGameCard,
    targetCardArray: IGameCard[]
  ): IGameCard[] {
    const updatedArray = [...targetCardArray, targetCard]

    return updatedArray
  }
}

export default new GameCardService()
