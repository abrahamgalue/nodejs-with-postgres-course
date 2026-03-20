import boom from '@hapi/boom'
import sequelize from '../lib/sequelize.js'
import { Op, type WhereOptions } from 'sequelize'

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

type queryProductType = {
  limit?: number
  offset?: number
  price?: number
  price_min?: number
  price_max?: number
}

type optionsProductType = {
  limit?: number
  offset?: number
  include?: string[]
  where?: WhereOptions
}

class ProductsService {
  constructor() {}

  generate() {}

  async create(data: CreateProductType) {
    const newProduct = await models.Product.create(data)

    return newProduct
  }

  async find({ limit, offset, price, price_min, price_max }: queryProductType) {
    let options: optionsProductType = {
      include: ['category'],
    }

    if (limit !== undefined) options.limit = limit

    if (offset !== undefined) options.offset = offset

    if (price !== undefined) {
      options.where = {
        price: {
          [Op.gte]: price,
        },
      }
    }
    
    if (price_min !== undefined && price_max !== undefined) {
      options.where = {
        price: {
          [Op.between]: [price_min, price_max],
        },
      }
    }

    const products = await models.Product.findAll(options)

    return products
  }

  async findOne(id: ProductType['id']) {}

  async update(id: ProductType['id'], changes: UpdateProductType) {}

  async delete(id: ProductType['id']) {}
}

export default ProductsService
