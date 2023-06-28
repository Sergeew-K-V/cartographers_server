import { Router, Request, Response } from 'express'
import UserModel from '../models/user.model'
import { check, validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'

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
        return res.status(400).json('Incorrect data for registeration.')
      }

      const { email, password, nickname }: IUser = req.body
      const candidate = await UserModel.findOne({ email })

      if (candidate) {
        return res.status(400).json('This email already registered.')
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

      return res.status(201).json('User was registred successfully.')
    } catch (error) {
      return res.status(500).json('Something was wrong in register.')
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
        return res.status(400).json('Incorrect data for login.')
      }

      const { email, password }: IUser = req.body

      const user = await UserModel.findOne({ email })

      if (!user) {
        return res.status(400).json("User didn't find")
      }

      const isMatchPassword = await bcryptjs.compare(
        password,
        user.password as string
      )

      if (!isMatchPassword) {
        return res.status(400).json('Incorrect data for login.')
      }

      const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
        expiresIn: '2h',
      })

      return res.json({ token, userId: user._id })
    } catch (error) {
      return res.status(500).json('Something was wrong in register.')
    }
  }
)

router.post('/forgotPassword', async (req: Request, res: Response) => {})

export { router }
