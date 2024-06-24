import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { BAD_REQUEST, CREATED, INTERNAL_ERROR } from '../constants'
import PlayerService from '../services/PlayerService'

const JWT_SECRET = process.env.JWT_SECRET

interface RegisterUserBody {
  email: string
  password: string
  nickname: string
}

const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json('Incorrect data for registration.')
    }

    const { email, password, nickname }: RegisterUserBody = req.body
    const candidate = await PlayerService.findByEmail(email)

    if (candidate) {
      return res.status(BAD_REQUEST).json('This email already registered.')
    }

    const hashedPassword = await bcryptjs.hash(password, 12)

    await PlayerService.create(email, hashedPassword, nickname)

    return res.status(CREATED).json('User was registered successfully.')
  } catch (error) {
    return res.status(INTERNAL_ERROR).json('Something was wrong in register.')
  }
}

interface LoginUserBody {
  email: string
  password: string
}

const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
      return res.status(BAD_REQUEST).json('Incorrect data for login.')
    }

    const { email, password }: LoginUserBody = req.body

    const user = await PlayerService.findByEmail(email)

    if (!user) {
      return res.status(BAD_REQUEST).json("User didn't find")
    }

    const isMatchPassword = await PlayerService.comparePassword(
      password,
      user.id
    )

    if (!isMatchPassword) {
      return res.status(BAD_REQUEST).json('Incorrect data for login.')
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET as string, {
      expiresIn: '12h',
    })

    return res.json({ token, userId: user.id })
  } catch (error) {
    return res.status(INTERNAL_ERROR).json('Something was wrong in register.')
  }
}

const forgotPassword = async (req: Request, res: Response) => {}

export { registerUser, loginUser, forgotPassword }
