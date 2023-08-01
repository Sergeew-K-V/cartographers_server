import { ILobby } from '../types'

let LobbyList: ILobby[] = []

const findLobbyByLobbyId = (list: ILobby[], lobbyId: string) => {
  const lobby = list.find((lobby) => lobby.id === lobbyId)

  return lobby
}

const findLobbyByUserId = (list: ILobby[], userId: string) => {
  const currentLobby = list.find((lobby) => {
    const userLobby = lobby.userList.find((user) => {
      if (user._id === userId) {
        return user
      }
    })
    if (userLobby) {
      return userLobby
    }
  })

  return currentLobby
}

const removeLobbyByLobbyId = (list: ILobby[], currentLobby: ILobby) => {
  const sortedLobbies = list.filter((lobby) => lobby.id !== currentLobby?.id)

  return sortedLobbies
}

const addLobbyToLobbyList = (lobby: ILobby) => {
  LobbyList.push(lobby)
}

const getLobbyList = () => {
  return LobbyList
}

const setLobbyList = (lobbyList: ILobby[]) => {
  LobbyList = lobbyList
}

export {
  LobbyList,
  removeLobbyByLobbyId,
  findLobbyByLobbyId,
  findLobbyByUserId,
  addLobbyToLobbyList,
  getLobbyList,
  setLobbyList,
}
