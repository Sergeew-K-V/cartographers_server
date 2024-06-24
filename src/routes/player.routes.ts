import { Router } from 'express'
import verifyToken from '../middleware/verifyToken'
import { getPlayer } from '../controllers/player.controller'

const router = Router()

router.get('/:id', verifyToken, getPlayer)

export { router }
