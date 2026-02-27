import Joi from 'joi'

const id = Joi.string().uuid()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const image = Joi.string().uri()

export const createProductScheme = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
})

export const updateProductScheme = Joi.object({
  name: name,
  price: price,
  image: image,
})

export const getProductScheme = Joi.object({
  id: id.required(),
})
