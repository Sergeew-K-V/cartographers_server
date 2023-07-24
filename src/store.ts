import { ILobby } from './types'

let LobbyList: ILobby[] = []

const FilterLobbyList = (socketId: string) => {
  const filterdLobbyList = LobbyList.filter((lobby) => lobby.id !== socketId)
  LobbyList = filterdLobbyList
}

const clearLobbyList = (socketId: string) => {
  const lobby = LobbyList.find((lobby) => lobby.id === socketId)
  if (
    lobby &&
    lobby.userList.length === 1 &&
    lobby.userList.find((user) => user.nickname === lobby.host)
      ? true
      : false
  ) {
    const filterdLobbyList = LobbyList.filter((lobby) => lobby.id !== socketId)
    LobbyList = filterdLobbyList
  }
}

export { LobbyList, clearLobbyList, FilterLobbyList }
