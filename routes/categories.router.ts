import express from 'express'

import CategoryService from '../services/category.service.js'
import validatorHandler from '../middleware/validator.handler.js'
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from '../schemas/category.schema.js'

const router = express.Router()
const service = new CategoryService()

router.get('/', async (req, res) => {
  const categories = await service.find()

  res.json(categories)
})

router.get(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    const category = await service.findOne(Number(id))

    res.json(category)
  },
)

router.post(
  '/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res) => {
    const body = req.body

    const newCategory = await service.create(body)

    res.status(201).json(newCategory)
  },
)

router.patch(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const category = await service.update(Number(id), body)

    res.json(category)
  },
)

router.delete(
  '/:id',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res) => {
    const { id } = req.params

    await service.delete(Number(id))

    res.status(201).json({ id })
  },
)

export default router
