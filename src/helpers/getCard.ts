import { DECK_OF_CARDS } from '../constants'

const getCard = () => {
  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  const cardPosition = getRandomCard(DECK_OF_CARDS.length)
  const card = DECK_OF_CARDS[cardPosition]

  return card
}

export default getCard
