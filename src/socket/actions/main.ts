import { Socket } from 'socket.io'
import { SocketEvents } from '../types'

const MainAction = (socket: Socket) => {
  console.log('user connected', socket.id)

  socket.on(SocketEvents.DISCONNECT, () => {
    console.log('user disconnected', socket.id)
  })
}

export default MainAction
