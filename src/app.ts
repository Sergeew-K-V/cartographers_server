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
import { router as lobbyRoutes } from './routes/lobby.routes'
import mongoose from 'mongoose'
import { SocketEvents } from './types'
import { MainAction } from './socket/actions'
import { LobbyList } from './store'

const app: Application = express()

async function startServer() {
  try {
    if (DATABASE_URL) {
      const server = http.createServer(app)
      const connection = await mongoose.connect(DATABASE_URL)
      connection && console.log('Connected to database')

      const io = new Server(server, {
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      })

      app.use(express.json())
      app.use(cors())
      app.use('/', lobbyRoutes)
      app.use('/', userRoutes)
      app.use('/', authRoutes)

      io.on(SocketEvents.CONNECTION, MainAction)
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
