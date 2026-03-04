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
  const users = await service.find()

  res.json(users)
})

router.get(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const user = await service.findOne(id)

    res.json(user)
  },
)

router.post(
  '/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newUser = await service.create(body)

    res.status(201).json(newUser)
  },
)

router.patch(
  '/:id',
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const updatedUser = await service.update(id, body)

    res.json(updatedUser)
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
