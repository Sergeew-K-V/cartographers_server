import { ILobby } from './types'

let LobbyList: ILobby[] = []

const FilterLobbyList = (socketId: string) => {
  const filterdLobbyList = LobbyList.filter((lobby) => lobby.id !== socketId)
  LobbyList = filterdLobbyList
}

export { LobbyList, FilterLobbyList }
