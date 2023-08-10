import { uid } from 'uid'
import { ILobby, IUser } from '../types'

let LobbyList: ILobby[] = []

const getLobbyList = () => {
  return LobbyList
}

const findLobbyByUserId = (userId: string) => {
  const currentLobby = LobbyList.find((lobby) => {
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

const removeLobbyByLobbyId = (currentLobby: ILobby) => {
  LobbyList = LobbyList.filter((lobby) => lobby.id !== currentLobby.id)
}

const findUserInLobbyByUserId = (targetLobby: ILobby, userId: string) => {
  return targetLobby.userList.find((user) => {
    if (user._id === userId) return user
  })
}

const removeUserFromLobby = (targetLobby: ILobby, userId: string) => {
  return targetLobby.userList.filter((user) => user._id !== userId)
}

const updateLobbyList = (targetLobby: ILobby) => {
  LobbyList = LobbyList.map((lobby) =>
    lobby.id === targetLobby.id ? targetLobby : lobby
  )
}

const findLobbyByLobbyId = (lobbyId: string) => {
  return LobbyList.find((lobby) => lobby.id === lobbyId)
}

const initNewUser = (targetUser: IUser): IUser => {
  return {
    email: targetUser.email as string,
    nickname: targetUser.nickname as string,
    _id: targetUser._id.toString() as string,
    gameStats: targetUser.gameStats as {
      rate: number
      wins: number
      loses: number
    },
    rang: targetUser.rang,
  }
}

const initNewLobby = (targetUser: IUser): ILobby => {
  return {
    id: uid(),
    name: targetUser.nickname + '-lobby',
    host: targetUser.nickname as string,
    isStarted: false,
    userList: [targetUser],
  }
}

const addLobbyToLobbyList = (lobby: ILobby) => {
  LobbyList.push(lobby)
}

export {
  removeLobbyByLobbyId,
  findLobbyByUserId,
  findUserInLobbyByUserId,
  removeUserFromLobby,
  updateLobbyList,
  findLobbyByLobbyId,
  initNewUser,
  initNewLobby,
  addLobbyToLobbyList,
  getLobbyList,
}
