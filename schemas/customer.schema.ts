import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(1).max(30)
const lastName = Joi.string().min(2).max(30)
const phone = Joi.string()
const userId = Joi.number().integer()

export const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  userId: userId.required(),
})

export const updateCustomerSchema = Joi.object({
  name,
  lastName,
  phone,
  userId,
})

export const getCustomerSchema = Joi.object({
  id: id.required(),
})
