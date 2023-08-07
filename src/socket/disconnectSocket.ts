import { IConfiguration } from '../types'

const disconnectSocket = (configuration: IConfiguration) => {
  const { socket } = configuration

  socket.disconnect()
}

export default disconnectSocket
