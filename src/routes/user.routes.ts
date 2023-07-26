import { Router, Request, Response } from 'express'
import userModel from '../models/user.model'
import verifyToken from '../middleware/verifyToken'
import { BAD_REQUEST, INTERNAL_ERROR } from '../constants'

const router = Router()

router.get('/:_id', verifyToken, async (req: Request, res: Response) => {
  try {
    const _id = req.params

    const user = await userModel.findOne({
      _id,
    })

    if (!user) {
      return res.status(BAD_REQUEST).json("User didn't find")
    }
    const { rang, gameStats, nickname, email } = user

    return res.json({ gameStats, nickname, rang, email })
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`User doesn't find.`)
  }
})

export { router }
