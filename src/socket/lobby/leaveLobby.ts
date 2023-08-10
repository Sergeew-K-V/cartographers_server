import {
  findLobbyByUserId,
  findUserInLobbyByUserId,
  removeLobbyByLobbyId,
  removeUserFromLobby,
  updateLobbyList,
} from '../../store'
import { IConfiguration } from '../../types'

const leaveLobby = (configuration: IConfiguration, userId: string) => {
  const { io } = configuration

  const targetLobby = findLobbyByUserId(userId)
  if (targetLobby) {
    const targetUser = findUserInLobbyByUserId(targetLobby, userId)

    if (targetUser) {
      if (targetLobby.userList.length === 1) {
        removeLobbyByLobbyId(targetLobby)
        io.emit('LOBBY_DELETED', targetLobby)
      } else {
        const isHostOfLobby = targetLobby.host === targetUser.nickname

        const updatedPlayerList = removeUserFromLobby(
          targetLobby,
          targetUser._id
        )

        targetLobby.userList = updatedPlayerList
        if (isHostOfLobby) {
          targetLobby.host = targetLobby.userList[0].nickname
        }

        updateLobbyList(targetLobby)
        io.emit('LOBBY_UPDATED', targetLobby)
      }
    }
  }
}

export default leaveLobby
