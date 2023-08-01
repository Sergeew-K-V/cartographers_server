import { Request, Response } from 'express'
import UserModel from '../models/user.model'
import { validationResult } from 'express-validator'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { BAD_REQUEST, CREATED, INTERNAL_ERROR } from '../constants'

const JWT_SECRET = process.env.JWT_SECRET

const registerUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
      return res.status(BAD_REQUEST).json('Incorrect data for registeration.')
    }

    const { email, password, nickname } = req.body
    const candidate = await UserModel.findOne({ email: email.trim() })

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

const loginUser = async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req)

    if (!errors.isEmpty) {
      return res.status(BAD_REQUEST).json('Incorrect data for login.')
    }

    const { email, password } = req.body

    const user = await UserModel.findOne({ email: email.trim() })

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
      expiresIn: '1h',
    })

    return res.json({ token, userId: user._id })
  } catch (error) {
    return res.status(INTERNAL_ERROR).json('Something was wrong in register.')
  }
}

const forgotPassword = async (req: Request, res: Response) => {}

export { registerUser, loginUser, forgotPassword }
