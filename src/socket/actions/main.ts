import { AppSocket, IConfiguration, IoServerType } from '../../types'
import { LobbyList, UsersMap } from '../../store'
import createLobby from './createLobby'
import joinLobby from './joinLobby'
import disconnectSocket from './disconnectSocket'
import leaveLobby from './leaveLobby'

const MainAction = (socket: AppSocket, io: IoServerType) => {
  const configuration: IConfiguration = { socket, io, LobbyList, UsersMap }

  socket.on('CREATE_LOBBY', (userId) => createLobby(configuration, userId))

  socket.on('JOIN_LOBBY', (lobbyId, userId) =>
    joinLobby(configuration, lobbyId, userId)
  )

  socket.on('LEAVE_LOBBY', (userId) => leaveLobby(configuration, userId))

  socket.on('DISCONNECT', () => disconnectSocket(configuration))
}

export default MainAction
