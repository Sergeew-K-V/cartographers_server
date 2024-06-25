import { Router } from 'express'
import verifyToken from '../middleware/verifyToken'
import { getLobbies } from '../controllers/lobby.controller'

const router = Router()

router.get('/', verifyToken, getLobbies)

export { router }
