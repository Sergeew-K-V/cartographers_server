import { GAME_FIELD } from '../constants'
import { IGameSession } from '../types'

const gameSession: IGameSession = {}

const addDataGameSession = (
  lobbyId: string,
  userId: string,
  nickname: string
) => {
  if (gameSession[lobbyId] === undefined) {
    gameSession[lobbyId] = {}
  }
  gameSession[lobbyId][userId] = {
    score: 0,
    gameField: GAME_FIELD,
    isReady: false,
    nickname: nickname,
  }
}

const removeDataGameSession = (lobbyId: string, userId: string) => {
  delete gameSession[lobbyId][userId]
}

const removeGameSession = (lobbyId: string) => {
  delete gameSession[lobbyId]
}

const getGameSession = (lobbyId: string) => {
  return gameSession[lobbyId]
}

export {
  gameSession,
  addDataGameSession,
  removeDataGameSession,
  removeGameSession,
  getGameSession,
}
