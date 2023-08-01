import { Router } from 'express'
import verifyToken from '../middleware/verifyToken'
import { getLobbies, getLobby } from '../controllers/lobby.controller'

const router = Router()

router.get('/', verifyToken, getLobbies)

router.get('/:_id', verifyToken, getLobby)

export { router }
