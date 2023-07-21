import { Socket } from 'socket.io'
import { ILobby, IUser, SocketEvents } from '../../types'
import { LobbyList, FilterLobbyList } from '../../store'

const MainAction = (socket: Socket) => {
  console.log('user connected', socket.id)

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
    socket.emit(SocketEvents.LOBBY_CREATED, Lobby)
    LobbyList.push(Lobby)
  })

  socket.on(SocketEvents.DISCONNECT, () => {
    FilterLobbyList(socket.id)

    socket.disconnect()
    console.log('user disconnected', socket.id)
  })
}

export default MainAction
