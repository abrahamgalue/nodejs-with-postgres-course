import express from 'express'
const router = express.Router()

import ProductsService from '../services/products.service.js'
import validatorHandler from '../middleware/validator.handler.js'
import {
  createProductScheme,
  getProductScheme,
  updateProductScheme,
} from '../schemas/product.schema.js'

const service = new ProductsService()

router.get('/', async (req, res) => {
  const products = await service.find()

  res.json(products)
})

router.get('/filter', (req, res) => {
  res.send('I am a filter')
})

router.get(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res) => {
    const { id } = req.params

    const product = await service.findOne(Number(id))

    res.json(product)
  },
)

router.post(
  '/',
  validatorHandler(createProductScheme, 'body'),
  async (req, res) => {
    const body = req.body

    const newProduct = await service.create(body)

    res.status(201).json({
      message: 'Created',
      data: newProduct,
    })
  },
)

router.patch(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  validatorHandler(updateProductScheme, 'body'),
  async (req, res) => {
    const { id } = req.params
    const body = req.body

    const updatedProduct = await service.update(Number(id), body)

    res.json(updatedProduct)
  },
)

router.delete(
  '/:id',
  validatorHandler(getProductScheme, 'params'),
  async (req, res) => {
    const { id } = req.params

    const response = await service.delete(Number(id))

    res.json(response)
  },
)

export default router
