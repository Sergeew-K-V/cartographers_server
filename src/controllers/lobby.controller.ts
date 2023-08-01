import { Request, Response } from 'express'
import { INTERNAL_ERROR } from '../constants'
import { getLobbyList, findLobbyByLobbyId } from '../store'

const getLobby = async (req: Request, res: Response) => {
  try {
    const { _id } = req.params
    const lobbies = getLobbyList()

    const lobby = findLobbyByLobbyId(lobbies, _id)

    return res.json(lobby)
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`Lobby didn't find.`)
  }
}

const getLobbies = async (req: Request, res: Response) => {
  try {
    const lobbies = getLobbyList()
    return res.json(lobbies)
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`Lobby list didn't find.`)
  }
}

export { getLobby, getLobbies }
