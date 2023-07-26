import {
  removeLobbyById,
  findLobbyByUserId,
  removeUserFromMap,
} from '../../store'
import { IConfiguration, SocketEvents } from '../../types'

const leaveLobby = (configuration: IConfiguration, userId: string) => {
  const { socket, io, LobbyList } = configuration

  const currentLobby = findLobbyByUserId(LobbyList, userId)

  if (currentLobby) {
    const updatedUserList = currentLobby.userList.filter(
      (user) => user._id !== userId
    )
    currentLobby.userList = updatedUserList
    removeUserFromMap(socket.id, userId)

    if (updatedUserList.length === 0) {
      removeLobbyById(currentLobby)
      io.emit(SocketEvents.DELETE_LOBBY, currentLobby)
    } else {
      io.emit(SocketEvents.USER_LEAVE_LOBBY, currentLobby)
    }
  }
}

export default leaveLobby
