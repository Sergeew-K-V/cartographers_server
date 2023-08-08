import { GAME_FIELD } from '../../constants'
import userModel from '../../models/user.model'
import { setGameSessionList, getGameSessionList } from '../../store'
import { IConfiguration, IGameSession } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io } = configuration
  const gameSessionList = getGameSessionList()
  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const player = {
      _id: userId,
      nickname: currentUser.nickname as string,
      gameField: GAME_FIELD,
      isReady: false,
      score: 0,
      coins: 0,
      points: [],
    }

    const existingGameSession = gameSessionList.find((session) => {
      if (session.id === lobbyId) {
        return session
      }
    })

    if (existingGameSession) {
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
        rules: [],
        time: 0,
        winner: '',
        players: [player],
      }

      gameSessionList.push(gameSession)

      setGameSessionList(gameSessionList)

      io.to(lobbyId).emit('GAME_SESSION_CREATED', gameSession)
    }
  }
}

export default createGameSession
