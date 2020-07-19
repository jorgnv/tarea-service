import {
  decipherResetPasswordToken,
  saltHashPassword
} from '@util/cipherHelper'

const resetPassword = (password, confirmPassword, resetPasswordToken) => {
  console.log(password, confirmPassword, resetPasswordToken, 'oool')
  if (password.length < 6) {
    throw new Error('Password should be longer than 6 characters')
  }

  if (password !== confirmPassword) {
    throw new Error('Password and its confirmation do not match.')
  }

  const tokenContent = decipherResetPasswordToken(resetPasswordToken)
  if (new Date().getTime() > tokenContent.valid) {
    throw new Error('Reset password token has expired.')
  }

  const { salt, passwordHash } = saltHashPassword(password)
  const id = tokenContent.userId
  const data = { id, salt, passwordHash }
  return data
}

export default resetPassword
