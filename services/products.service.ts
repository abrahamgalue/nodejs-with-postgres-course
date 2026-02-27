import { faker } from '@faker-js/faker'
import boom from '@hapi/boom'

interface Product {
  id: string
  name: string
  price: number
  image: string
  isBlock?: boolean
}

class ProductsService {
  products: Product[]

  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 25

    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseFloat(faker.commerce.price()),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data: Product) {
    const newProduct = {
      id: faker.string.uuid(),
      name: data.name ?? faker.commerce.productName(),
      price: data.price ?? parseFloat(faker.commerce.price()),
      image: data.image ?? faker.image.url(),
    }

    this.products.push(newProduct)

    return newProduct
  }

  async find() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.products)
      }, 250)
    })
  }

  async findOne(id: Product['id']) {
    const product = this.products.find((product) => product.id === id)

    if (!product) {
      throw boom.notFound('Product not found')
    }

    if (product.isBlock) {
      throw boom.conflict('Product is block')
    }

    return product
  }

  async update(id: Product['id'], changes: Product) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    const product = this.products[index]

    this.products[index] = {
      ...product,
      name: changes.name ? changes.name : product.name,
      price: changes.price ? changes.price : product.price,
      image: changes.image ? changes.image : product.image,
    }

    return this.products[index]
  }

  async delete(id: Product['id']) {
    const index = this.products.findIndex((product) => product.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    this.products.splice(index, 1)

    return { id }
  }
}

export default ProductsService
