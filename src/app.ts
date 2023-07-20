import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

import cors from 'cors'
import express, { Application } from 'express'
import { Server } from 'socket.io'
import http from 'http'
import { router as userRoutes } from './routes/user.routes'
import { router as authRoutes } from './routes/auth.routes'
import mongoose from 'mongoose'

const app: Application = express()

async function startServer() {
  try {
    if (DATABASE_URL) {
      const server = http.createServer(app)
      const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      })

      io.on('connection', (socket) => {
        console.log('user connected')
        socket.emit('success-connection')

        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
      })

      const connection = await mongoose.connect(DATABASE_URL)
      connection && console.log('Connected to database')
      app.use(express.json())
      app.use(cors())
      app.use('/', userRoutes)
      app.use('/', authRoutes)

      server.listen(PORT, (): void =>
        console.log(`Server is running on port ${PORT}`)
      )
    }
  } catch (error) {
    console.log('Server error!', error)
  }
}

startServer()

export default app
