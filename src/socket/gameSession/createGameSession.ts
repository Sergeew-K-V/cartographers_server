import userModel from '../../models/user.model'
import {
  addGameSession,
  findGameSessionById,
  findPlayerInSessionById,
  initNewGameSession,
  initNewPlayer,
  updateSessionList,
} from '../../store'
import { IConfiguration } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io, socket } = configuration
  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const player = initNewPlayer(currentUser)

    const targetSession = findGameSessionById(lobbyId)

    if (targetSession) {
      const targetPlayer = findPlayerInSessionById(targetSession, userId)

      //refresh browser page, we are returning your user to lobby and give a session
      if (targetPlayer) {
        socket.join(lobbyId)
        io.to(lobbyId).emit('GAME_SESSION_CREATED', targetSession)
        return
      }

      targetSession.players.push(player)

      updateSessionList(targetSession)

      io.to(lobbyId).emit('GAME_SESSION_UPDATED', targetSession)
    } else {
      const gameSession = initNewGameSession(lobbyId, player)

      addGameSession(gameSession)

      io.to(lobbyId).emit('GAME_SESSION_CREATED', gameSession)
    }
  }
}

export default createGameSession
