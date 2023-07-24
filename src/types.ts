enum SocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  LOBBY_CREATED = 'lobbyCreated',

  UPDATE_LOBBY = 'lobbyUpdate',
  CREATE_LOBBY = 'createLobby',
  JOIN_LOBBY = 'joinLobby',
  LEAVE_LOBBY = 'leaveLobby',
}

interface IUser {
  email: string
  _id?: string
  nickname: string
  rang?: string
  gameStats?: {
    rate: number
    wins: number
    loses: number
  }
}

interface ILobby {
  id: string
  name: string
  host: string
  userList: IUser[]
  isStarted: boolean
}

export { SocketEvents, IUser, ILobby }
