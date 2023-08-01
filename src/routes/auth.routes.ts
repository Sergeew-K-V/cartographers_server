import { Router } from 'express'
import { check } from 'express-validator'
import {
  forgotPassword,
  loginUser,
  registerUser,
} from '../controllers/auth.controller'

const router = Router()

router.post(
  '/register',
  [
    check('email', 'Incorrect email.').isEmail(),
    check('password', 'Password must contain at least 8 symbols.').isLength({
      min: 8,
    }),
  ],
  registerUser
)

router.post(
  '/login',
  [
    check('email', 'Insert correct email').normalizeEmail().isEmail(),
    check('password', 'Insert password').exists(),
  ],
  loginUser
)

router.post('/forgotPassword', forgotPassword)

export { router }
