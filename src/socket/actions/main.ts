import { Server, Socket } from 'socket.io'
import { ILobby, IUser, SocketEvents } from '../../types'
import { LobbyList, FilterLobbyList, clearLobbyList } from '../../store'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

const MainAction = (
  socket: Socket,
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
  socket.on(SocketEvents.CREATE_LOBBY, (user: IUser) => {
    const isHostingAnyLobby = LobbyList.find((lobby) =>
      lobby.id === socket.id ? true : false
    )

    if (isHostingAnyLobby) return

    const LobbyName = user.nickname + '-lobby'

    const Lobby: ILobby = {
      id: socket.id,
      name: LobbyName,
      host: user.nickname,
      isStarted: false,
      userList: [user],
    }

    socket.join(LobbyName)

    io.emit(SocketEvents.LOBBY_CREATED, Lobby)

    LobbyList.push(Lobby)
  })

  socket.on(SocketEvents.JOIN_LOBBY, (lobbyId: string, user: IUser) => {
    socket.join(lobbyId)

    const currentLobby = LobbyList.find((lobby) => lobby.id === lobbyId)

    if (currentLobby) {
      currentLobby.userList.push(user)

      io.emit(SocketEvents.UPDATE_LOBBY, currentLobby)
    }
  })

  socket.on(SocketEvents.DISCONNECT, () => {
    // clearLobbyList(socket.id)

    // FilterLobbyList(socket.id)

    socket.disconnect()
  })
}

export default MainAction
