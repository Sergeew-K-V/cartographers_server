import userModel from '../../models/user.model'
import { addGameSession, getGameSession } from '../../store'
import { IConfiguration, IUser } from '../../types'

const createGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { socket } = configuration

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

    addGameSession(lobbyId, user)

    const session = getGameSession(lobbyId)

    socket.emit('GAME_SESSION_CREATED', session)
  }
}

export default createGameSession
