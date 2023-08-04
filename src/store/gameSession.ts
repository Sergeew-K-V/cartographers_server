import { GAME_FIELD } from '../constants'
import { IGameSessions, IUser } from '../types'

const gameSession: IGameSessions = {}

const addGameSession = (lobbyId: string, user: IUser) => {
  if (gameSession[lobbyId] === undefined) {
    gameSession[lobbyId] = {}
  }
  gameSession[lobbyId][user._id] = {
    nickname: user.nickname,
    gameField: GAME_FIELD,
    isReady: false,
    score: 0,
    coins: 0,
    points: [],
  }
}

const removeGameSession = (lobbyId: string, userId?: string) => {
  if (userId) {
    delete gameSession[lobbyId]
  } else {
    delete gameSession[lobbyId]
  }
}

const getGameSession = (lobbyId: string) => {
  return gameSession[lobbyId]
}

export { gameSession, addGameSession, removeGameSession, getGameSession }
