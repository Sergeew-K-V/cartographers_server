import { filterLobbyList, removeUserFromMap } from '../../store'
import { IConfiguration, SocketEvents } from '../../types'

const leaveLobby = (configuration: IConfiguration, userId: string) => {
  const { socket, io, LobbyList } = configuration
  removeUserFromMap(socket.id, userId)

  const currentLobby = LobbyList.find((lobby) => {
    const client = lobby.userList.find((user) => {
      if (user._id === userId) {
        return user
      }
    })
    if (client) {
      return client
    }
  })
  if (currentLobby) {
    const updatedUserList = currentLobby.userList.filter(
      (user) => user._id !== userId
    )
    currentLobby.userList = updatedUserList
    if (updatedUserList.length === 0) {
      filterLobbyList(currentLobby)
      io.emit(SocketEvents.DELETE_LOBBY, currentLobby)
    } else {
      io.emit(SocketEvents.USER_LEAVE_LOBBY, currentLobby)
    }
  }
}

export default leaveLobby
