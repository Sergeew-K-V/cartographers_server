enum SocketEvents {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  JOIN_ROOM = 'joinRoom',
  LEAVE_ROOM = 'leaveRoom',
  CREATE_LOBBY = 'createLobby',
  LOBBY_CREATED = 'lobbyCreated',
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
