import boom from '@hapi/boom'

function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property]
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: { objects: true, arrays: true },
      convert: false,
    })

    if (error) {
      return next(boom.badRequest(error.message))
    }

    req[property] = value
    next()
  }
}

export default validatorHandler
