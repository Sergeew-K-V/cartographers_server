import { IConfiguration, ILobby } from '../../types'
import userModel from '../../models/user.model'
import { addUserToMap } from '../../store'

const createLobby = async (configuration: IConfiguration, userId: string) => {
  const { socket, io, LobbyList } = configuration

  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const userId = currentUser._id.toString()

    const LobbyName = (currentUser.nickname as string) + '-lobby'

    const Lobby: ILobby = {
      id: userId,
      name: LobbyName,
      host: currentUser.nickname as string,
      isStarted: false,
      userList: [
        {
          _id: currentUser._id.toString() as string,
          email: currentUser.email as string,
          nickname: currentUser.nickname as string,
          rang: currentUser.rang,
          gameStats: currentUser.gameStats as {
            rate: number
            wins: number
            loses: number
          },
        },
      ],
    }

    socket.join(LobbyName)
    addUserToMap(socket.id, userId)

    io.emit('LOBBY_CREATED', Lobby)

    LobbyList.push(Lobby)
  }
}

export default createLobby
