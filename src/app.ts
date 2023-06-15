import express, { Application, Request, Response, NextFunction } from 'express'
import { router as userRoutes } from './routes/user.routes'
import mongoose from 'mongoose'

const app: Application = express()

async function startServer() {
  try {
    if (process.env.DATABASE_URL) {
      const connection = await mongoose.connect(process.env.DATABASE_URL)
      connection && console.log('Connected to database')

      app.use('/users', userRoutes)

      app.use('/', (req: Request, res: Response, next: NextFunction): void => {
        res.json({ message: 'Allo! Catch-all route.' })
      })
    }
  } catch (error) {
    console.log('Error!')
  }
}

startServer()

export default app
