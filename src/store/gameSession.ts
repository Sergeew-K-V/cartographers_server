import { GAME_FIELD } from '../constants'
import { IGameSession, IUser } from '../types'

const gameSession: IGameSession = {}

const addGameSession = (lobbyId: string, user: IUser) => {
  if (gameSession[lobbyId] === undefined) {
    gameSession[lobbyId] = {}
  }
  gameSession[lobbyId][user._id] = {
    score: 0,
    gameField: GAME_FIELD,
    isReady: false,
    nickname: user.nickname,
  }
}

const removeGameSession = (lobbyId: string, userId?: string) => {
  if (userId) {
    delete gameSession[lobbyId][userId]
  } else {
    delete gameSession[lobbyId]
  }
}

const getGameSession = (lobbyId: string) => {
  return gameSession[lobbyId]
}

export { gameSession, addGameSession, removeGameSession, getGameSession }
