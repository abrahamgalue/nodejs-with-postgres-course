import { ValidationError } from 'sequelize'
import { type Request, type Response, type NextFunction } from 'express'
import { Boom } from '@hapi/boom'

export function logErrors(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.error(err.stack)
  next(err)
}

export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(500).json({ message: err.message })
}

export function boomErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof Boom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

export function ormErrorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors[0].message,
    })
  }
  next(err)
}
