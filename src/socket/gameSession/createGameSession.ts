import { DECK_OF_CARDS, DECK_OF_ENEMY_CARDS, GAME_FIELD } from '../../constants'
import { getPointCards } from '../../helpers'
import userModel from '../../models/user.model'
import { setGameSessionList, getGameSessionList } from '../../store'
import { IConfiguration, IGameSession } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io, socket } = configuration
  const gameSessionList = getGameSessionList()
  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const player = {
      _id: userId,
      nickname: currentUser.nickname as string,
      gameField: GAME_FIELD,
      isReady: false,
      score: 0,
      rang: currentUser.rang as string,
      coins: 0,
      points: [],
    }

    const existingGameSession = gameSessionList.find((session) => {
      if (session.id === lobbyId) {
        return session
      }
    })
    if (existingGameSession) {
      const isExistPlayer = existingGameSession.players.find(
        (player) => player._id === userId
      )

      //refresh browser page, we are returning your user to lobby and give a session
      if (isExistPlayer) {
        socket.join(lobbyId)
        io.to(lobbyId).emit('GAME_SESSION_CREATED', existingGameSession)
        return
      }

      existingGameSession.players.push(player)

      const updatedGameSessionList = gameSessionList.map((session) => {
        if (session.id === lobbyId) {
          return existingGameSession
        } else {
          return session
        }
      })

      setGameSessionList(updatedGameSessionList)

      io.to(lobbyId).emit('GAME_SESSION_UPDATED', existingGameSession)
    } else {
      const gameSession: IGameSession = {
        id: lobbyId,
        rules: getPointCards(),
        time: 0,
        winner: '',
        host: player.nickname,
        currentCard: null,
        remainingCards: DECK_OF_CARDS,
        enemyCards: DECK_OF_ENEMY_CARDS,
        playedCards: [],
        players: [player],
      }

      gameSessionList.push(gameSession)

      setGameSessionList(gameSessionList)

      io.to(lobbyId).emit('GAME_SESSION_CREATED', gameSession)
    }
  }
}

export default createGameSession
