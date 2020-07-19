// Dependencies
import crypto from 'crypto'

// Configuration
import { $auth } from '@config'

// secrets
const { secretp, ttl, algorithm, inputEncoding, outputEncoding } = $auth()

function genRandomString(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length)
}

function sha512(password, salt) {
  const hash = crypto.createHmac('sha512', salt)
  hash.update(password)
  const passwordHash = hash.digest('hex')

  return {
    salt,
    passwordHash
  }
}

function saltHashPassword(password) {
  const salt = genRandomString(16)
  return sha512(password, salt)
}

function generateResetPasswordToken(userId) {
  const text = JSON.stringify({ userId, valid: new Date().getTime() + ttl })

  const cipher = crypto.createCipher(algorithm, secretp)
  let ciphered = cipher.update(text, inputEncoding, outputEncoding)
  ciphered += cipher.final(outputEncoding)

  return ciphered
}

function decipherResetPasswordToken(ciphered) {
  const decipher = crypto.createDecipher(algorithm, secretp)
  let deciphered = decipher.update(ciphered, outputEncoding, inputEncoding)
  deciphered += decipher.final(inputEncoding)

  return JSON.parse(deciphered)
}

export {
  saltHashPassword,
  sha512,
  generateResetPasswordToken,
  decipherResetPasswordToken
}
