import express from 'express'

import CustomerService from '../services/customer.service.js'
import validatorHandler from '../middleware/validator.handler.js'
import {
  updateCustomerSchema,
  createCustomerSchema,
  getCustomerSchema,
} from '../schemas/customer.schema.js'

const router = express.Router()
const service = new CustomerService()

router.get('/', async (req, res) => {
  const customer = await service.find()

  res.json(customer)
})

router.get(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const customer = await service.findOne(Number(id))

    res.json(customer)
  },
)

router.post(
  '/',
  validatorHandler(createCustomerSchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newCustomer = await service.create(body)

    res.status(201).json(newCustomer)
  },
)

router.patch(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const updatedCustomer = await service.update(Number(id), body)

    res.json(updatedCustomer)
  },
)

router.delete(
  '/:id',
  validatorHandler(getCustomerSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    await service.delete(Number(id))

    res.status(201).json({ id })
  },
)

export default router
