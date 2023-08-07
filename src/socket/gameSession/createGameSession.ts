import userModel from '../../models/user.model'
import { addGameSession, getGameSession } from '../../store'
import { IConfiguration, IUser } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { socket, io } = configuration

  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const user: IUser = {
      _id: currentUser._id.toString() as string,
      email: currentUser.email as string,
      nickname: currentUser.nickname as string,
      rang: currentUser.rang,
      gameStats: currentUser.gameStats as {
        rate: number
        wins: number
        loses: number
      },
    }
    const isExistSession = getGameSession(lobbyId)

    addGameSession(lobbyId, user)

    const session = getGameSession(lobbyId)

    if (isExistSession) {
      io.to(lobbyId).emit('UPDATE_GAME_SESSION', session)
    } else {
      socket.emit('GAME_SESSION_CREATED', session)
    }
  }
}

export default createGameSession
