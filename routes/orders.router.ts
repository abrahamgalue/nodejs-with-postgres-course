import express from 'express'
const router = express.Router()

import OrderService from '../services/order.service.js'
import validatorHandler from '../middleware/validator.handler.js'
import {
  createOrderScheme,
  getOrderScheme,
  addItemSchema,
} from '../schemas/order.schema.js'

const service = new OrderService()

router.get('/', async (req, res) => {
  const orders = await service.find()

  res.json(orders)
})

router.get(
  '/:id',
  validatorHandler(getOrderScheme, 'params'),
  async (req, res) => {
    const { id } = req.params

    const order = await service.findOne(Number(id))

    res.json(order)
  },
)

router.post(
  '/',
  validatorHandler(createOrderScheme, 'body'),
  async (req, res) => {
    const body = req.body

    const newOrder = await service.create(body)

    res.status(201).json({
      message: 'Created',
      data: newOrder,
    })
  },
)

router.post(
  '/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newItem = await service.addItem(body)

    res.status(201).json({
      message: 'Created',
      data: newItem,
    })
  },
)

export default router
