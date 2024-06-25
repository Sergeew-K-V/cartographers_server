export interface IUserCreateData {
  email: string
  password: string
  nickname: string
  rang: string
  gameStats: {
    rate: number
    wins: number
    loses: number
  }
}
export interface IUser extends Omit<IUserCreateData, 'password'> {
  id: string
}

export interface IUserDocument extends IUserCreateData, Document {
  id: string
}

export interface ILobby {
  id: string
  name: string
  host: string
  players: IUser[]
  isStarted: boolean
}
