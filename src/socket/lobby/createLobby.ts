import { IConfiguration, ILobby } from '../../types'
import userModel from '../../models/user.model'
import {
  addLobbyToLobbyList,
  // addUserToMap,
  addDataGameSession,
} from '../../store'
import { uid } from 'uid'

const createLobby = async (configuration: IConfiguration, userId: string) => {
  const { socket, io } = configuration

  const currentUser = await userModel.findById(userId)

  if (currentUser) {
    const userId = currentUser._id.toString()

    const LobbyName = (currentUser.nickname as string) + '-lobby'

    const Lobby: ILobby = {
      id: uid(),
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
    addDataGameSession(Lobby.id, userId, currentUser.nickname as string)

    addLobbyToLobbyList(Lobby)

    // addUserToMap(socket.id, userId)

    socket.join(Lobby.id)

    io.emit('LOBBY_CREATED', Lobby)
  }
}

export default createLobby
