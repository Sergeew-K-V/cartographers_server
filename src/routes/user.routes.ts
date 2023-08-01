import { Router } from 'express'
import verifyToken from '../middleware/verifyToken'
import { getUser } from '../controllers/user.controller'

const router = Router()

router.get('/:_id', verifyToken, getUser)

export { router }
