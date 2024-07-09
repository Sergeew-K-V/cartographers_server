import { GAME_FIELD, DECK_OF_CARDS, DECK_OF_ENEMY_CARDS } from '../constants'
import {
  IConfiguration,
  IGameSession,
  IGameSessionClient,
  IUserGameData,
} from '../types'
import { IUser } from '../types/other'
import GameCardService from './GameCardService'
import PlayerService from './UserService'

abstract class GameSession {
  abstract startGameSession(
    configuration: IConfiguration,
    sessionId: string
  ): void
  abstract rerollPointCards(
    configuration: IConfiguration,
    sessionId: string
  ): void
  abstract submitPlayerStep(
    configuration: IConfiguration,
    sessionId: string,
    playerId: string
  ): void
  abstract delete(
    configuration: IConfiguration,
    sessionId: string,
    playerId: string
  ): Promise<void>
  abstract create(
    configuration: IConfiguration,
    sessionId: string,
    playerId: string
  ): Promise<void>
  abstract end(configuration: IConfiguration, sessionId: string): void
}

class GameSessionService extends GameSession {
  private gameSessions: IGameSession[] = []

  private findById(sessionId: string) {
    return this.gameSessions.find((session) => session.id === sessionId)
  }

  private remove(sessionId: string) {
    this.gameSessions = this.gameSessions.filter(
      (session) => session.id !== sessionId
    )
  }

  private removePlayer(session: IGameSession, playerId: string) {
    return session.players.filter((player) => player.id !== playerId)
  }

  private findPlayer(session: IGameSession, playerId: string) {
    return session.players.find((player) => player.id === playerId)
  }

  private updateSessionList(updatedSession: IGameSession) {
    this.gameSessions = this.gameSessions.map((session) =>
      session.id === updatedSession.id ? updatedSession : session
    )
  }

  private add(newGameSession: IGameSession) {
    this.gameSessions.push(newGameSession)
  }

  private initSessionPlayer(player: IUser): IUserGameData {
    return {
      id: player.id,
      nickname: player.nickname as string,
      gameField: GAME_FIELD,
      isReady: false,
      score: 0,
      rang: player.rang as string,
      coins: 0,
      points: [], // [[1,2,3,4],[5,6,7,8]]
    }
  }

  private initNewGameSession(
    sessionId: string,
    player: IUserGameData
  ): IGameSession {
    return {
      id: sessionId,
      rules: GameCardService.getPointCards(),
      time: 0,
      winner: '',
      host: player.nickname,
      players: [player],
      isStarted: false,
      currentCard: null,
      poolOfCards: [...DECK_OF_CARDS],
      enemyCards: [...DECK_OF_ENEMY_CARDS],
      playedCards: [],
    }
  }

  private convertSessionForClient(session: IGameSession): IGameSessionClient {
    const {
      currentCard,
      host,
      id,
      isStarted,
      playedCards,
      players,
      poolOfCards,
      rules,
      time,
      winner,
    } = session

    return {
      currentCard,
      host,
      id,
      isStarted,
      players,
      rules,
      time,
      winner,
      playedCards,
      poolOfCardsNumber: poolOfCards.length,
    }
  }

  async create(
    configuration: IConfiguration,
    sessionId: string,
    playerId: string
  ) {
    const { io, socket } = configuration
    const targetPlayer = await PlayerService.findById(playerId)

    if (targetPlayer) {
      const sessionPlayer = this.initSessionPlayer(targetPlayer)

      const targetSession = this.findById(sessionId)

      if (targetSession) {
        const targetPlayer = this.findPlayer(targetSession, playerId)

        //refresh browser page, we are returning your user to lobby and give a session
        if (targetPlayer) {
          socket.join(sessionId)
          io.to(sessionId).emit(
            'GAME_SESSION_CREATED',
            this.convertSessionForClient(targetSession)
          )
          return
        }

        targetSession.players.push(sessionPlayer)

        this.updateSessionList(targetSession)

        socket.emit(
          'GAME_SESSION_CREATED',
          this.convertSessionForClient(targetSession)
        )

        io.to(sessionId).emit('GAME_SESSION_UPDATED', {
          players: targetSession.players,
        })
      } else {
        const gameSession = this.initNewGameSession(sessionId, sessionPlayer)

        this.add(gameSession)

        io.to(sessionId).emit(
          'GAME_SESSION_CREATED',
          this.convertSessionForClient(gameSession)
        )
      }
    }
  }

  end(configuration: IConfiguration, sessionId: string) {
    const { io } = configuration
    const targetSession = this.findById(sessionId)

    if (targetSession) {
      targetSession.isStarted = false

      targetSession.enemyCards = [...DECK_OF_ENEMY_CARDS]
      targetSession.poolOfCards = [...DECK_OF_CARDS]
      targetSession.currentCard = null

      this.updateSessionList(targetSession)

      io.to(sessionId).emit('GAME_SESSION_UPDATED', {
        poolOfCardsNumber: targetSession.poolOfCards.length,
        currentCard: targetSession.currentCard,
        isStarted: targetSession.isStarted,
      })
    }
  }

  async delete(
    configuration: IConfiguration,
    sessionId: string,
    playerId: string
  ) {
    const { io } = configuration

    const targetSession = this.findById(sessionId)

    if (targetSession) {
      if (targetSession.players.length === 1) {
        this.remove(sessionId)
      } else {
        const updatedPlayerList = this.removePlayer(targetSession, playerId)

        targetSession.players = updatedPlayerList
        targetSession.host = updatedPlayerList[0].nickname

        this.updateSessionList(targetSession)

        io.to(sessionId).emit('GAME_SESSION_UPDATED', {
          host: targetSession.host,
          players: targetSession.players,
        })
      }
    }
  }

  rerollPointCards(configuration: IConfiguration, sessionId: string) {
    const { io } = configuration

    const targetSession = this.findById(sessionId)

    if (targetSession) {
      targetSession.rules = [...GameCardService.getPointCards()]

      this.updateSessionList(targetSession)

      io.to(sessionId).emit('GAME_SESSION_UPDATED', {
        rules: targetSession.rules,
      })
    }
  }

  startGameSession(configuration: IConfiguration, sessionId: string) {
    const { io } = configuration
    const targetSession = this.findById(sessionId)

    if (targetSession) {
      targetSession.isStarted = true
      targetSession.enemyCards = GameCardService.shuffleArray(
        targetSession.enemyCards
      )

      const selectedEnemyCard = GameCardService.getCard(
        targetSession.enemyCards
      )

      targetSession.poolOfCards = GameCardService.updateCardArray(
        selectedEnemyCard,
        targetSession.poolOfCards
      )

      targetSession.enemyCards = GameCardService.removeCardFromArray(
        selectedEnemyCard,
        targetSession.enemyCards
      )

      targetSession.poolOfCards = GameCardService.shuffleArray(
        targetSession.poolOfCards
      )

      const selectedCurrentCard = GameCardService.getCard(
        targetSession.poolOfCards
      )

      targetSession.currentCard = selectedCurrentCard
      targetSession.poolOfCards = GameCardService.removeCardFromArray(
        selectedCurrentCard,
        targetSession.poolOfCards
      )

      this.updateSessionList(targetSession)

      io.to(sessionId).emit('GAME_SESSION_UPDATED', {
        poolOfCardsNumber: targetSession.poolOfCards.length,
        currentCard: targetSession.currentCard,
        isStarted: targetSession.isStarted,
      })
    }
  }

  submitPlayerStep(
    configuration: IConfiguration,
    lobbyId: string,
    userId: string
  ) {
    console.log('🚀 ~ lobbyId:', lobbyId)
    console.log('🚀 ~ userId:', userId)
  }
}

export default new GameSessionService()
