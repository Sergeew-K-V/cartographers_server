import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

import express, { Application, Request, Response, NextFunction } from 'express'
import { router as userRoutes } from './routes/user.routes'
import { router as authRoutes } from './routes/auth.routes'
import mongoose from 'mongoose'

const app: Application = express()

async function startServer() {
  try {
    if (DATABASE_URL) {
      const connection = await mongoose.connect(DATABASE_URL)
      connection && console.log('Connected to database')
      app.use(express.json())
      app.use('/users', userRoutes)
      app.use('/', authRoutes)
      app.use('/', (req: Request, res: Response, next: NextFunction): void => {
        res.json({ message: 'Allo! Catch-all route.' })
      })

      app.listen(PORT, (): void =>
        console.log(`Server is running on port ${PORT}`)
      )
    }
  } catch (error) {
    console.log('Server error!', error)
  }
}

startServer()

export default app
