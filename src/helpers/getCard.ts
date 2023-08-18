import { IGameCard } from '../types'

const getCard = (poolOfCards: (IGameCard | null)[]) => {
  const filterPoolOfCards = poolOfCards.filter((card) => card !== null)
  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  const cardPosition = getRandomCard(filterPoolOfCards.length)
  const card = filterPoolOfCards[cardPosition]

  return card as IGameCard
}

export default getCard
