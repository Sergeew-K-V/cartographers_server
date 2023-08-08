import { getPointCards } from '../../helpers'
import { getGameSessionList } from '../../store'
import { IConfiguration } from '../../types'

const rerollPointCards = (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io } = configuration
  const gameSessionList = getGameSessionList()

  const targetSession = gameSessionList.find(
    (session) => session.id === lobbyId
  )

  if (targetSession) {
    targetSession.rules = [...getPointCards()]

    io.to(lobbyId).emit('GAME_SESSION_UPDATED', targetSession)
  }
}

export default rerollPointCards
