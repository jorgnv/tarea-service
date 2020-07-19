// Dependencies
import dotenv from 'dotenv'

// Init dotenv
dotenv.config()

module.exports = {
  dev: process.env.NODE_ENV !== 'production',
  serverPort: process.env.PORT || 5000,
  db: {
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  },
  auth: {
    secret: process.env.SECRET,
    secretp: process.env.SECRETP,
    ttl: 86400 * 1000, // 1 day
    algorithm: 'aes256',
    inputEncoding: 'utf8',
    outputEncoding: 'hex'
  },
  email: {
    domain: process.env.DOMAIN,
    user: process.env.EMAIL_SUPPORT_USER,
    password: process.env.EMAIL_SUPPORT_PASSWORD
  }
}
