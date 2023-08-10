import { DECK_OF_CARDS, DECK_OF_ENEMY_CARDS, GAME_FIELD } from '../constants'
import { getPointCards, shuffleArray } from '../helpers'
import { IGameSession, IUser, IUserGameData } from '../types'

let gameSessionList: IGameSession[] = []

const findGameSessionById = (lobbyId: string) => {
  return gameSessionList.find((session) => session.id === lobbyId)
}

const removeSessionById = (lobbyId: string) => {
  gameSessionList = gameSessionList.filter((session) => session.id !== lobbyId)
}

const removePlayerFromSessionById = (session: IGameSession, userId: string) => {
  return session.players.filter((player) => player._id !== userId)
}

const findPlayerInSessionById = (session: IGameSession, userId: string) => {
  return session.players.find((player) => player._id === userId)
}

const updateSessionList = (updatedSession: IGameSession) => {
  gameSessionList = gameSessionList.map((session) =>
    session.id === updatedSession.id ? updatedSession : session
  )
}

const addGameSession = (newGameSession: IGameSession) => {
  gameSessionList.push(newGameSession)
}

const initNewPlayer = (user: IUser): IUserGameData => {
  return {
    _id: user._id.toString(),
    nickname: user.nickname as string,
    gameField: GAME_FIELD,
    isReady: false,
    score: 0,
    rang: user.rang as string,
    coins: 0,
    points: [],
  }
}

const initNewGameSession = (
  lobbyId: string,
  player: IUserGameData
): IGameSession => {
  return {
    id: lobbyId,
    rules: getPointCards(),
    time: 0,
    winner: '',
    host: player.nickname,
    players: [player],
    isStarted: false,
    currentCard: null,
    remainingCards: shuffleArray([...DECK_OF_CARDS]),
    enemyCards: shuffleArray([...DECK_OF_ENEMY_CARDS]),
    playedCards: [],
  }
}

export {
  findGameSessionById,
  removeSessionById,
  removePlayerFromSessionById,
  updateSessionList,
  findPlayerInSessionById,
  addGameSession,
  initNewPlayer,
  initNewGameSession,
}
