import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(3).max(15)
const price = Joi.number().integer().min(10)
const description = Joi.string().min(10)
const image = Joi.string().uri()
const categoryId = Joi.number().integer()

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
