import {
  removeLobbyById,
  findLobbyByUserId,
  removeUserFromMap,
} from '../../store'
import { IConfiguration } from '../../types'

const leaveLobby = (configuration: IConfiguration, userId: string) => {
  const { socket, io, LobbyList } = configuration

  const currentLobby = findLobbyByUserId(LobbyList, userId)
  if (currentLobby) {
    const currentUser = currentLobby?.userList.find((user) => {
      if (user._id === userId) return user
    })

    if (currentUser) {
      const isHostOfLobby = currentLobby.host === currentUser.nickname
      const updatedUserList = currentLobby.userList.filter(
        (user) => user._id !== userId
      )
      currentLobby.userList = updatedUserList
      if (isHostOfLobby) {
        currentLobby.host = currentLobby.userList[0].nickname
      }

      removeUserFromMap(socket.id, userId)
      if (updatedUserList.length === 0) {
        removeLobbyById(currentLobby)
        io.emit('DELETE_LOBBY', currentLobby)
      } else {
        io.emit('UPDATE_LOBBY', currentLobby)
      }
    }
  }
}

export default leaveLobby
