import dotenv from 'dotenv'
dotenv.config()
const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL

import cors from 'cors'
import express, { Application } from 'express'
import fs from 'fs'
import { Server } from 'socket.io'
import http from 'http'
import https from 'https'
import { router as userRoutes } from './routes/user.routes'
import { router as authRoutes } from './routes/auth.routes'
import { router as lobbyRoutes } from './routes/lobby.routes'
import mongoose from 'mongoose'
import {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './types'
import MainAction from './socket/main'

let runType: 'development' | 'prod' = process.env.RUN_TYPE
  ? (process.env.RUN_TYPE as 'development' | 'prod')
  : 'development'

const app: Application = express()

async function startServer() {
  try {
    if (DATABASE_URL) {
      let certificates
      if (process.env.CERT_PATH && process.env.PRIVATE_KEY_PATH) {
        const privateKey = fs.readFileSync(process.env.PRIVATE_KEY_PATH, 'utf8')
        const certificate = fs.readFileSync(process.env.CERT_PATH, 'utf8')
        certificates = {
          key: privateKey,
          cert: certificate,
        }
      }

      let server =
        runType === 'prod' && certificates
          ? https.createServer(certificates, app)
          : http.createServer(app)
      const connection = await mongoose.connect(DATABASE_URL)
      connection && console.log('Connected to database')

      const io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
      >(server, {
        path: runType === 'prod' ? '/socket/' : '',
        cors: {
          origin: '*',
          methods: ['GET', 'POST'],
        },
      })

      app.use(express.json())
      app.use(cors())
      app.use('/api/lobbies', lobbyRoutes)
      app.use('/api/user', userRoutes)
      app.use('/api/', authRoutes)

      io.on('connection', (socket) => MainAction(socket, io))
      server.listen(PORT, (): void =>
        console.log(
          `Server is running on port ${
            runType === 'prod' ? 'https://' : 'http://'
          }localhost:${PORT}`
        )
      )
    }
  } catch (error) {
    console.log('Server error!', error)
  }
}

startServer()

export default app
