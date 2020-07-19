// Dependencies
const boom = require('@hapi/boom')

export default (req, res) => {
  const {
    output: { statusCode, payload }
  } = boom.notFound()

  res.status(statusCode).json(payload)
}
