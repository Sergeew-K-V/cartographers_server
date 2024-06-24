import { Request, Response } from 'express'
import { BAD_REQUEST, INTERNAL_ERROR } from '../constants'
import PlayerService from '../services/PlayerService'

interface GetPlayerParams {
  id: string
}

const getPlayer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as unknown as GetPlayerParams

    const player = await PlayerService.findById(id)

    if (!player) {
      return res.status(BAD_REQUEST).json("User didn't find")
    }
    const { rang, gameStats, nickname, email } = player

    return res.json({ gameStats, nickname, rang, email })
  } catch (error) {
    return res.status(INTERNAL_ERROR).json(`User doesn't find.`)
  }
}

export { getPlayer }
