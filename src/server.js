// Dependencies
import express from 'express'
import helmet from 'helmet'
import cors from 'cors'

// Configuration
import { $port } from 'src/config'

// Database Connection
import db from '@lib/database'

// Importing Middlewares
import notFoundHandler from '@middleware/notFoundHandler'

// Importing Routes
import tareaApi from '@routes/tarea'

// Trace Agent
require('@google-cloud/trace-agent').start()

// Init app of express
const app = express()

// Middlewares
app.use(helmet())
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Routes
app.get('/', (req, res) => {
  res.send('tarea-service working!')
})

tareaApi(app)

// Catch 404 - Put this at last in main routes
app.use(notFoundHandler)

// Starting the server
app.listen($port(), async () => {
  // Starting the connection to the database
  await db()
    .then(() => {
      console.log('MongoDB Connected')
    })
    .catch((err) => console.error(err))

  console.log(`Server on port ${$port()}`)
})

export default app
