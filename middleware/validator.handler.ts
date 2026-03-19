import boom from '@hapi/boom'
import { type Request, type Response, type NextFunction } from 'express'
import { type Schema } from 'joi'

type RequestProperty = 'body' | 'params' | 'query'

function validatorHandler(schema: Schema, property: RequestProperty) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property]
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: { objects: true, arrays: true },
    })

    if (error) {
      return next(boom.badRequest(error.message))
    }

    if (property !== 'query') {
      req[property] = value
    } else {
      req.productQuery = value
    }
    next()
  }
}

export default validatorHandler
