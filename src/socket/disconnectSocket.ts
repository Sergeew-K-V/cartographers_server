import { IConfiguration } from '../types'

const disconnectSocket = (configuration: IConfiguration) => {
  const { socket } = configuration
  console.log('Disconnecting socket...')
  socket.disconnect()
}

export default disconnectSocket
