// Dependencies
import mongoose from 'mongoose'

// Configuration
import { $db } from '@config'

// DB Connection
const { username, password, host, database } = $db()

const mongoUrl = `mongodb+srv://${username}:${password}@${host}/${database}?retryWrites=true&w=majority`

let connection

async function db() {
  if (connection) return connection

  try {
    connection = await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    })
  } catch (error) {
    console.error('Could not connect to db', error)
  }

  return connection
}

export default db
