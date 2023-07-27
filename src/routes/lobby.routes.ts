import { Router, Request, Response } from 'express'
import verifyToken from '../middleware/verifyToken'
import { INTERNAL_ERROR } from '../constants'
import { findLobbyByLobbyId, getLobbyList } from '../store'

const router = Router()

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const lobbies = getLobbyList()
    return res.json(lobbies)
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`Lobby list didn't find.`)
  }
})

router.get('/:_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const { _id } = req.params
    const lobbies = getLobbyList()

    const lobby = findLobbyByLobbyId(lobbies, _id)

    return res.json(lobby)
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`Lobby didn't find.`)
  }
})

export { router }
