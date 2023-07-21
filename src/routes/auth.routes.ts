import { Router, Request, Response, NextFunction } from 'express'
import UserModel from '../models/user.model'
import { check, validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_ERROR,
  UNAUTHORIZED,
} from '../constants'

const JWT_SECRET = process.env.JWT_SECRET
const router = Router()

interface IUser {
  email: string
  password: string
  nickname: string
  rang: string
  gameStats: {
    rate: number
    wins: number
    loses: number
  }
}

router.post(
  '/register',
  [
    check('email', 'Incorrect email.').isEmail(),
    check('password', 'Password must contain at least 8 symbols.').isLength({
      min: 8,
    }),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty()) {
        return res.status(BAD_REQUEST).json('Incorrect data for registeration.')
      }

      const { email, password, nickname }: IUser = req.body
      const candidate = await UserModel.findOne({ email })

      if (candidate) {
        return res.status(BAD_REQUEST).json('This email already registered.')
      }

      const hashedPassword = await bcryptjs.hash(password, 12)

      const user = new UserModel({
        email,
        password: hashedPassword,
        gameStats: { loses: 0, rate: 1000, wins: 0 },
        nickname,
        rang: 'Common',
      })

      await user.save()

      return res.status(CREATED).json('User was registred successfully.')
    } catch (error) {
      return res.status(INTERNAL_ERROR).json('Something was wrong in register.')
    }
  }
)

router.post(
  '/login',
  [
    check('email', 'Insert correct email').normalizeEmail().isEmail(),
    check('password', 'Insert password').exists(),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req)

      if (!errors.isEmpty) {
        return res.status(BAD_REQUEST).json('Incorrect data for login.')
      }

      const { email, password }: IUser = req.body

      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(BAD_REQUEST).json("User didn't find")
      }

      const isMatchPassword = await bcryptjs.compare(
        password,
        user.password as string
      )

      if (!isMatchPassword) {
        return res.status(BAD_REQUEST).json('Incorrect data for login.')
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
        expiresIn: '2h',
      })

      return res.json({ token, userId: user._id })
    } catch (error) {
      return res.status(INTERNAL_ERROR).json('Something was wrong in register.')
    }
  }
)

router.post('/forgotPassword', async (req: Request, res: Response) => {})

router.get(
  '/verifyToken',
  (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
      return res.status(UNAUTHORIZED).json({ message: 'Token not provided' })
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!)

      if ((decoded as JwtPayload).exp! < Date.now() / 1000) {
        return res.status(UNAUTHORIZED).json({ message: 'Token expired' })
      }
      // next()
    } catch (err) {
      console.log('🚀 ~ file: verifyToken.ts:22 ~ verifyToken ~ err:', err)
      return res.status(UNAUTHORIZED).json({ message: 'Invalid token' })
    }
  }
)

export { router }
