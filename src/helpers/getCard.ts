const getCard = (poolOfCards: string[]) => {
  const getRandomCard = (type: number) => {
    return Math.floor(Math.random() * type)
  }

  const cardPosition = getRandomCard(poolOfCards.length)
  const card = poolOfCards[cardPosition]

  return card
}

export default getCard
