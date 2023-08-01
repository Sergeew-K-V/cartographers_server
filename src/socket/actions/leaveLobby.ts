import {
  removeLobbyByLobbyId,
  findLobbyByUserId,
  // removeUserFromMap,
  getLobbyList,
  setLobbyList,
} from '../../store'
import { IConfiguration } from '../../types'

const leaveLobby = (configuration: IConfiguration, userId: string) => {
  let { socket, io } = configuration
  const lobbies = getLobbyList()
  const currentLobby = findLobbyByUserId(lobbies, userId)
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
      // removeUserFromMap(socket.id, userId)

      if (updatedUserList.length === 0) {
        const newLobbies = removeLobbyByLobbyId(lobbies, currentLobby)
        setLobbyList(newLobbies)
        io.emit('DELETE_LOBBY', currentLobby)
      } else {
        if (isHostOfLobby) {
          currentLobby.host = currentLobby.userList[0].nickname
        }
        io.emit('UPDATE_LOBBY', currentLobby)
      }
    }
  }
}

export default leaveLobby
