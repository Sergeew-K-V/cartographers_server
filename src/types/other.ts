export interface IPlayerCreateData {
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
export interface IPlayer extends Omit<IPlayerCreateData, 'password'> {
  id: string
}

export interface IPlayerDocument extends IPlayerCreateData, Document {
  id: string
}

export interface ILobby {
  id: string
  name: string
  host: string
  userList: IPlayer[]
  isStarted: boolean
}
