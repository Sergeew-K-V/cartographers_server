import { IUser, IConfiguration } from '../../types'
import {
  addGameSession,
  // addUserToMap,
  findLobbyByLobbyId,
  getLobbyList,
  setLobbyList,
} from '../../store'
import userModel from '../../models/user.model'

const joinLobby = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { socket, io } = configuration
  const lobbies = getLobbyList()
  const currentLobby = findLobbyByLobbyId(lobbies, lobbyId)

  const currentUser = await userModel.findById(userId)

  if (currentLobby && currentUser) {
    const isUserAlreadyInLobby = currentLobby.userList.find(
      (el) => el.nickname === currentUser.nickname
    )

    if (!isUserAlreadyInLobby && currentLobby.userList.length < 4) {
      socket.join(currentLobby.id)
      // addUserToMap(socket.id, currentUser._id.toString())

      const user: IUser = {
        email: currentUser.email as string,
        nickname: currentUser.nickname as string,
        _id: currentUser._id.toString() as string,
        gameStats: currentUser.gameStats as {
          rate: number
          wins: number
          loses: number
        },
        rang: currentUser.rang,
      }

      currentLobby.userList.push(user)
      setLobbyList(lobbies)
      addGameSession(currentLobby.id, user)
      io.emit('UPDATE_LOBBY', currentLobby)
    }
  }
}

export default joinLobby
