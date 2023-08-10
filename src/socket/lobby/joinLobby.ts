import { IConfiguration } from '../../types'
import userModel from '../../models/user.model'
import {
  findLobbyByLobbyId,
  findUserInLobbyByUserId,
  initNewUser,
  updateLobbyList,
} from '../../store'

const joinLobby = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { socket, io } = configuration
  const targetUser = await userModel.findById(userId)
  const targetLobby = findLobbyByLobbyId(lobbyId)

  if (targetLobby && targetUser) {
    const isUserInLobby = findUserInLobbyByUserId(targetLobby, userId)

    //in future need to disable btn in client for connection
    if (!isUserInLobby && targetLobby.userList.length < 4) {
      socket.join(targetLobby.id)

      const user = initNewUser(targetUser)

      targetLobby.userList.push(user)
      updateLobbyList(targetLobby)

      io.emit('LOBBY_UPDATED', targetLobby)
    }
  }
}

export default joinLobby
