import { ILobby } from './types'

let UsersMap: Record<string, string> = {}
let LobbyList: ILobby[] = []

const addUserToMap = (socketId: string, userId: string) => {
  UsersMap[socketId] = userId
}

const removeUserFromMap = (socketId: string, userId: string) => {
  const updatedMap: Record<string, string> = { ...UsersMap }

  for (const [key, value] of Object.entries(updatedMap)) {
    if (key === socketId && value === userId) {
      delete updatedMap[key]
      break
    }
  }

  UsersMap = { ...updatedMap }
}

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
  UsersMap,
  addUserToMap,
  removeUserFromMap,
  addLobbyToLobbyList,
  getLobbyList,
  setLobbyList,
}
