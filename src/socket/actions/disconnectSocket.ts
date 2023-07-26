import { IConfiguration, SocketEvents } from '../../types'
import { removeLobbyById } from '../../store'

const disconnectSocket = (configuration: IConfiguration) => {
  const { socket, io, LobbyList } = configuration
  const currentLobby = LobbyList.find((lobby) => {
    const client = lobby.userList.find((user) => user._id === socket.id)

    if (client) {
      return lobby
    }
  })

  if (currentLobby) {
    if (currentLobby.userList.length === 1) {
      console.log('delete full lobby')
      removeLobbyById(currentLobby)
      io.emit(SocketEvents.DELETE_LOBBY, currentLobby)
    } else {
      console.log('delete user in lobby', currentLobby.id)
      const filtredUserList = currentLobby.userList.filter(
        (user) => user._id !== socket.id
      )
      currentLobby.userList = filtredUserList
      io.emit(SocketEvents.USER_LEAVE_LOBBY, currentLobby)
    }
  }

  socket.disconnect()
}

export default disconnectSocket
