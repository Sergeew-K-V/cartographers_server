import { IConfiguration } from '../../types'

const submitPlayerStep = (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  console.log('🚀 ~ lobbyId:', lobbyId)
  console.log('🚀 ~ userId:', userId)
}

export default submitPlayerStep
