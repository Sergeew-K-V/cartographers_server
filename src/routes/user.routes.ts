import { Router, Request, Response } from 'express'
import userModel from '../models/user.model'
import verifyToken from '../middleware/verifyToken'

const router = Router()

router.get(
  '/getUser/:_id',
  verifyToken,
  async (req: Request, res: Response) => {
    try {
      const _id = req.params

      const user = await userModel.findOne({ _id })

      if (!user) {
        return res.status(400).json("User didn't find")
      }

      return res.json({ gameStats:user.gameStats,nickname:user.nickname,rang:user.rang })
    } catch (error) {
      return res.status(500).json(`User doesn't find.`)
    }
  }
)

export { router }
