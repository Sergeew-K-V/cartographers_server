import { Server, Socket } from 'socket.io'
import { IConfiguration, SocketEvents } from '../../types'
import { LobbyList, UsersMap } from '../../store'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import createLobby from './createLobby'
import joinLobby from './joinLobby'
import disconnectSocket from './disconnectSocket'
import leaveLobby from './leaveLobby'

const MainAction = (
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  const configuration: IConfiguration = { socket, io, LobbyList, UsersMap }

  socket.on(SocketEvents.CREATE_LOBBY, (userId: string) =>
    createLobby(configuration, userId)
  )

  socket.on(SocketEvents.JOIN_LOBBY, (lobbyId: string, userId: string) =>
    joinLobby(configuration, lobbyId, userId)
  )

  socket.on(SocketEvents.LEAVE_LOBBY, (userId: string) =>
    leaveLobby(configuration, userId)
  )

  socket.on(SocketEvents.DISCONNECT, () => disconnectSocket(configuration))
}

export default MainAction
