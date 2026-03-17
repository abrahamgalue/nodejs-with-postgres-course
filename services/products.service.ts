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

class ProductsService {
  constructor() {}

  generate() {}

  async create(data: CreateProductType) {
    const newProduct = await models.Product.create(data)

    return newProduct
  }

  async find() {
    const products = await models.Product.findAll({ include: ['category'] })

    return products
  }

  async findOne(id: ProductType['id']) {}

  async update(id: ProductType['id'], changes: UpdateProductType) {}

  async delete(id: ProductType['id']) {}
}

export default ProductsService
