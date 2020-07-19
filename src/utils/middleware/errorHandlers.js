// Dependencies
import boom from '@hapi/boom'

// Configuration
import { $dev } from '@config'

const withErrorStack = (err, stack) => {
  if ($dev()) {
    return { ...err, stack }
  }

  return err
}

const logErrors = (err, req, res, next) => {
  console.log(err)
  next(err)
}

const wrapErrors = (err, req, res, next) => {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

const errorHandler = (err, req, res) => {
  const {
    output: { statusCode, payload }
  } = err

  res.status(statusCode)
  res.json(withErrorStack(payload, err.stack))
}

export { logErrors, wrapErrors, errorHandler }
