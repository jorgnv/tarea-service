// Dependencies
import joi from '@hapi/joi'
import boom from '@hapi/boom'

const validate = (data, schema) => {
  const { error } = joi.validate(data, schema)
  return error
}

export default (schema, check = 'body') => {
  return (req, res, next) => {
    const error = validate(req[check], schema)

    return error ? next(boom.badRequest(error)) : next()
  }
}
