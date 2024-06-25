import { uid } from 'uid'
import { IConfiguration, ILobby, IPlayer } from '../types'
import PlayerService from './UserService'

abstract class Lobby {
  abstract create(
    configuration: IConfiguration,
    playerId: string
  ): Promise<void>
  abstract join(
    configuration: IConfiguration,
    lobbyId: string,
    playerId: string
  ): Promise<void>
  abstract leaveLobby(configuration: IConfiguration, playerId: string): void
}

class LobbyService extends Lobby {
  private lobbyList: ILobby[] = []

  async create(configuration: IConfiguration, playerId: string): Promise<void> {
    const { io, socket } = configuration
    const targetPlayer = await PlayerService.findById(playerId)

    if (targetPlayer) {
      const Lobby = this.initNewLobby(targetPlayer)

      this.addLobbyToLobbyList(Lobby)

      socket.join(Lobby.id)

      io.emit('LOBBY_CREATED', Lobby)
    }
  }

  private initNewLobby(host: IPlayer): ILobby {
    return {
      id: uid(),
      name: host.nickname + '-lobby',
      host: host.nickname,
      isStarted: false,
      players: [host],
    }
  }

  private addLobbyToLobbyList(lobby: ILobby) {
    this.lobbyList.push(lobby)
  }

  private findById(lobbyId: string) {
    return this.lobbyList.find((lobby: ILobby) => lobby.id === lobbyId)
  }

  private findPlayer(lobby: ILobby, playerId: string) {
    return lobby.players.find((player) => {
      if (player.id === playerId) return player
    })
  }

  async join(configuration: IConfiguration, lobbyId: string, playerId: string) {
    const { io, socket } = configuration
    const targetPlayer = await PlayerService.findById(playerId)
    const targetLobby = this.findById(lobbyId)

    if (targetLobby && targetPlayer) {
      const isUserInLobby = this.findPlayer(targetLobby, targetPlayer.id)

      //in future need to disable btn in client for connection to room
      if (!isUserInLobby && targetLobby.players.length < 4) {
        socket.join(targetLobby.id)

        targetLobby.players.push(targetPlayer)
        this.updateLobbyList(targetLobby)

        io.emit('LOBBY_UPDATED', targetLobby.id, {
          players: targetLobby.players,
        })
      }
    }
  }

  private updateLobbyList(targetLobby: ILobby) {
    this.lobbyList = this.lobbyList.map((lobby) =>
      lobby.id === lobby.id ? targetLobby : lobby
    )
  }

  private findByPlayerId(playerId: string) {
    const currentLobby = this.lobbyList.find((lobby: ILobby) => {
      const playerLobby = lobby.players.find((player) => {
        if (player.id === playerId) {
          return player
        }
      })
      if (playerLobby) {
        return playerLobby
      }
    })

    return currentLobby
  }

  leaveLobby(configuration: IConfiguration, playerId: string) {
    const { io } = configuration
    const targetLobby = this.findByPlayerId(playerId)
    if (targetLobby) {
      const targetUser = this.findPlayer(targetLobby, playerId)

      if (targetUser) {
        if (targetLobby.players.length === 1) {
          this.removeLobby(targetLobby)
          io.emit('LOBBY_DELETED', targetLobby.id)
        } else {
          const isHostOfLobby = targetLobby.host === targetUser.nickname

          const updatedPlayerList = this.removePlayer(
            targetLobby,
            targetUser.id
          )

          targetLobby.players = updatedPlayerList
          if (isHostOfLobby) {
            targetLobby.host = targetLobby.players[0].nickname
          }

          this.updateLobbyList(targetLobby)

          io.emit('LOBBY_UPDATED', targetLobby.id, {
            host: targetLobby.host,
            players: targetLobby.players,
          })
        }
      }
    }
  }

  private removeLobby(targetLobby: ILobby) {
    this.lobbyList = this.lobbyList.filter(
      (lobby: ILobby) => lobby.id !== targetLobby.id
    )
  }

  private removePlayer(targetLobby: ILobby, playerId: string) {
    return targetLobby.players.filter((player) => player.id !== playerId)
  }

  lobbies() {
    return this.lobbyList
  }
}

export default new LobbyService()
