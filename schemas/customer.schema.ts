import Joi from 'joi'

const id = Joi.number().integer()
const name = Joi.string().min(1).max(30)
const lastName = Joi.string().min(2).max(30)
const phone = Joi.string()
const email = Joi.string().email()
const password = Joi.string().min(8)
const role = Joi.string().min(5)
const userId = Joi.number().integer()

export const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone,
  user: Joi.object({
    email: email.required(),
    password: password.required(),
    role: role.required(),
  }),
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
