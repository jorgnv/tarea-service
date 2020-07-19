// Dependencies
import nodeMailer from 'nodemailer'

// Configuration
import { $email } from '@config'

// email
const { domain, user, password } = $email()

function doSend(email, text) {
  const transporter = nodeMailer.createTransport({
    host: 'smtp.googlemail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass: password
    }
  })
  const mailOptions = {
    from: '"Support Artistic Vision Wave" <support@artisticvisions.com>', // sender address
    to: email, // list of receivers
    subject: `Request Password Reset from ${domain}`, // Subject line
    text, // plain text body
    html: `<b>Request Password Instructions</b>${text}` // html body
  }
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      return console.log(error)
    }
    return true
  })
  return Promise.resolve(true)
}

const sendResetPasswordEmail = (email, fullName, token) => {
  const text =
    `<br><br>Hello ${fullName},` +
    '<br>We have received password reset request. ' +
    `To do this, please proceed at ${domain}/auth/reset-password?reset_password_token=${token}` +
    "<br>If it wasn't you, take no action or contact support." +
    '<br><br>Thank you,' +
    '<br>Support team.'

  return doSend(email, text)
}

export default sendResetPasswordEmail
