import { IGameSession } from '../types'

let gameSessionList: IGameSession[] = []

const setGameSessionList = (newGameSessionList: IGameSession[]) => {
  gameSessionList = newGameSessionList
}

const getGameSessionList = () => {
  return gameSessionList
}

export { setGameSessionList, getGameSessionList }
