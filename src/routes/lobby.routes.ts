import { Router, Request, Response } from 'express'
import verifyToken from '../middleware/verifyToken'
import { INTERNAL_ERROR } from '../constants'
import { LobbyList } from '../store'

const router = Router()

router.get(
  '/get-lobby-list/',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      console.log('🚀 ~ file: lobby.routes.ts:14 ~ LobbyList:', LobbyList)
      return res.json(LobbyList)
    } catch (error) {
      return res.status(INTERNAL_ERROR).json(`Lobby list doesn't find.`)
    }
  }
)

export { router }
