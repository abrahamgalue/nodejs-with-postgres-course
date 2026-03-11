import { faker } from '@faker-js/faker'
import boom from '@hapi/boom'
import sequelize from '../lib/sequelize.js'

type ProductType = {
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
  // products: ProductType[]

  // constructor() {
  //   this.products = []
  //   this.generate()
  // }

  generate() {
    // const limit = 25
    // for (let index = 0; index < limit; index++) {
    //   this.products.push({
    //     id: index + 1,
    //     name: faker.commerce.productName(),
    //     price: parseFloat(faker.commerce.price()),
    //     image: faker.image.url(),
    //   })
    // }
  }

  async create(data: CreateProductType) {
    // const newProduct = {
    //   id: this.products.length + 1,
    //   name: data.name ?? faker.commerce.productName(),
    //   price: data.price ?? parseFloat(faker.commerce.price()),
    //   image: data.image ?? faker.image.url(),
    // }
    // this.products.push(newProduct)
    // return newProduct
  }

  async find() {
    // const [data] = await sequelize.query('SELECT * FROM tasks')
    // return data
  }

  async findOne(id: ProductType['id']) {
    // const product = this.products.find((product) => product.id === id)
    // if (!product) {
    //   throw boom.notFound('Product not found')
    // }
    // if (product.isBlock) {
    //   throw boom.conflict('Product is block')
    // }
    // return product
  }

  async update(id: ProductType['id'], changes: UpdateProductType) {
    // const index = this.products.findIndex((product) => product.id === id)
    // if (index === -1) {
    //   throw boom.notFound('Product not found')
    // }
    // const product = this.products[index]
    // this.products[index] = {
    //   ...product,
    //   name: changes.name ? changes.name : product.name,
    //   price: changes.price ? changes.price : product.price,
    //   image: changes.image ? changes.image : product.image,
    // }
    // return this.products[index]
  }

  async delete(id: ProductType['id']) {
    // const index = this.products.findIndex((product) => product.id === id)
    // if (index === -1) {
    //   throw boom.notFound('Product not found')
    // }
    // this.products.splice(index, 1)
    // return { id }
  }
}

export default ProductsService
