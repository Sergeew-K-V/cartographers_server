import { ILobby } from './types'

let UsersMap: Record<string, string> = {}

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

let LobbyList: ILobby[] = []

const findLobbyByLobbyId = (list: ILobby[], lobbyId: string) => {
  const lobby = list.find((lobby) => lobby.id === lobbyId)
  return lobby
}

const filterLobbyList = (currentLobby: ILobby) => {
  const sortedLobbies = LobbyList.filter(
    (lobby) => lobby.id !== currentLobby?.id
  )

  LobbyList = sortedLobbies
}

export {
  LobbyList,
  filterLobbyList,
  findLobbyByLobbyId,
  UsersMap,
  addUserToMap,
  removeUserFromMap,
}
