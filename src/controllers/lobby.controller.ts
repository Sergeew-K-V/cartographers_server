import { Request, Response } from 'express'
import { INTERNAL_ERROR } from '../constants'
import LobbyService from '../services/LobbyService'

const getLobbies = async (_: Request, res: Response) => {
  try {
    const lobbies = LobbyService.lobbies()

    return res.json(lobbies)
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`Lobby list didn't find.`)
  }
}

export { getLobbies }
