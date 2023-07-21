import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { UNAUTHORIZED } from '../constants'

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization

  if (!token) {
    return res.status(UNAUTHORIZED).json({ message: 'Token not provided' })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!)

    if ((decoded as JwtPayload).exp! < Date.now() / 1000) {
      return res.status(UNAUTHORIZED).json({ message: 'Token expired' })
    }
    next()
  } catch (err) {
    console.log('🚀 ~ file: verifyToken.ts:22 ~ verifyToken ~ err:', err)
    return res.status(UNAUTHORIZED).json({ message: 'Invalid token' })
  }
}

export default verifyToken
