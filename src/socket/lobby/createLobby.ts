import { IConfiguration } from '../../types'
import userModel from '../../models/player.model'
import { addLobbyToLobbyList, initNewLobby, initNewUser } from '../../store'

const createLobby = async (configuration: IConfiguration, userId: string) => {
  const { socket, io } = configuration

  const targetUser = await userModel.findById(userId)

  if (targetUser) {
    const user = initNewUser(targetUser)

    const Lobby = initNewLobby(user)

    addLobbyToLobbyList(Lobby)

    socket.join(Lobby.id)

    io.emit('LOBBY_CREATED', Lobby)
  }
}

export default createLobby
