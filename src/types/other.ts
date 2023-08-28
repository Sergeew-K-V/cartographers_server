interface IUser {
  email: string
  _id: string
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

export { ILobby, IUser }
