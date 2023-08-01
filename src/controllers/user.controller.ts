import { Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_ERROR } from '../constants'
import userModel from '../models/user.model'

const getUser = async (req: Request, res: Response) => {
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
}

export { getUser }
