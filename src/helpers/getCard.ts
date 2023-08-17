const getCard = (poolOfCards: string[]) => {
  const filterPoolOfCards = poolOfCards.filter((card) => card !== '')
  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  const cardPosition = getRandomCard(filterPoolOfCards.length)
  const card = filterPoolOfCards[cardPosition]

  return card
}

export default getCard
