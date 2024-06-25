import { Router } from 'express'
import verifyToken from '../middleware/verifyToken'
import { getUser } from '../controllers/user.controller'

const router = Router()

router.get('/:id', verifyToken, getUser)

export { router }
