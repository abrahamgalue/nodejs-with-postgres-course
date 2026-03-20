import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

const price_min = Joi.number().integer().min(10)
const price_max = Joi.number().integer().min(10)

const limit = Joi.number().integer().min(0)
const offset = Joi.number().integer().min(0)

export const createProductScheme = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required(),
})

export const updateProductScheme = Joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  categoryId: categoryId,
})

export const getProductScheme = Joi.object({
  id: id.required(),
})

export const queryProductScheme = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max,
})
  .with('price_min', 'price_max')
  .with('price_max', 'price_min')
