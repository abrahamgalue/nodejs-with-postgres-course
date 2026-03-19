import boom from '@hapi/boom'
import sequelize from '../lib/sequelize.js'

const { models } = sequelize

export type ProductType = {
  id: number
  name: string
  price: number
  image: string
  description: string
  createdAt: Date
  categoryId: number
}

type CreateProductType = Omit<ProductType, 'id' | 'createdAt'>

type UpdateProductType = Partial<CreateProductType>

type queryProductType = { limit?: number; offset?: number }

class ProductsService {
  constructor() {}

  generate() {}

  async create(data: CreateProductType) {
    const newProduct = await models.Product.create(data)

    return newProduct
  }

  async find({ limit, offset }: queryProductType) {
    const products = await models.Product.findAll({
      include: ['category'],
      limit: limit,
      offset: offset,
    })

    return products
  }

  async findOne(id: ProductType['id']) {}

  async update(id: ProductType['id'], changes: UpdateProductType) {}

  async delete(id: ProductType['id']) {}
}

export default ProductsService
