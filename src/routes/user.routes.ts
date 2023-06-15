import { Router, Request, Response } from 'express'
import GetAllUsers from '../controllers/user.controller'

const router = Router()

router.get('/', GetAllUsers)

export { router }
