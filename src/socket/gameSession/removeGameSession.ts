import { getGameSessionList, setGameSessionList } from '../../store'
import { IConfiguration } from '../../types'

const onRemoveGameSession = async (
  configuration: IConfiguration,
  lobbyId: string,
  userId: string
) => {
  const { io } = configuration
  const gameSessionList = getGameSessionList()

  const currentGameSession = gameSessionList.find(
    (session) => session.id === lobbyId
  )

  if (currentGameSession) {
    if (currentGameSession.players.length === 1) {
      const updatedGameSessionList = gameSessionList.filter(
        (session) => session.id !== lobbyId
      )

      setGameSessionList(updatedGameSessionList)
    } else {
      const updatedPlayerList = currentGameSession.players.filter(
        (player) => player._id !== userId
      )

      currentGameSession.players = updatedPlayerList

      const updatedSessionList = gameSessionList.map((session) => {
        if (session.id === currentGameSession.id) {
          return currentGameSession
        } else {
          return session
        }
      })

      setGameSessionList(updatedSessionList)

      io.to(lobbyId).emit('GAME_SESSION_UPDATED', currentGameSession)
    }
  }
}

export default onRemoveGameSession
