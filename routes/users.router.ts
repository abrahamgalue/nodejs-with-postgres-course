import express from 'express'

import UserService from '../services/user.service.js'
import validatorHandler from '../middleware/validator.handler.js'
import {
  updateUserSchema,
  createUserSchema,
  getUserSchema,
} from '../schemas/user.schema.js'

const router = express.Router()
const service = new UserService()

router.get('/', async (req, res) => {
  const categories = await service.find()

  res.json(categories)
})

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const category = await service.findOne(id)

    res.json(category)
  },
)

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newCategory = await service.create(body)

    res.status(201).json(newCategory)
  },
)

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const category = await service.update(id, body)

    res.json(category)
  },
)

router.delete(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    await service.delete(id)

    res.status(201).json({ id })
  },
)

export default router
